const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const DiscordStrategy = require('passport-discord').Strategy;
const User = require('../models/User'); // Your Mongoose User model
const { v4: uuidv4 } = require('uuid'); // To generate unique temporary usernames (though we won't use it for `username` directly anymore)

module.exports = function(passport) {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id).select('-password');
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });

    // --- Local Strategy (Email/Password) ---
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            try {
                const user = await User.findOne({ email });

                if (!user) {
                    return done(null, false, { message: 'That email is not registered' });
                }

                if (!user.password) {
                    return done(null, false, { message: 'This account was created via social login. Please use Google or Discord.' });
                }

                // This check is now less critical here as frontend will redirect if isProfileComplete is false
                // but good to have as a backend fallback.
                if (!user.isProfileComplete) {
                    return done(null, false, { message: 'Please complete your profile by setting a username.' });
                }

                const isMatch = await user.matchPassword(password);

                if (!isMatch) {
                    return done(null, false, { message: 'Password incorrect' });
                }

                return done(null, user);
            } catch (err) {
                console.error(err);
                return done(err);
            }
        })
    );

    // --- Google Strategy ---
    const isProduction = process.env.NODE_ENV === 'production';
    const googleCallbackUrl = isProduction ? process.env.PROD_GOOGLE_CALLBACK_URL : process.env.DEV_GOOGLE_CALLBACK_URL;
    const discordCallbackUrl = isProduction ? process.env.PROD_DISCORD_CALLBACK_URL : process.env.DEV_DISCORD_CALLBACK_URL;

    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: googleCallbackUrl
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    // Existing user, proceed normally.
                    // Ensure isProfileComplete is correctly set for existing users too.
                    // The User model's pre-save hook (or a dedicated method) will handle this on subsequent saves.
                    if (!user.username && user.isProfileComplete) { // Edge case: if username was cleared but flag not reset
                        user.isProfileComplete = false;
                        await user.save();
                    }
                    return done(null, user);
                } else {
                    // NEW USER: Only provide core social data.
                    // Let User model's pre-save hook set username to null and isProfileComplete to false.
                    user = await User.create({
                        googleId: profile.id,
                        // Do NOT set username here. Let it default to null.
                        email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null,
                        profilePicture: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : 'https://i.ibb.co/L8G77yW/default-avatar.png',
                        // Do NOT set isProfileComplete here. Let User model handle it.
                    });
                    return done(null, user);
                }
            } catch (err) {
                console.error('Google Auth Error:', err);
                return done(err, null);
            }
        })
    );

    // --- Discord Strategy ---
    passport.use(
        new DiscordStrategy({
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            callbackURL: discordCallbackUrl,
            scope: ['identify', 'email']
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ discordId: profile.id });

                if (user) {
                    // Existing user, proceed normally.
                    // Ensure isProfileComplete is correctly set for existing users too.
                    if (!user.username && user.isProfileComplete) { // Edge case
                        user.isProfileComplete = false;
                        await user.save();
                    }
                    return done(null, user);
                } else {
                    // NEW USER: Only provide core social data.
                    // Let User model's pre-save hook set username to null and isProfileComplete to false.
                    user = await User.create({
                        discordId: profile.id,
                        // Do NOT set username here. Let it default to null.
                        email: profile.email || null, // Discord email might be null
                        profilePicture: profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : 'https://i.ibb.co/L8G77yW/default-avatar.png',
                        // Do NOT set isProfileComplete here. Let User model handle it.
                    });
                    return done(null, user);
                }
            } catch (err) {
                console.error('Discord Auth Error:', err);
                return done(err, null);
            }
        })
    );
};
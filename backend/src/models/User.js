// backend/src/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { type } = require('express/lib/response');

// --- Leveling Configuration (keep this as is) ---
const getExpForLevel = (level) => {
    if (level <= 1) return 0;
    const BASE_EXP_INCREMENT = 100;
    const EXP_INCREMENT_FACTOR = 50;
    let totalExpRequired = 0;
    for (let i = 1; i < level; i++) {
        totalExpRequired += BASE_EXP_INCREMENT + (i - 1) * EXP_INCREMENT_FACTOR;
    }
    return totalExpRequired;
};

const getRankForLevel = (level) => {
    if (level >= 20) return 'LEGEND';
    if (level >= 15) return 'MASTER';
    if (level >= 10) return 'EXPERT';
    if (level >= 5) return 'ADVANCED';
    if (level >= 2) return 'APPRENTICE';
    return 'BEGINNER';
};
// --- END Leveling Configuration ---

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        sparse: true,
    },
    password: {
        type: String,
        required: function () {
            return !(this.googleId || this.discordId);
        },
    },
    username: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    googleId: String,
    discordId: {
        type: String,
        unique: true,
        sparse: true,
    },
    exp: {
        type: Number,
        default: 0,
        min: 0,
    },
    level: {
        type: Number,
        default: 1,
        min: 1,
    },
    rank: {
        type: String,
        default: 'BEGINNER',
    },
    bio: {
        type: String,
        maxlength: 200,
        default: '',
    },
    profilePicture: {
        type: String,
        default: 'https://i.ibb.co/L8G77yW/default-avatar.png',
    },
    isProfileComplete: {
        type: Boolean,
        default: false,
    },
    college:{
        type: String,
        default: '',
    },
    graduationYear: {
        type: Number,
        min: 1900,
        max: 2100,
        default: null,
    },
    course:{
        type:String,
        default: '',
    },
    enrollmentNumber: {
        type: String,
        unique: true,
    },
    phoneNumber: {
        type: String,
        unique: true,
    },
    branch: {
        type:String,
    }

}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    // Hash password only if it's modified and present
    if (this.isModified('password') && this.password) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    // --- CRUCIAL CHANGE FOR isProfileComplete LOGIC ---
    // If the user is new AND they are a social login (no username initially),
    // ensure isProfileComplete remains false.
    if (this.isNew && (this.googleId || this.discordId) && !this.username) {
        this.isProfileComplete = false;
    }
    // If a username is being set or updated, then the profile is considered complete.
    // This handles both initial registration with username and subsequent profile completion.
    else if (this.isModified('username') && this.username) {
        this.isProfileComplete = true;
    }
    // If username is explicitly set to null/empty, set isProfileComplete to false
    else if (this.isModified('username') && !this.username) {
        this.isProfileComplete = false;
    }
    // For existing users where username isn't being modified,
    // ensure isProfileComplete is true if a username exists
    else if (!this.isNew && this.username) {
        this.isProfileComplete = true;
    }
    // If an existing user somehow loses their username, set to false
    else if (!this.isNew && !this.username) {
        this.isProfileComplete = false;
    }
    // --- END CRUCIAL CHANGE ---

    next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.addExpAndLevelUp = async function (expGained) {
    if (expGained === 0) {
        return;
    }

    this.exp = Math.max(0, this.exp + expGained);

    console.log(`User ${this.username} adjusted by ${expGained} EXP. Current total EXP: ${this.exp}`);

    let leveledUp = false;
    let levelChanged = false;

    let newLevel = this.level;
    while (this.exp >= getExpForLevel(newLevel + 1) && newLevel < 20) {
        newLevel++;
        levelChanged = true;
    }
    while (this.exp < getExpForLevel(newLevel) && newLevel > 1) {
        newLevel--;
        levelChanged = true;
    }

    if (newLevel !== this.level) {
        this.level = newLevel;
        this.rank = getRankForLevel(this.level);
        leveledUp = true;
        console.log(`*** User ${this.username} Level changed to ${this.level}! New Rank: ${this.rank} ***`);
    }

    await this.save();
    console.log(`User ${this.username}'s profile saved. Final Level: ${this.level}, Final EXP: ${this.exp}`);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
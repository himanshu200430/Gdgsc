const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
exports.registerUser = asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;

    // Validate incoming data
    if (!email || !password) {
        res.status(400);
        throw new Error('Please enter all required fields (email and password).');
    }

    // Check if email already exists
    const userExistsByEmail = await User.findOne({ email });
    if (userExistsByEmail) {
        res.status(400);
        throw new Error('User with that email already exists.');
    }

    // Check if username already exists (if provided)
    if (username) {
        const userExistsByUsername = await User.findOne({ username });
        if (userExistsByUsername) {
            res.status(400);
            throw new Error('Username already taken.');
        }
    }

    // Create the user
    const user = await User.create({
        email,
        password,
        username: username || null, // Allow username to be null initially
        isProfileComplete: !!username, // Set true if username is provided
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            exp: user.exp,
            level: user.level,
            rank: user.rank,
            bio: user.bio,
            profilePicture: user.profilePicture,
            isProfileComplete: user.isProfileComplete,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
exports.authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            exp: user.exp,
            level: user.level,
            rank: user.rank,
            bio: user.bio,
            profilePicture: user.profilePicture,
            isProfileComplete: user.isProfileComplete,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password'); // Exclude password

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            exp: user.exp,
            level: user.level,
            rank: user.rank,
            bio: user.bio,
            profilePicture: user.profilePicture,
            isProfileComplete: user.isProfileComplete,
            // Token isn't needed here as user is already authenticated
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
exports.updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        // Update username if provided and unique
        if (req.body.username && req.body.username !== user.username) {
            const usernameExists = await User.findOne({ username: req.body.username });
            if (usernameExists) {
                res.status(400);
                throw new Error('Username already taken.');
            }
            user.username = req.body.username;
            user.isProfileComplete = true; // Mark profile as complete if username is set
        }

        user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;

        // --- NEW: Handle Base64 profilePicture ---
        if (req.body.profilePicture !== undefined) {
            // Optional: Basic validation for Base64 string if it's not empty
            if (req.body.profilePicture && !req.body.profilePicture.startsWith('data:image/')) {
                res.status(400);
                throw new Error('Invalid image format for profile picture. Must be a Base64 image Data URL.');
            }
            user.profilePicture = req.body.profilePicture;
        }
        // --- END NEW ---

        // Password can be updated separately if needed, but typically not via general profile update

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            role: updatedUser.role,
            exp: updatedUser.exp,
            level: updatedUser.level,
            rank: updatedUser.rank,
            bio: updatedUser.bio,
            profilePicture: updatedUser.profilePicture,
            isProfileComplete: updatedUser.isProfileComplete,
            token: generateToken(updatedUser._id), // Send new token if profile was updated
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Complete user profile (for social logins)
// @route   PUT /api/users/complete-profile
// @access  Private
exports.completeUserProfile = asyncHandler(async (req, res) => {
    const { username } = req.body;

    if (!username) {
        res.status(400);
        throw new Error('Username is required to complete profile.');
    }

    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (user.username && user.isProfileComplete) {
        res.status(400);
        throw new Error('Profile already complete.');
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
        res.status(400);
        throw new Error('Username already taken.');
    }

    user.username = username;
    user.isProfileComplete = true;

    const updatedUser = await user.save();

    res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        exp: updatedUser.exp,
        level: updatedUser.level,
        rank: updatedUser.rank,
        bio: updatedUser.bio,
        profilePicture: updatedUser.profilePicture,
        isProfileComplete: updatedUser.isProfileComplete,
        token: generateToken(updatedUser._id),
    });
});
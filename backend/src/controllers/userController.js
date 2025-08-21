const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// --- ✅ HELPER FUNCTION: To create a consistent user response object ---
const formatUserResponse = (user) => {
    return {
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
        // New fields
        college: user.college,
        graduationYear: user.graduationYear,
        course: user.course,
        enrollmentNumber: user.enrollmentNumber,
        phoneNumber: user.phoneNumber,
        branch: user.branch,
    };
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
exports.registerUser = asyncHandler(async (req, res) => {
    const { email, password, username, ...profileData } = req.body;

    if (!email || !password || !username) {
        res.status(400);
        throw new Error('Please enter all required fields (email, password, and username).');
    }

    const userExistsByEmail = await User.findOne({ email });
    if (userExistsByEmail) {
        res.status(400);
        throw new Error('User with that email already exists.');
    }
    const userExistsByUsername = await User.findOne({ username });
    if (userExistsByUsername) {
        res.status(400);
        throw new Error('Username already taken.');
    }

    const user = await User.create({
        email,
        password,
        username,
        ...profileData
    });

    if (user) {
        // --- ✅ REFACTORED: Use the helper for a consistent response ---
        res.status(201).json(formatUserResponse(user));
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
        // --- ✅ REFACTORED: Use the helper for a consistent response ---
        res.json(formatUserResponse(user));
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
        // --- ✅ REFACTORED: Use the helper but remove the token as the user already has one ---
        const userPayload = { ...formatUserResponse(user) };
        delete userPayload.token;
        res.json(userPayload);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        // Update username only if provided and different
        if (req.body.username && req.body.username !== user.username) {
            const usernameExists = await User.findOne({ username: req.body.username });
            if (usernameExists) {
                res.status(400);
                throw new Error('Username already taken.');
            }
            user.username = req.body.username;
        }

        // --- ✅ REFACTORED: Safely update all other allowed fields ---
        const allowedFields = ['bio', 'profilePicture', 'college', 'graduationYear', 'course', 'enrollmentNumber', 'phoneNumber', 'branch'];
        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                user[field] = req.body[field];
            }
        });

        const updatedUser = await user.save();

        res.json(formatUserResponse(updatedUser));
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Complete user profile (for social logins)
// @route   PUT /api/users/complete-profile
// @access  Private
exports.completeUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (user.isProfileComplete) {
        res.status(400);
        throw new Error('Profile is already complete.');
    }
    
    // --- ✅ REFACTORED: The logic is identical to a general update, so we can reuse it ---
    return exports.updateUserProfile(req, res);
});
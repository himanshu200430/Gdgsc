const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

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
            // New fields
            college: user.college,
            graduationYear: user.graduationYear,
            course: user.course,
            enrollmentNumber: user.enrollmentNumber,
            phoneNumber: user.phoneNumber,
            branch: user.branch,
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
            // New fields
            college: user.college,
            graduationYear: user.graduationYear,
            course: user.course,
            enrollmentNumber: user.enrollmentNumber,
            phoneNumber: user.phoneNumber,
            branch: user.branch,
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
    const user = await User.findById(req.user._id).select('-password');

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
            // New fields
            college: user.college,
            graduationYear: user.graduationYear,
            course: user.course,
            enrollmentNumber: user.enrollmentNumber,
            phoneNumber: user.phoneNumber,
            branch: user.branch,
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
        if (req.body.username && req.body.username !== user.username) {
            const usernameExists = await User.findOne({ username: req.body.username });
            if (usernameExists) {
                res.status(400);
                throw new Error('Username already taken.');
            }
            user.username = req.body.username;
        }

        user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
        user.profilePicture = req.body.profilePicture !== undefined ? req.body.profilePicture : user.profilePicture;

        // NEW: Update additional profile fields
        user.college = req.body.college !== undefined ? req.body.college : user.college;
        user.graduationYear = req.body.graduationYear !== undefined ? req.body.graduationYear : user.graduationYear;
        user.course = req.body.course !== undefined ? req.body.course : user.course;
        user.enrollmentNumber = req.body.enrollmentNumber !== undefined ? req.body.enrollmentNumber : user.enrollmentNumber;
        user.phoneNumber = req.body.phoneNumber !== undefined ? req.body.phoneNumber : user.phoneNumber;
        user.branch = req.body.branch !== undefined ? req.body.branch : user.branch;

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
            // New fields
            college: updatedUser.college,
            graduationYear: updatedUser.graduationYear,
            course: updatedUser.course,
            enrollmentNumber: updatedUser.enrollmentNumber,
            phoneNumber: updatedUser.phoneNumber,
            branch: updatedUser.branch,
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
    const { username, college, graduationYear, course, enrollmentNumber, phoneNumber, branch } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Check if the user is a social login user that needs to complete their profile
    // Note: This check is now less critical as isProfileComplete is managed by the model hook.
    if (user.isProfileComplete) {
        res.status(400);
        throw new Error('Profile is already complete.');
    }

    if (username) {
        const usernameExists = await User.findOne({ username });
        if (usernameExists && usernameExists._id.toString() !== user._id.toString()) {
            res.status(400);
            throw new Error('Username already taken.');
        }
        user.username = username;
    }

    // NEW: Update all the new profile fields
    user.college = college !== undefined ? college : user.college;
    user.graduationYear = graduationYear !== undefined ? graduationYear : user.graduationYear;
    user.course = course !== undefined ? course : user.course;
    user.enrollmentNumber = enrollmentNumber !== undefined ? enrollmentNumber : user.enrollmentNumber;
    user.phoneNumber = phoneNumber !== undefined ? phoneNumber : user.phoneNumber;
    user.branch = branch !== undefined ? branch : user.branch;

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
        // New fields
        college: updatedUser.college,
        graduationYear: updatedUser.graduationYear,
        course: updatedUser.course,
        enrollmentNumber: updatedUser.enrollmentNumber,
        phoneNumber: updatedUser.phoneNumber,
        branch: updatedUser.branch,
    });
});
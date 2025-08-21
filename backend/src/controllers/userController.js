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
        bio: '',
        profilePicture: '',
        role: 'user', // Default role
        exp: 0,
        level: 1,
        rank: 'BEGINNER',
        course:'',
        enrollmentNumber: '',
        phoneNumber: '',
        branch: '',
        college: '',
        graduationYear: null,
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
    const userId = req.user._id;
    const { username, college, graduationYear, course, enrollmentNumber, phoneNumber, branch } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        res.status(404);
        throw new Error('User not found.');
    }

    // Object to hold the fields we are updating
    const updateFields = {};

    // Check and add each field to the update object if it's provided and not already set
    if (username && (!user.username || user.username.trim() === '')) {
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            res.status(400);
            throw new Error('Username already taken.');
        }
        updateFields.username = username;
    }

    if (college && (!user.college || user.college.trim() === '')) updateFields.college = college;
    if (graduationYear && !user.graduationYear) updateFields.graduationYear = graduationYear;
    if (course && (!user.course || user.course.trim() === '')) updateFields.course = course;
    if (enrollmentNumber && (!user.enrollmentNumber || user.enrollmentNumber.trim() === '')) updateFields.enrollmentNumber = enrollmentNumber;
    if (phoneNumber && (!user.phoneNumber || user.phoneNumber.trim() === '')) updateFields.phoneNumber = phoneNumber;
    if (branch && (!user.branch || user.branch.trim() === '')) updateFields.branch = branch;

    if (Object.keys(updateFields).length === 0) {
        res.status(400);
        throw new Error('No new information provided to update.');
    }

    // Use findByIdAndUpdate to perform the update
    const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateFields }, { new: true, runValidators: true });

    // Check if the profile is now complete after the update
    const isProfileComplete = updatedUser.username && updatedUser.college && updatedUser.graduationYear && updatedUser.course && updatedUser.enrollmentNumber && updatedUser.phoneNumber && updatedUser.branch;
    
    // Only update the flag if the status has changed
    if (isProfileComplete && !updatedUser.isProfileComplete) {
        updatedUser.isProfileComplete = true;
        await updatedUser.save();
    }

    res.json({
        message: 'Profile updated successfully!',
        user: updatedUser,
        token: generateToken(updatedUser._id),
    });
});

// @desc    Set a user's role to admin (for initial admin setup)
// @route   PUT /api/users/:id/set-admin
// @access  Private (Admin only)
exports.setAdmin = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(404);
            throw new Error('User not found.');
        }

        if (user.role === 'admin') {
            res.status(400);
            throw new Error('User is already an admin.');
        }

        user.role = 'admin';
        await user.save();

        res.status(200).json({ message: `${user.username} is now an admin.`, user: { id: user._id, username: user.username, role: user.role } });

    } catch (error) {
        console.error('Error setting user as admin:', error);
        res.status(500).json({ message: 'Server error setting user as admin.' });
    }
});
// backend/src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware'); // Import admin middleware
const User = require('../models/User');

// @route   GET /api/user/profile
// @desc    Get current user's profile
// @access  Private (requires JWT)
router.get('/profile', protect, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({ message: 'User not found in session/token.' });
        }
        res.status(200).json({
            user: {
                id: req.user._id,
                username: req.user.username,
                email: req.user.email,
                profilePicture: req.user.profilePicture,
                bio: req.user.bio,
                createdAt: req.user.createdAt,
                isProfileComplete: req.user.isProfileComplete,
                exp: req.user.exp,
                level: req.user.level,
                rank: req.user.rank,
                role: req.user.role
            }
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error fetching profile' });
    }
});

// @route   PUT /api/user/profile
// @desc    Update current user's profile (including bio, profile picture)
// @access  Private (requires JWT)
router.put('/profile', protect, async (req, res) => {
    const { username, bio, profilePicture } = req.body;

    try {
        const user = await User.findById(req.user._id);

        if (user) {
            if (username && username !== user.username) {
                const usernameExists = await User.findOne({ username });
                if (usernameExists && usernameExists._id.toString() !== user._id.toString()) {
                    return res.status(400).json({ message: 'Username already taken' });
                }
                user.username = username;
            }

            user.bio = bio !== undefined ? bio : user.bio;
            user.profilePicture = profilePicture || user.profilePicture;

            const updatedUser = await user.save();

            res.status(200).json({
                message: 'Profile updated successfully',
                user: {
                    id: updatedUser._id,
                    username: updatedUser.username,
                    email: updatedUser.email,
                    profilePicture: updatedUser.profilePicture,
                    bio: updatedUser.bio,
                    isProfileComplete: updatedUser.isProfileComplete,
                    exp: updatedUser.exp,
                    level: updatedUser.level,
                    rank: updatedUser.rank,
                    role: updatedUser.role
                }
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Server error updating profile' });
    }
});

// @route   PUT /api/user/set-username
// @desc    Allows a newly social-logged-in user to set their username
// @access  Private (requires JWT for existing user, but specifically for setup)
router.put('/set-username', protect, async (req, res) => {
    const { username } = req.body;

    if (!username || username.trim() === '') {
        return res.status(400).json({ message: 'Username is required.' });
    }

    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (!user.isProfileComplete && !user.googleId && !user.discordId) {
             return res.status(403).json({ message: 'Username can only be set during initial social login setup.' });
        }

        const usernameExists = await User.findOne({ username });
        if (usernameExists && usernameExists._id.toString() !== user._id.toString()) {
            return res.status(400).json({ message: 'This username is already taken.' });
        }

        user.username = username;
        user.isProfileComplete = false; // Mark setup as complete
        await user.save();

        res.status(200).json({
            message: 'Username set successfully!',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture,
                bio: user.bio,
                isProfileComplete: user.isProfileComplete,
                exp: user.exp,
                level: user.level,
                rank: user.rank,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error setting username:', error);
        res.status(500).json({ message: 'Server error setting username.' });
    }
});

// @route   PUT /api/user/complete-profile
// @desc    Completes a new user's profile with full details
// @access  Private (requires JWT)
router.put('/complete-profile', protect, async (req, res) => {
    try {
        const userId = req.user.id;
        const { username, college, graduationYear, course, enrollmentNumber, phoneNumber, branch } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Object to hold the fields we are updating
        const updateFields = {};

        // Update fields only if they are provided and not already set (handling empty strings properly)
        if (username && (!user.username || user.username.trim() === '')) {
            // Check for username uniqueness
            const usernameExists = await User.findOne({ username });
            if (usernameExists) {
                return res.status(400).json({ message: 'Username already taken.' });
            }
            updateFields.username = username;
        }

        if (college && (!user.college || user.college.trim() === '')) updateFields.college = college;
        if (graduationYear && !user.graduationYear) updateFields.graduationYear = graduationYear;
        if (course && (!user.course || user.course.trim() === '')) updateFields.course = course;
        if (enrollmentNumber && (!user.enrollmentNumber || user.enrollmentNumber.trim() === '')) updateFields.enrollmentNumber = enrollmentNumber;
        if (phoneNumber && (!user.phoneNumber || user.phoneNumber.trim() === '')) updateFields.phoneNumber = phoneNumber;
        if (branch && (!user.branch || user.branch.trim() === '')) updateFields.branch = branch;

        // Check if there's anything to update
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ 
                message: 'No new information provided to update. All fields appear to be already filled or no valid data was provided.',
                debug: {
                    receivedFields: Object.keys(req.body),
                    userCurrentValues: {
                        username: user.username || 'empty',
                        college: user.college || 'empty',
                        graduationYear: user.graduationYear || 'empty',
                        course: user.course || 'empty',
                        enrollmentNumber: user.enrollmentNumber || 'empty',
                        phoneNumber: user.phoneNumber || 'empty',
                        branch: user.branch || 'empty'
                    }
                }
            });
        }
        
        // Use findByIdAndUpdate for a single, atomic update operation
        const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateFields }, { new: true, runValidators: true });

        // Check if the profile is now complete
        const isProfileComplete = updatedUser.username && updatedUser.college && updatedUser.graduationYear && updatedUser.course && updatedUser.enrollmentNumber && updatedUser.phoneNumber && updatedUser.branch;
        if (isProfileComplete !== updatedUser.isProfileComplete) {
            updatedUser.isProfileComplete = isProfileComplete;
            await updatedUser.save(); // Save again to update the isProfileComplete flag
        }

        res.status(200).json({
            message: 'Profile updated successfully!',
            user: updatedUser,
        });

    } catch (error) {
        console.error('Error completing user profile:', error);
        res.status(500).json({ message: 'Server error completing profile.' });
    }
});

// @route   PUT /api/user/:id/set-admin
// @desc    Set a user's role to admin (for initial admin setup)
// @access  Private (Admin only) - You'll need an initial admin user created manually or via a seed script
router.put('/:id/set-admin', protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (user.role === 'admin') {
            return res.status(400).json({ message: 'User is already an admin.' });
        }

        user.role = 'admin';
        await user.save();

        res.status(200).json({ message: `${user.username} is now an admin.`, user: { id: user._id, username: user.username, role: user.role } });

    } catch (error) {
        console.error('Error setting user as admin:', error);
        res.status(500).json({ message: 'Server error setting user as admin.' });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const {
    registerUser,
    authUser,
    getUserProfile,
    updateUserProfile,
    completeUserProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const User = require('../models/User');

// --- ✅ FIX: Unified all routes to use the controller and a consistent API prefix ---

// Public Routes (e.g., /api/users/register)
router.post('/register', registerUser);
router.post('/login', authUser);

// Private User Routes
router
    .route('/profile')
    .get(protect, getUserProfile)      // GET /api/users/profile
    .put(protect, updateUserProfile);   // PUT /api/users/profile

// Route for the profile completion form
router.put('/complete-profile', protect, completeUserProfile); // PUT /api/users/complete-profile

// Admin Route
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
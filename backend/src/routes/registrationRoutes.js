// backend/src/routes/registrationRoutes.js

const express = require('express');
const router = express.Router();

// --- CRITICAL CHECK: Ensure these imports are correct ---
// Make sure the paths are accurate relative to this file.
// Make sure the names match the exports from the controller.
const {
    registerForEvent,
    getRegistrations, // For admin to view all registrations
    getMyRegistrations, // For users to view their own registrations
    deleteRegistration
} = require('../controllers/registrationController'); // Path to your registrationController

// Make sure the path is accurate and 'protect' (and 'authorize' if used) are properly exported.
const { protect, authorize } = require('../middleware/authMiddleware'); // Path to your authMiddleware
// --- END CRITICAL CHECK ---


// @route   GET /api/registrations/my
// @desc    Get current logged-in user's event registrations
// @access  Private
router.get('/my', protect, getMyRegistrations);


// @route   GET /api/registrations
// @desc    Get all event registrations (Admin only)
// @access  Private/Admin
router.get('/', protect, authorize('admin'), getRegistrations);


// @route   POST /api/registrations/:eventId
// @desc    Register user for an event & award EXP
// @access  Private (requires authentication)
// >>> THIS IS THE ROUTE WE'RE FOCUSED ON <<<
router.post('/:eventId', protect, registerForEvent);


// @route   DELETE /api/registrations/:id
// @desc    Delete a specific registration (Admin only)
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), deleteRegistration);


module.exports = router;
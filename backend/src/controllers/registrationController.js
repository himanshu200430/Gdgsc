// backend/src/controllers/registrationController.js

const Event = require('../models/Event');
const Registration = require('../models/Registration');
const User = require('../models/User'); // Import the User model to use its methods

// @desc    Register user for an event
// @route   POST /api/registrations/:eventId
// @access  Private
exports.registerForEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const userId = req.user.id; // User ID from the authenticated token (set by authMiddleware)

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (!event.isActive) {
            return res.status(400).json({ message: 'This event is not active or has ended.' });
        }

        // Check if user is already registered for this specific event
        const existingRegistration = await Registration.findOne({ event: eventId, user: userId });
        if (existingRegistration) {
            return res.status(400).json({ message: 'You are already registered for this event.' });
        }

        // Create a new registration document
        const registration = new Registration({
            event: eventId,
            user: userId,
            registeredAt: new Date(),
        });

        await registration.save(); // Save the new registration

        // Find the user and apply the EXP and leveling logic
        const user = await User.findById(userId);
        if (user) {
            // Use the addExpAndLevelUp method defined in the User model
            await user.addExpAndLevelUp(event.pointsAwarded);
        } else {
            console.error(`Error: User with ID ${userId} not found after successful registration. This should not happen.`);
            // You might want to log this or handle it more robustly
        }

        res.status(201).json({ message: 'Successfully registered for event and EXP awarded!', registration });

    } catch (error) {
        console.error('Error in registerForEvent:', error);
        // Handle specific Mongoose validation errors if necessary
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server error during event registration.' });
    }
};

// @desc    Get all registrations (Admin only)
// @route   GET /api/registrations
// @access  Private/Admin
exports.getRegistrations = async (req, res) => {
    try {
        // Populate event details (name, date, etc.) and user details (username, email, etc.)
        const registrations = await Registration.find()
            .populate('event', 'name date location pointsAwarded')
            .populate('user', 'username email level exp');
        res.status(200).json(registrations);
    } catch (error) {
        console.error('Error in getRegistrations:', error);
        res.status(500).json({ message: 'Server error fetching all registrations.' });
    }
};

// @desc    Get current user's registrations
// @route   GET /api/registrations/my
// @access  Private
exports.getMyRegistrations = async (req, res) => {
    try {
        // Find registrations for the authenticated user and populate event details
        const registrations = await Registration.find({ user: req.user.id })
            .populate('event', 'name description date location pointsAwarded isActive');
        res.status(200).json(registrations);
    } catch (error) {
        console.error('Error in getMyRegistrations:', error);
        res.status(500).json({ message: 'Server error fetching user registrations.' });
    }
};

// @desc    Delete a registration (Admin only)
// @route   DELETE /api/registrations/:id
// @access  Private/Admin
exports.deleteRegistration = async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.id);

        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }

        // Delete the registration document
        // Using deleteOne() for Mongoose 6+
        await registration.deleteOne();

        res.status(200).json({ message: 'Registration removed successfully.' });
    } catch (error) {
        console.error('Error in deleteRegistration:', error);
        res.status(500).json({ message: 'Server error deleting registration.' });
    }
};
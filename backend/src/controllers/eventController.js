const Event = require('../models/Event');
const Registration = require('../models/Registration'); // Import Registration model
const User = require('../models/User'); // Import User model
const asyncHandler = require('express-async-handler'); // For handling async errors

// @desc    Create a new event
// @route   POST /api/events
// @access  Private/Admin
exports.createEvent = asyncHandler(async (req, res) => {
    // Destructure all expected fields, including the new imageUrl
    const { name, description, date, location, pointsAwarded, isActive, imageUrl } = req.body;

    // Basic validation
    if (!name || !description || !date || !location || !pointsAwarded) {
        res.status(400);
        throw new Error('Please enter all required event fields');
    }

    // You might want to add more robust date validation here (e.g., future date)
    const eventDate = new Date(date);
    if (isNaN(eventDate.getTime())) {
        res.status(400);
        throw new Error('Invalid event date provided');
    }

    // Optional: Validate Base64 string if necessary (e.g., check prefix 'data:image/')
    if (imageUrl && !imageUrl.startsWith('data:image/')) {
        res.status(400);
        throw new Error('Invalid image format. Must be a Base64 image Data URL.');
    }

    const event = await Event.create({
        name,
        description,
        date: eventDate, // Use the validated Date object
        location,
        pointsAwarded,
        isActive: isActive !== undefined ? isActive : true, // Allow admin to set, default to true
        imageUrl, // Save the new image URL
    });

    res.status(201).json(event);
});

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getEvents = asyncHandler(async (req, res) => {
    // Optionally filter for active events for public view
    // const events = await Event.find({ isActive: true }).sort({ date: 1 });
    const events = await Event.find().sort({ date: 1 }); // Or get all, let frontend filter
    res.status(200).json(events);
});

// @desc    Get a single event by ID
// @route   GET /api/events/:id
// @access  Public
exports.getEventById = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        res.status(404);
        throw new Error('Event not found');
    }

    res.status(200).json(event);
});

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
exports.updateEvent = asyncHandler(async (req, res) => {
    const { name, description, date, location, pointsAwarded, isActive, imageUrl } = req.body;

    const event = await Event.findById(req.params.id);

    if (!event) {
        res.status(404);
        throw new Error('Event not found');
    }

    // Store old pointsAwarded value before updating for EXP adjustment
    const oldPointsAwarded = event.pointsAwarded;

    // Validate Base64 string if necessary
    if (imageUrl && !imageUrl.startsWith('data:image/')) {
        res.status(400);
        throw new Error('Invalid image format. Must be a Base64 image Data URL.');
    }

    // Update event fields
    event.name = name !== undefined ? name : event.name;
    event.description = description !== undefined ? description : event.description;
    event.date = date ? new Date(date) : event.date;
    event.location = location !== undefined ? location : event.location;
    // Ensure pointsAwarded is updated
    event.pointsAwarded = pointsAwarded !== undefined ? pointsAwarded : event.pointsAwarded;
    if (typeof isActive !== 'undefined') {
        event.isActive = isActive;
    }
    event.imageUrl = imageUrl !== undefined ? imageUrl : event.imageUrl;

    const updatedEvent = await event.save();

    // NEW LOGIC: Adjust user EXP if pointsAwarded actually changed
    if (updatedEvent.pointsAwarded !== oldPointsAwarded) {
        const pointsDifference = updatedEvent.pointsAwarded - oldPointsAwarded;
        console.log(`Event "${updatedEvent.name}" points changed from ${oldPointsAwarded} to ${updatedEvent.pointsAwarded}. Difference: ${pointsDifference}`);

        // Find all users who registered for this event
        const registrations = await Registration.find({ event: updatedEvent._id });

        for (const reg of registrations) {
            const user = await User.findById(reg.user);
            if (user) {
                // Add the difference (can be positive or negative)
                // Use addExpAndLevelUp method to correctly handle level/rank updates
                // If points are decreased, pass a negative value to addExpAndLevelUp
                // The method should handle ensuring EXP doesn't go below 0
                await user.addExpAndLevelUp(pointsDifference);
                console.log(`User ${user.username} EXP adjusted by ${pointsDifference} for event change.`);
            }
        }
    }
    // END NEW LOGIC

    res.status(200).json(updatedEvent);
});


// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
exports.deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        res.status(404);
        throw new Error('Event not found');
    }

    // NEW LOGIC: Adjust user EXP and delete registrations

    // 1. Find all registrations for this event
    const registrationsToDelete = await Registration.find({ event: event._id });

    // 2. For each registration, deduct the points from the user
    for (const reg of registrationsToDelete) {
        const user = await User.findById(reg.user);
        if (user) {
            // Deduct points. Use addExpAndLevelUp with a negative value.
            // This method should handle ensuring EXP doesn't go below 0 and recalculating level/rank.
            await user.addExpAndLevelUp(-event.pointsAwarded);
            console.log(`Deducted ${event.pointsAwarded} EXP from user ${user.username} due to event deletion.`);
        }
    }

    // 3. Delete all registrations associated with this event
    await Registration.deleteMany({ event: event._id });
    console.log(`Deleted all registrations for event: ${event.name}`);

    // END NEW LOGIC

    // 4. Finally, delete the event itself
    await event.deleteOne();

    res.status(200).json({ message: 'Event and all associated registrations removed. User EXP adjusted.' });
});
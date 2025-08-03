// backend/src/models/Event.js

const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 500,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    pointsAwarded: {
        type: Number,
        required: true,
        min: 1, // Events should award at least 1 point
    },
    isActive: { // To control if an event is visible/registrable
        type: Boolean,
        default: true,
    },
    // --- NEW FIELD FOR IMAGE ---
    imageUrl: {
        type: String, // Will store the Base64 string
        default: '',  // Default to empty string if no image
    },
    // --- END NEW FIELD ---
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
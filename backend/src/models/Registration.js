// backend/src/models/Registration.js

const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // References the User model
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event', // References the Event model
        required: true
    },
    registeredAt: {
        type: Date,
        default: Date.now
    }
});

// Ensure a user can only register for an event once
registrationSchema.index({ user: 1, event: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);
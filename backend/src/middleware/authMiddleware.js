// backend/src/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler'); // A simple middleware for handling exceptions inside of async express routes
const User = require('../models/User');

// Middleware to protect routes: Ensures a user is authenticated via JWT
exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if Authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (e.g., "Bearer TOKEN_STRING")
            token = req.headers.authorization.split(' ')[1];

            // Verify token using the JWT secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user by ID from the decoded token payload
            // .select('-password') excludes the password field from the returned user object
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                res.status(401); // Unauthorized
                throw new Error('Not authorized, user not found');
            }

            next(); // Call next middleware/route handler if authentication is successful

        } catch (error) {
            console.error('JWT Token Verification Error:', error.message);
            res.status(401); // Unauthorized
            throw new Error('Not authorized, token failed or expired');
        }
    }

    // If no token is provided in the header
    if (!token) {
        res.status(401); // Unauthorized
        throw new Error('Not authorized, no token provided');
    }
});

// Middleware to authorize users based on their role (e.g., 'admin')
// Takes a variable number of roles as arguments (e.g., authorize('admin', 'moderator'))
exports.authorize = (...roles) => {
    return (req, res, next) => {
        // Check if user object exists on request and if user's role is included in allowed roles
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403); // Forbidden
            throw new Error(`User role (${req.user ? req.user.role : 'none'}) is not authorized to access this route`);
        }
        next(); // Call next middleware/route handler if authorized
    };
};
// backend/src/middleware/adminMiddleware.js

const admin = (req, res, next) => {
    // Check if user is authenticated and has the 'admin' role
    if (req.user && req.user.role === 'admin') {
        next(); // User is an admin, proceed
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' }); // Forbidden
    }
};

module.exports = admin;
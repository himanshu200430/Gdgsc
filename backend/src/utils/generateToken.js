// backend/src/utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (id, isProfileComplete = false) => {
    return jwt.sign({ id, isProfileComplete }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expires in 1 hour
    });
};

module.exports = generateToken; // Exporting the function directly
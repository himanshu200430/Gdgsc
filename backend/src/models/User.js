// backend/src/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// --- Leveling Configuration (IMPORTANT: This MUST match your game's design) ---
const getExpForLevel = (level) => {
    if (level <= 1) return 0;
    const BASE_EXP_INCREMENT = 100;
    const EXP_INCREMENT_FACTOR = 50;
    let totalExpRequired = 0;
    for (let i = 1; i < level; i++) {
        totalExpRequired += BASE_EXP_INCREMENT + (i - 1) * EXP_INCREMENT_FACTOR;
    }
    return totalExpRequired;
};

const getRankForLevel = (level) => {
    if (level >= 20) return 'LEGEND';
    if (level >= 15) return 'MASTER';
    if (level >= 10) return 'EXPERT';
    if (level >= 5) return 'ADVANCED';
    if (level >= 2) return 'APPRENTICE';
    return 'BEGINNER';
};
// --- END Leveling Configuration ---

// --- NEW: List of fields required for a profile to be considered complete ---
const REQUIRED_PROFILE_FIELDS = ['username', 'college', 'graduationYear', 'course', 'enrollmentNumber', 'phoneNumber', 'branch'];

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        sparse: true,
    },
    password: {
        type: String,
        required: function () {
            return !(this.googleId || this.discordId);
        },
    },
    username: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    googleId: String,
    discordId: {
        type: String,
        unique: true,
        sparse: true,
    },
    exp: {
        type: Number,
        default: 0,
        min: 0,
    },
    level: {
        type: Number,
        default: 1,
        min: 1,
    },
    rank: {
        type: String,
        default: 'BEGINNER',
    },
    bio: {
        type: String,
        maxlength: 200,
        default: '',
    },
    profilePicture: {
        type: String,
        default: 'https://i.ibb.co/L8G77yW/default-avatar.png',
    },
    isProfileComplete: {
        type: Boolean,
        default: false,
    },
    // --- NEW: Additional Profile Fields ---
    college: {
        type: String,
        default: '',
    },
    graduationYear: {
        type: Number,
        min: 1900,
        max: 2100,
    },
    course: {
        type: String,
        default: '',
    },
    enrollmentNumber: {
        type: String,
        unique: true,
        sparse: true,
    },
    phoneNumber: {
        type: String,
        unique: true,
        sparse: true,
    },
    branch: {
        type: String,
        default: '',
    },
    // --- END NEW FIELDS ---
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    try {
        // Hash password if modified
        if (this.isModified('password') && this.password) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
        
        // --- UPDATED LOGIC FOR isProfileComplete ---
        // A profile is considered complete only if ALL REQUIRED_PROFILE_FIELDS are present and have a value.
        const isProfileFullyComplete = REQUIRED_PROFILE_FIELDS.every(field => {
            const value = this[field];
            return value !== null && value !== undefined && value !== '';
        });
        
        if (this.isModified('isProfileComplete')) {
            // The flag was explicitly changed, respect it.
        } else {
            this.isProfileComplete = isProfileFullyComplete;
        }
        // --- END UPDATED LOGIC ---

        next();
    } catch (error) {
        console.error('Pre-save hook error:', error);
        next(error);
    }
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.addExpAndLevelUp = async function (expGained) {
    if (expGained === 0) {
        return;
    }
    this.exp = Math.max(0, this.exp + expGained);
    console.log(`User ${this.username} adjusted by ${expGained} EXP. Current total EXP: ${this.exp}`);
    let newLevel = this.level;
    while (this.exp >= getExpForLevel(newLevel + 1) && newLevel < 20) {
        newLevel++;
    }
    while (this.exp < getExpForLevel(newLevel) && newLevel > 1) {
        newLevel--;
    }
    if (newLevel !== this.level) {
        this.level = newLevel;
        this.rank = getRankForLevel(this.level);
        console.log(`*** User ${this.username} Level changed to ${this.level}! New Rank: ${this.rank} ***`);
    }
    await this.save();
    console.log(`User ${this.username}'s profile saved. Final Level: ${this.level}, Final EXP: ${this.exp}`);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
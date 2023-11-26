const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    user_type: {
        type: String,
        enum: ['passenger', 'driver'],
        default: 'passenger',
        required: true,
    },
    registration_date: {
        type: Date,
        default: Date.now,
    },
    profile_picture: String,
    verification_status: Boolean,
}, { versionKey: false });

module.exports = mongoose.model('User', userSchema, 'Users');

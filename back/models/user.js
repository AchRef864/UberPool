const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^\S+@\S+\.\S+$/, // Regular expression for basic email validation
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
    profile_picture: {
        type: String,
        default: "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
    },
    verification_status: Boolean,
}, { versionKey: false });

module.exports = mongoose.model('User', userSchema, 'Users');

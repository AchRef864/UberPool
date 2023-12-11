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
        validate: {
            validator: (password) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(password),
            message: 'Password must contain symbols, numbers, and a mix of upper and lower cases with no spaces, minimum of 6 characters.',
        },
    },
    phone_number: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (phone_number) => /^[529][1-9]{7}$/.test(phone_number),
            message: 'Phone number must be 8 characters and start with 5, 9, or 2.',
        },
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

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async function (value) {
                // Fetch the user document to check user_type
                const user = await this.model('User').findById(value);
                return user && user.user_type === 'passenger';
            },
            message: 'The specified user must be a passenger.',
        },
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
    },
    review_text: {
        type: String,
        required: true,
        maxlength: 100, // Maximum length constraint
    },
    creation_date: {
        type: Date,
        default: Date.now,
    },
}, { versionKey: false });

module.exports = mongoose.model('Review', reviewSchema, 'Reviews');

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
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

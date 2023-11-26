const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    driver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true,
    },
    start_location: {
        type: String,
        required: true,
    },
    end_location: {
        type: String,
        required: true,
    },
    departure_time: {
        type: Date,
        required: true,
    },
    arrival_time: {
        type: Date,
        required: true,
    },
    available_seats: {
        type: Number,
        required: true,
    },
    price_per_seat: {
        type: Number,
        required: true,
    },
    ride_description: String,
    creation_date: {
        type: Date,
        default: Date.now,
    },
}, { versionKey: false });

module.exports = mongoose.model('Ride', rideSchema, 'Rides');

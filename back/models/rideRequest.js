const mongoose = require('mongoose');

const rideRequestSchema = new mongoose.Schema({
    passenger_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model for passenger
        required: true,
    },
    ride_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ride', // Reference to the Ride model
        required: true,
    },
    number_of_seats: {
        type: Number,
        required: true,
    },
    request_status: {
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending',
        required: true,
    },
    creation_date: {
        type: Date,
        default: Date.now,
    },
}, { versionKey: false });

module.exports = mongoose.model('RideRequest', rideRequestSchema, 'RidesRequests');

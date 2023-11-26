const mongoose = require('mongoose');
const reservationSchema = new mongoose.Schema({
    passenger_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model for the passenger
        required: true,
    },
    ride_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ride', // Reference to the Ride model
        required: true,
    },
    reserved_seats: {
        type: Number,
        required: true,
    },
    reservation_status: {
        type: String,
        enum: ['confirmed', 'pending', 'declined'],
        default: 'pending',
        required: true,
    },
    reservation_date: {
        type: Date,
        default: Date.now,
    },
}, { versionKey: false });

module.exports = mongoose.model('Reservation', reservationSchema, 'Reservations');

const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    passenger_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model for the passenger
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
    ride_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ride', // Reference to the Ride model
        required: true,
        validate: {
            validator: async function (value) {
                // Fetch the ride document to check departure_time
                const ride = await this.model('Ride').findById(value);
                return ride && ride.departure_time > Date.now();
            },
            message: 'The selected ride must have a departure time greater than the current date.',
        },
    },
    reserved_seats: {
        type: Number,
        required: true,
        validate: {
            validator: async function (value) {
                const ride = await mongoose.model('Ride').findById(this.ride_id);
                return value <= ride.available_seats;
            },
            message: 'Reserved seats should be less than or equal to available seats in the ride.',
        },
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

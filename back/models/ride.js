const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    driver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async function (value) {
                // Fetch the user document to check user_type
                const user = await this.model('User').findById(value);
                return user && user.user_type === 'driver';
            },
            message: 'The specified user must be a driver.',
        },
    },
    car_brand: {
        type: String,
        required: true,
    },
    start_location: {
        type: String,
        required: true,
        validate: [
            {
                validator: function (value) {
                    // Check if start_location and end_location are not similar
                    return value !== this.end_location;
                },
                message: 'Start location should not be similar to end location.',
            },
            {
                validator: function (value) {
                    // Check if start_location contains numbers or symbols
                    return !/\d|[^a-zA-Z\s]/.test(value);
                },
                message: 'Start location should not contain numbers or symbols.',
            },
        ],
    },
    end_location: {
        type: String,
        required: true,
        validate: [
            {
                validator: function (value) {
                    // Check if end_location and start_location are not similar
                    return value !== this.start_location;
                },
                message: 'End location should not be similar to start location.',
            },
            {
                validator: function (value) {
                    // Check if end_location contains numbers or symbols
                    return !/\d|[^a-zA-Z\s]/.test(value);
                },
                message: 'End location should not contain numbers or symbols.',
            },
        ],
    },
    departure_time: {
        type: Date,
        required: true,
    },
    arrival_time: {
        type: Date,
        required: true,
        validate: [
            {
                validator: function (value) {
                    // Check if departure_time is before arrival_time
                    return value > this.departure_time;
                },
                message: 'Arrival time should be after departure time.',
            },
        ],
    },
    available_seats: {
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

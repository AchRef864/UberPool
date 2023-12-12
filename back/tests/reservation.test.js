const mongoose = require('mongoose');
const Reservation = require('../models/reservation');
const User = require('../models/user');
const Ride = require('../models/ride');

describe('Reservation Model Tests', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        await Ride.deleteMany({});
        await Reservation.deleteMany({});
    });

    beforeAll(async () => {
        await mongoose.connect('mongodb+srv://UberPool:GAbtDNQTKgzUx3xZ@cluster0.vmptjhl.mongodb.net/UberPool', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a valid reservation', async () => {
        const passenger = new User({
            email: 'passenger@example.com',
            password: 'ValidPassword123!',
            phone_number: '91234567',
            name: 'Passenger Name',
            user_type: 'passenger',
        });
        await passenger.save();

        const driver = new User({
            email: 'driver@example.com',
            password: 'ValidPassword123!',
            phone_number: '91234568',
            name: 'Driver Name',
            user_type: 'driver',
        });
        await driver.save();

        const validRide = new Ride({
            driver_id: driver._id,
            car_brand: 'Toyota',
            start_location: 'Start',
            end_location: 'End',
            departure_time: new Date(Date.now() + 3600000),
            arrival_time: new Date(Date.now() + 7200000),
            available_seats: 3,
            price_per_seat: 10,
        });
        await validRide.save();

        const validReservation = new Reservation({
            passenger_id: passenger._id,
            ride_id: validRide._id,
            reserved_seats: 2,
        });

        await expect(validReservation.save()).resolves.toBe(validReservation);
    });

    it('should not create a reservation with an invalid passenger_id', async () => {
        const invalidReservation = new Reservation({
            passenger_id: new mongoose.Types.ObjectId(),
            ride_id: new mongoose.Types.ObjectId(),
            reserved_seats: 2,
        });

        await expect(invalidReservation.save()).rejects.toThrow('The specified user must be a passenger.');
    });

    it('should not create a reservation with an invalid ride_id', async () => {
        const passenger = new User({
            email: 'passenger@example.com',
            password: 'ValidPassword123!',
            phone_number: '26234567',
            name: 'Passenger Name',
            user_type: 'passenger',
        });
        await passenger.save();

        const invalidReservation = new Reservation({
            passenger_id: passenger._id,
            ride_id: new mongoose.Types.ObjectId(),
            reserved_seats: 2,
        });

        await expect(invalidReservation.save()).rejects.toThrow('The selected ride must have a departure time greater than the current date.');
    });

    it('should not create a reservation with reserved_seats exceeding available_seats', async () => {
        const driver = new User({
            email: 'driver@example.com',
            password: 'ValidPassword123!',
            phone_number: '91234567',
            name: 'Driver Name',
            user_type: 'driver',
        });
        await driver.save();

        const validRide = new Ride({
            driver_id: driver._id,
            car_brand: 'Toyota',
            start_location: 'Start',
            end_location: 'End',
            departure_time: new Date(Date.now() + 3600000),
            arrival_time: new Date(Date.now() + 7200000),
            available_seats: 3,
            price_per_seat: 10,
        });
        await validRide.save();

        const invalidReservation = new Reservation({
            passenger_id: driver._id,
            ride_id: validRide._id,
            reserved_seats: 5,
        });

        await expect(invalidReservation.save()).rejects.toThrow('Reserved seats should be less than or equal to available seats in the ride.');
    });

    // Add more test cases as needed
});

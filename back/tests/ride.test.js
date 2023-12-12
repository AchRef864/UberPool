const mongoose = require('mongoose');
const Ride = require('../models/ride');
const User = require('../models/user');

beforeAll(async () => {
  await mongoose.connect('mongodb+srv://UberPool:GAbtDNQTKgzUx3xZ@cluster0.vmptjhl.mongodb.net/UberPool', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  // Clear the Users collection before each test
  await User.deleteMany({});
});


describe('Ride Model Validation', () => {
  it('should validate driver_id as a driver', async () => {
    // Create a new driver user
    const driver = new User({
      email: 'driver@example.com',
      password: 'ValidPassword123!',
      phone_number: '91234567',
      name: 'Driver Name',
      user_type: 'driver',
    });

    // Save the driver user to the database
    await driver.save();

    // Create a new ride with the driver_id pointing to the created driver
    const ride = new Ride({
      driver_id: driver._id, // Use the ID of the created driver
      car_brand: 'Example Brand',
      start_location: 'Start City',
      end_location: 'End City',
      departure_time: new Date(),
      arrival_time: new Date(new Date().getTime() + 3600000), // 1 hour later
      available_seats: 3,
      price_per_seat: 20,
    });

    await expect(ride.validate()).resolves.toBeUndefined();
  });


  it('should validate start_location and end_location', async () => {
    // Create a new driver user
    const driver = new User({
      email: 'driver007@example.com',
      password: 'ValidPassword123!',
      phone_number: '91234567',
      name: 'Driver Name',
      user_type: 'driver',
    });

    // Save the driver user to the database
    await driver.save();

    const ride = new Ride({
      driver_id: driver._id, // Use the ID of the created driver
      car_brand: 'Example Brand',
      start_location: 'Start City',
      end_location: 'Start City', // Invalid: start_location and end_location are the same
      departure_time: new Date(),
      arrival_time: new Date(new Date().getTime() + 3600000),
      available_seats: 3,
      price_per_seat: 20,
    });

    await expect(ride.validate()).rejects.toThrow('Start location should not be similar to end location.');
  });

  it('should validate location format', async () => {
    const ride = new Ride({
      driver_id: new mongoose.Types.ObjectId(),
      car_brand: 'Example Brand',
      start_location: 'Start City 123', // Invalid: contains numbers
      end_location: 'End City',
      departure_time: new Date(),
      arrival_time: new Date(new Date().getTime() + 3600000),
      available_seats: 3,
      price_per_seat: 20,
    });

    await expect(ride.validate()).rejects.toThrow('Start location should not contain numbers or symbols.');
  });

  it('should validate departure_time and arrival_time', async () => {
    const ride = new Ride({
      driver_id: new mongoose.Types.ObjectId(),
      car_brand: 'Example Brand',
      start_location: 'Start City',
      end_location: 'End City',
      departure_time: new Date(),
      arrival_time: new Date(), // Invalid: arrival_time is before departure_time
      available_seats: 3,
      price_per_seat: 20,
    });

    await expect(ride.validate()).rejects.toThrow('Arrival time should be after departure time.');
  });
});
const mongoose = require('mongoose');
const Ride = require('../models/ride');

beforeAll(async () => {
  await mongoose.connect('mongodb+srv://UberPool:GAbtDNQTKgzUx3xZ@cluster0.vmptjhl.mongodb.net/UberPool', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Ride Model Validation', () => {
  it('should validate driver_id as a driver', async () => {
    const ride = new Ride({
      driver_id: mongoose.Types.ObjectId(),
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
    const ride = new Ride({
      driver_id: mongoose.Types.ObjectId(),
      car_brand: 'Example Brand',
      start_location: 'Start City',
      end_location: 'End City', // Invalid: start_location and end_location are the same
      departure_time: new Date(),
      arrival_time: new Date(new Date().getTime() + 3600000),
      available_seats: 3,
      price_per_seat: 20,
    });

    await expect(ride.validate()).rejects.toThrow('Start location should not be similar to end location.');
  });

  it('should validate location format', async () => {
    const ride = new Ride({
      driver_id: mongoose.Types.ObjectId(),
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
      driver_id: mongoose.Types.ObjectId(),
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
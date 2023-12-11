const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index'); // Import your Express app

const User = require('../models/user'); // Adjust the path accordingly

beforeAll(async () => {
  await mongoose.connect('mongodb+srv://UberPool:GAbtDNQTKgzUx3xZ@cluster0.vmptjhl.mongodb.net/UberPool', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Model Validation', () => {
  test('Valid User', async () => {
    const validUser = {
      email: 'valid@example.com',
      password: 'ValidPassword123!',
      phone_number: '91234567',
      name: 'John Doe',
      user_type: 'passenger',
    };

    const user = new User(validUser);
    await user.validate();
  });

  test('Invalid Email', async () => {
    const invalidUser = {
      email: 'invalid-email',
      password: 'ValidPassword123!',
      phone_number: '91234567',
      name: 'John Doe',
      user_type: 'passenger',
    };

    await expect(new User(invalidUser).validate()).rejects.toThrow();
  });

  test('Invalid Password', async () => {
    const invalidUser = {
      email: 'valid@example.com',
      password: 'weak',
      phone_number: '91234567',
      name: 'John Doe',
      user_type: 'passenger',
    };

    await expect(new User(invalidUser).validate()).rejects.toThrow();
  });

  test('Invalid Phone Number', async () => {
    const invalidUser = {
      email: 'valid@example.com',
      password: 'ValidPassword123!',
      phone_number: '12345678', // Does not start with 2, 5, or 9
      name: 'John Doe',
      user_type: 'passenger',
    };

    await expect(new User(invalidUser).validate()).rejects.toThrow();
  });
});

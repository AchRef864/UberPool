const mongoose = require('mongoose');
const Review = require('../models/review');
const User = require('../models/user');

describe('Review Model Tests', () => {
    beforeEach(async () => {
        // Clear the Users collection before each test
        await User.deleteMany({});
    });

    beforeAll(async () => {
        // Connect to the MongoDB database before running the tests
        await mongoose.connect('mongodb+srv://UberPool:GAbtDNQTKgzUx3xZ@cluster0.vmptjhl.mongodb.net/UberPool', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        // Disconnect from the MongoDB database after running all tests
        await mongoose.connection.close();
    });

    it('should create a valid review', async () => {
        const passenger = new User({
            email: 'passenger@example.com',
            password: 'ValidPassword123!',
            phone_number: '91234567',
            name: 'Passenger Name',
            user_type: 'passenger',
        });

        // Save the passenger to the database
        await passenger.save();

        // Create a valid review using the passenger's ID
        const validReview = new Review({
            review_user_id: passenger._id,
            rating: 4,
            review_text: 'A valid review text.',
        });
        await expect(validReview.save()).resolves.toBe(validReview);
    });

    it('should not create a review with an invalid user_id', async () => {
        /*const invalidReview = new Review({
            review_user_id: mongoose.Types.ObjectId(),
            rating: 3,
            review_text: 'Invalid user_id review.',
        });*/
        const invalidReview = new Review({
            review_user_id: new mongoose.Types.ObjectId(),
            rating: 2,
            review_text: 'Short', // Adjust the length according to your validation rule
        });
        await expect(invalidReview.save()).rejects.toThrow('The specified user must be a passenger.');
    });

    it('should not create a review with an invalid review_text length', async () => {
        // Create a passenger user
        const passenger = new User({
            email: 'passenger@example.com',
            password: 'ValidPassword123!',
            phone_number: '26234567',
            name: 'Passenger Name',
            user_type: 'passenger',
        });

        // Save the passenger to the database
        await passenger.save();

        // Create an invalid review by exceeding the character limit
        const invalidReview = new Review({
            review_user_id: passenger._id,
            rating: 3,
            review_text: 'Invalid review text exceeding 100 characters limit. ' +
                'This text is intentionally made longer than 100 characters to trigger the validation error.', // Adjust the length
        });

        // Expect the save operation to reject with a validation error
        await expect(invalidReview.save()).rejects.toThrow(
            "Review validation failed: review_text: Path `review_text` (`Invalid review text exceeding 100 characters limit. This text is intentionally made longer than 100 characters to trigger the validation error.`) is longer than the maximum allowed length (100)."
        );

    });

    // Add more test cases as needed
});
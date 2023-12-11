const mongoose = require('mongoose');
const Review = require('../models/review'); // Adjust the path accordingly

describe('Review Model Tests', () => {
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
        const validReview = new Review({
            review_user_id: mongoose.Types.ObjectId(),
            rating: 4,
            review_text: 'A valid review text.',
        });
        await expect(validReview.save()).resolves.toBe(validReview);
    });

    it('should not create a review with an invalid user_id', async () => {
        const invalidReview = new Review({
            review_user_id: mongoose.Types.ObjectId(),
            rating: 3,
            review_text: 'Invalid user_id review.',
        });
        await expect(invalidReview.save()).rejects.toThrow('The specified user must be a passenger.');
    });

    it('should not create a review with an invalid review_text length', async () => {
        const invalidReview = new Review({
            review_user_id: mongoose.Types.ObjectId(),
            rating: 2,
            review_text: 'Invalid review text exceeding 100 characters limit.',
        });
        await expect(invalidReview.save()).rejects.toThrow('Path `review_text` (`Invalid review text exceeding 100 characters limit.`) is longer than the maximum allowed length (100).');
    });

    // Add more test cases as needed
});
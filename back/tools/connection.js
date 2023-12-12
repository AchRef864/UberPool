const mongoose = require('mongoose');

// Define the database connection URL
const MONGO_URI = 'mongodb+srv://UberPool:GAbtDNQTKgzUx3xZ@cluster0.vmptjhl.mongodb.net/UberPool';

// Create a function to connect to the MongoDB database
function connectToMongoDB() {
    return new Promise((resolve, reject) => {
        mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const db = mongoose.connection;
        db.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            reject(err);
        });

        db.once('open', () => {
            console.log('Connected to MongoDB database');
            resolve();
        });
    });
}

// Export the connectToMongoDB function
module.exports = {
    connectToMongoDB
};

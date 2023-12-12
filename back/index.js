const express = require('express');
const connectToMongoDB = require('./tools/connection');

// Connect to MongoDB
connectToMongoDB.connectToMongoDB();

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());

// Define your routes here
const usersRouter = require('./routes/Users');
const ridesRouter = require('./routes/Rides');
const reviewsRouter = require('./routes/Reviews');
const reservationsRouter = require('./routes/Reservations');
app.use('/Users', usersRouter);
app.use('/Rides', ridesRouter);
app.use('/Reviews', reviewsRouter);
app.use('/Reservations', reservationsRouter);

// Start the server and export it
const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = { app, server };

const express = require('express');
const connectToMongoDB = require('./tools/connection');

// Connect to MongoDB
connectToMongoDB.connectToMongoDB()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())

const usersRouter = require('./routes/Users')
const ridesRouter = require('./routes/Rides')
const reviewsRouter = require('./routes/Reviews')
const requestsRouter = require('./routes/RidesRequests')
const reservationsRouter = require('./routes/Reservations')
app.use('/Users', usersRouter)
app.use('/Rides', ridesRouter)
app.use('/Reviews', reviewsRouter)
app.use('/Requests', requestsRouter)
app.use('/Reservations', reservationsRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});

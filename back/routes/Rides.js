const Ride = require("../models/ride");
const express = require('express');
const router = express.Router();
const { createItem, readAll, readItem, updateItem, deleteItem } = require("../tools/ShortCut");

//Create
router.post('/', async (req, res) => {
    const ride = new Ride({
        driver_id: req.body.driver_id,
        car_brand: req.body.car_brand,
        start_location: req.body.start_location,
        end_location: req.body.end_location,
        departure_time: req.body.departure_time,
        arrival_time: req.body.arrival_time,
        available_seats: req.body.available_seats,
        price_per_seat: req.body.price_per_seat,
        ride_description: req.body.ride_description
    })
    await createItem(req, res, ride)
})

//Read all
router.get('/', async (req, res) => {
    await readAll(req, res, Ride)
})

//Expired rides
router.get('/expired', async (req, res) => {
    try {
        const currentDate = new Date();

        const expiredRides = await Ride.find({ departure_time: { $lt: currentDate } });

        res.json({ expiredRides });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Available rides
router.get('/available', async (req, res) => {
    try {
        const currentDate = new Date();

        const expiredRides = await Ride.find({ departure_time: { $gt: currentDate } });

        res.json({ expiredRides });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Read one
router.get('/:id', getRide, async (req, res) => {
    await readItem(req, res, res.ride)
});

// Expired rides for a specific user
router.get('/expired/:driverId', async (req, res) => {
    try {
        const currentDate = new Date();

        const expiredRides = await Ride.find({
            driver_id: req.params.driverId,
            departure_time: { $lt: currentDate },
        });

        res.json({ expiredRides });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Available rides for a specific user
router.get('/available/:driverId', async (req, res) => {
    try {
        const currentDate = new Date();

        const availableRides = await Ride.find({
            driver_id: req.params.driverId,
            departure_time: { $gt: currentDate },
        });

        res.json({ availableRides });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Update
router.patch('/:id', getRide, async (req, res) => {
    if (req.body.driver_id != null) {
        res.ride.driver_id = req.body.driver_id;
    }

    if (req.body.start_location != null) {
        res.ride.start_location = req.body.start_location;
    }

    if (req.body.end_location != null) {
        res.ride.end_location = req.body.end_location;
    }

    if (req.body.departure_time != null) {
        res.ride.departure_time = req.body.departure_time;
    }

    if (req.body.arrival_time != null) {
        res.ride.arrival_time = req.body.arrival_time;
    }

    if (req.body.available_seats != null) {
        res.ride.available_seats = req.body.available_seats;
    }

    if (req.body.ride_description != null) {
        res.ride.ride_description = req.body.ride_description;
    }

    await updateItem(req, res, res.ride);
});

//Delete
router.delete('/:id', getRide, async (req, res) => {
    await deleteItem(req, res, res.ride)
})


//Filter
router.get('/filter/:id', async (req, res) => {
    // Extract driver_id from request parameter
    const driverId = req.params.id;

    // Find rides with matching driver_id
    const rides = await Ride.find({ driver_id: driverId });

    // Check if any rides are found
    if (!rides || rides.length === 0) {
        return res.status(404).json({ message: "No rides found for this driver" });
    }

    // Send the found rides as a response
    res.json(rides);
});

//Find by location
router.post('/location', async (req, res) => {
    try {
        const {
            departure,
            destination,
            day,
            passengers,
        } = req.body;

        const query = {};

        if (departure) {
            query.start_location = { $regex: new RegExp(departure, 'i') }; // Case-insensitive search
        }

        if (destination) {
            query.end_location = { $regex: new RegExp(destination, 'i') }; // Case-insensitive search
        }

        if (day) {
            query.departure_time = { $gt: new Date(day) }; // Filter rides with departure time after input_time
        }

        if (passengers) {
            query.available_seats = { $gte: passengers }; // Filter rides with available seats greater than or equal to passenger_number
        }

        const rides = await Ride.find(query);

        if (!rides || rides.length === 0) {
            return res.status(404).json({ message: "No rides found matching your criteria" });
        }

        res.json(rides);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});


//Price high to low
router.get('/price/high-low', async (req, res) => {
    try {
        const rides = await Ride.find().sort({ price_per_seat: -1 }); // Sort by price descending
        res.json(rides);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});

//Price low to high
router.get('/price/low-high', async (req, res) => {
    try {
        const rides = await Ride.find().sort({ price_per_seat: 1 }); // Sort by price ascending
        res.json(rides);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});

async function getRide(req, res, next) {
    let ride
    try {
        ride = await Ride.findById(req.params.id)
        if (ride == null) {
            return res.status(404).json({ message: "cannot find user" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.ride = ride
    next()
}

module.exports = router

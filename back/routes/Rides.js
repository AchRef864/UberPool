const Ride = require("../models/ride");
const express = require('express');
const router = express.Router();
const { createItem, readAll, readItem, updateItem, deleteItem } = require("../tools/ShortCut");

//Create
router.post('/', async (req, res) => {
    const ride = new Ride({
        driver_id: req.body.driver_id,
        start_location: req.body.start_location,
        end_location: req.body.end_location,
        departure_time: req.body.departure_time,
        arrival_time: req.body.arrival_time,
        available_seats: req.body.available_seats,
        ride_description: req.body.ride_description
    })
    await createItem(req, res, ride)
})

//Read all
router.get('/', async (req, res) => {
    await readAll(req, res, Ride)
})

//Read one
router.get('/:id', getRide, async (req, res) => {
    await readItem(req, res, res.ride)
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

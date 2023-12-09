const Reservation = require("../models/reservation");
const express = require('express');
const router = express.Router();
const { createItem, readAll, readItem, updateItem, deleteItem } = require("../tools/ShortCut");

//Create
router.post('/', async (req, res) => {
    const reservation = new Reservation({
        passenger_id: req.body.passenger_id,
        ride_id: req.body.ride_id,
        reserved_seats: req.body.reserved_seats,
        reservation_status: req.body.reservation_status || 'pending',
    });

    await createItem(req, res, reservation)
})

//Read all
router.get('/', async (req, res) => {
    await readAll(req, res, Reservation)
})

//Read one
router.get('/:id', getReservation, async (req, res) => {
    await readItem(req, res, res.reservation)
});


//Update
router.patch('/:id', getReservation, async (req, res) => {
    router.patch('/:id', getRide, async (req, res) => {
        if (req.body.passenger_id != null) {
            res.reservation.passenger_id = req.body.passenger_id;
        }

        if (req.body.ride_id != null) {
            res.ride.ride_id = req.body.ride_id;
        }

        if (req.body.reserved_seats != null) {
            res.ride.reserved_seats = req.body.reserved_seats;
        }

        if (req.body.reservation_status != null) {
            res.ride.reservation_status = req.body.reservation_status;
        }

        if (req.body.reservation_date != null) {
            res.ride.reservation_date = req.body.reservation_date;
        }

        await updateItem(req, res, res.ride);
    });
})

//Delete
router.delete('/:id', getReservation, async (req, res) => {
    await deleteItem(req, res, res.reservation)
})

async function getReservation(req, res, next) {
    let reservation
    try {
        reservation = await Reservation.findById(req.params.id)
        if (reservation == null) {
            return res.status(404).json({ message: "cannot find user" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.reservation = reservation
    next()
}

module.exports = router
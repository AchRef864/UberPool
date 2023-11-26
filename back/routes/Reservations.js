const Reservation = require("../models/reservation");
const express = require('express');
const router = express.Router();
const { createItem, readAll, readItem, updateItem, deleteItem } = require("../tools/ShortCut");

//Create
router.post('/', async (req, res) => {

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
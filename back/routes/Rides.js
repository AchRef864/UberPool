const Ride = require("../models/ride");
const express = require('express');
const router = express.Router();
const { createItem, readAll, readItem, updateItem, deleteItem } = require("../tools/ShortCut");

//Create
router.post('/', async (req, res) => {

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

})

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

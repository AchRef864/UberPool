const RideRequest = require("../models/rideRequest");
const express = require('express');
const router = express.Router();
const { createItem, readAll, readItem, updateItem, deleteItem } = require("../tools/ShortCut");

//Create
router.post('/', async (req, res) => {

})

//Read all
router.get('/', async (req, res) => {
    await readAll(req, res, RideRequest)
})

//Read one
router.get('/:id', getRideRequest, async (req, res) => {
    await readItem(req, res, res.rideRequest)
});


//Update
router.patch('/:id', getRideRequest, async (req, res) => {

})

//Delete
router.delete('/:id', getRideRequest, async (req, res) => {
    await deleteItem(req, res, res.rideRequest)
})

async function getRideRequest(req, res, next) {
    let rideRequest
    try {
        rideRequest = await RideRequest.findById(req.params.id)
        if (rideRequest == null) {
            return res.status(404).json({ message: "cannot find user" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.rideRequest = rideRequest
    next()
}

module.exports = router

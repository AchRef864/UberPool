const Review = require("../models/review");
const express = require('express');
const router = express.Router();
const { createItem, readAll, readItem, updateItem, deleteItem } = require("../tools/ShortCut");

//Create
router.post('/', async (req, res) => {

})

//Read all
router.get('/', async (req, res) => {
    await readAll(req, res, Review)
})

//Read one
router.get('/:id', getReview, async (req, res) => {
    await readItem(req, res, res.review)
});


//Update
router.patch('/:id', getReview, async (req, res) => {

})

//Delete
router.delete('/:id', getReview, async (req, res) => {
    await deleteItem(req, res, res.review)
})

async function getReview(req, res, next) {
    let review
    try {
        review = await Review.findById(req.params.id)
        if (review == null) {
            return res.status(404).json({ message: "cannot find user" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.review = review
    next()
}

module.exports = router
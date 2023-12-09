const Review = require("../models/review");
const express = require('express');
const router = express.Router();
const { createItem, readAll, readItem, updateItem, deleteItem } = require("../tools/ShortCut");

//Create
router.post('/', async (req, res) => {
    const review = new Review({
        review_user_id: req.body.review_user_id,
        rating: req.body.rating,
        review_text: req.body.review_text,
        creation_date: req.body.creation_date
    });

    await createItem(req, res, review)
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
    if (req.body.review_user_id != null) {
        res.review.review_user_id = req.body.review_user_id;
    }

    if (req.body.rating != null) {
        res.review.rating = req.body.rating;
    }

    if (req.body.review_text != null) {
        res.review.review_text = req.body.review_text;
    }

    if (req.body.creation_date != null) {
        res.review.creation_date = req.body.creation_date;
    }
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
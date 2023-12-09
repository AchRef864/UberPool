const User = require("../models/user");
const express = require('express');
const router = express.Router();
const { createItem, readAll, readItem, updateItem, deleteItem } = require("../tools/ShortCut");

//Create
router.post('/', async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        phone_number: req.body.phone_number,
        name: req.body.name,
        profile_picture: req.body.profile_picture,
        verification_status: req.body.verification_status,
        user_type: req.body.user_type
    })
    await createItem(req, res, user)
})

//Read all
router.get('/', async (req, res) => {
    await readAll(req, res, User)
})

//Read one
router.get('/:id', getUser, async (req, res) => {
    await readItem(req, res, res.user)
});


//Update
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }

    if (req.body.password != null) {
        res.user.password = req.body.password;
    }

    if (req.body.phone_number != null) {
        res.user.phone_number = req.body.phone_number;
    }

    if (req.body.name != null) {
        res.user.name = req.body.name;
    }

    if (req.body.user_type != null) {
        res.user.user_type = req.body.user_type;
    }

    if (req.body.registration_date != null) {
        res.user.registration_date = req.body.registration_date;
    }

    if (req.body.profile_picture != null) {
        res.user.profile_picture = req.body.profile_picture;
    }

    if (req.body.verification_status != null) {
        res.user.verification_status = req.body.verification_status;
    }
    await updateItem(req, res, res.user)
});


//Delete
router.delete('/:id', getUser, async (req, res) => {
    await deleteItem(req, res, res.user)
})

//Find
router.post('/search', async (req, res) => {
    try {
        const { searchTerm } = req.body;
        const regex = new RegExp(searchTerm, 'i'); // Case-insensitive search
        const users = await User.find({ name: { $regex: regex } });
        res.json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: "cannot find user" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.user = user
    next()
}



module.exports = router

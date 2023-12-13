const User = require("../models/user");
const express = require('express');
const router = express.Router();
const { createItem, readAll, readItem, updateItem, deleteItem } = require("../tools/ShortCut");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//Create
router.post('/', async (req, res) => {
    try {
        // Validate the incoming data
        const { email, password, phoneNumber, username,  userType } = req.body;

        if (!email || !password || !phoneNumber  || !userType ||!username) {
            console.log(req.body);
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // Additional validation logic if needed
        console.log(userType);
        const user = new User({
            email,
            name : username,
            password : hashedPassword,
            phone_number : phoneNumber,
            user_type:userType
        });
        await user.save();


        // Validate and save to the database

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


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
router.post('/login', async (req, res) => {
    
    const { email, password } = req.body;

    try {
        // Validate user type
        

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: `Invalid  credentials` });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: `psw invalide` });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

        res.json({ token , type:user.user_type});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router

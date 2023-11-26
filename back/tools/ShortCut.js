async function deleteItem(req, res, item) {
    try {
        await item.deleteOne();
        res.json({ message: `Deleted ${item.constructor.modelName}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function readAll(req, res, item) {
    try {
        const users = await item.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function readItem(req, res, resItem) {
    if (!resItem) {
        return res.status(404).json({ message: `${item.constructor.modelName} not found` });
    }

    res.json(resItem);
}

async function updateItem(req, res, resItem) {
    try {
        const updatedUser = await resItem.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function createItem(req, res, item) {
    try {
        const newUser = await item.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

// Export the functions
module.exports = { createItem, readAll, readItem, updateItem, deleteItem };

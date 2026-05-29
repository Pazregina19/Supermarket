const Supermarket = require('../../models/supermarket');

let controller = {};

// Create
controller.save = async (req, res) => {
    try {

        const supermarket = new Supermarket({
            ...req.body,
            owner: req.user._id
        });

        await supermarket.save();

        res.status(201).json(supermarket);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Server error'
        });

    }
};

// Get all
controller.getAll = async (req, res) => {
    try {

        const supermarkets = await Supermarket.find();

        res.json(supermarkets);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Server error'
        });

    }
};

// Get one
controller.getOne = async (req, res) => {
    try {

        const supermarket = await Supermarket.findById(req.params.id);

        res.json(supermarket);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Server error'
        });

    }
};

// Approve
controller.approve = async (req, res) => {
    try {

        const supermarket = await Supermarket.findByIdAndUpdate(
            req.params.id,
            { approved: true },
            { new: true }
        );

        res.json(supermarket);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Server error'
        });

    }
};

// Get supermarket owned by logged-in user
controller.getMine = async (req, res) => {
    try {

        const supermarket = await Supermarket.findOne({ owner: req.user._id });

        if (!supermarket) {
            return res.status(404).json({ error: 'Supermarket not found' });
        }

        res.json(supermarket);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Server error'
        });

    }
};

module.exports = controller;
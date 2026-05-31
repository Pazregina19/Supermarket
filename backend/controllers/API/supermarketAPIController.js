const Supermarket = require('../../models/supermarket');

let controller = {};

/**
 * Creates a new supermarket
 * @param {*} req 
 * @param {*} res 
 * @returns created supermarket or error message
 */
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

/**
 * Retrieves all supermarkets
 * @param {*} req 
 * @param {*} res 
 * @returns list of supermarkets or error message
 */
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

/**
 * Retrieves a single supermarket
 * @param {*} req 
 * @param {*} res 
 * @returns supermarket or error message
 */
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

/**
 * Approves a supermarket
 * @param {*} req 
 * @param {*} res 
 * @returns approved supermarket or error message
 */
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

/**
 * Retrieves the logged-in user's supermarket
 * @param {*} req 
 * @param {*} res 
 * @returns supermarket or error message
 */
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
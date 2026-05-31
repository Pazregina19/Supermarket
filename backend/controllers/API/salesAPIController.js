const Sale = require('../../models/sale');

let controller = {};

/**
 * Retrieves all sales
 * @param {*} req 
 * @param {*} res 
 * @returns list of sales or error message
 */
controller.getAll = async (req, res) => {

    try {

        const sales = await Sale.find();

        res.json(sales);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            error: 'Server error'

        });

    }

};

/**
 * Creates a new sale
 * @param {*} req 
 * @param {*} res 
 * @returns created sale or error message
 */
controller.create = async (req, res) => {

    try {

        const sale = new Sale({

            ...req.body,

            customer:
                req.user._id || req.user.id

        });

        await sale.save();

        res.status(201).json(sale);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            error: err.message

        });

    }

};

module.exports = controller;
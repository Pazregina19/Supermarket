const Sale =require('../../models/sale');

let controller = {};

//Get all sales
controller.getAll =
async (req, res) => {

    try {

        const sales =
        await Sale.find();

        res.json(
            sales
        );

    }

    catch(err) {

        console.log(err);

        res.status(500)
        .json({

            error:
            'Server error'

        });

    }

};

//Create sale
controller.create =
async (req, res) => {

    try {

        const sale =
        new Sale({

            ...req.body,

            customer:
            req.user.id

        });

        await sale.save();

        res.status(201)
        .json(sale);

    }

    catch(err) {

        console.log(err);

        res.status(500)
        .json({

            error:
            'Server error'

        });

    }

};

module.exports =
controller;
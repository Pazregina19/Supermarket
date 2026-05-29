const Delivery =require('../../models/delivery');
const Sale =require('../../models/sale');

let controller = {};

// Get pending deliveries

controller.getPending =
async (req, res) => {

    try {

        const deliveries =
        await Delivery.find({

            status: 'pending'

        })
        .populate('sale');

        res.json(
            deliveries
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

// Accept delivery

controller.accept =
async (req, res) => {

    try {

        const delivery =
        await Delivery.findByIdAndUpdate(

            req.params.id,

            {

                courier:
                req.user.id,

                status:
                'accepted'

            },

            {
                new: true
            }

        );

        res.json(
            delivery
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

// Get my deliveries

controller.getMyDeliveries =
async (req, res) => {

    try {

        const deliveries =
        await Delivery.find({

            courier:
            req.user.id

        }).populate('sale');

        res.json(
            deliveries
        );

    }

    catch(err) {

        console.log(err);

        res.status(500).json({

            error:
            'Server error'

        });

    }

};

// MARK AS DELIVERED

controller.markDelivered =
async (req, res) => {

    try {

        const delivery =
        await Delivery.findByIdAndUpdate(

            req.params.id,

            {

                status:
                'delivered'

            },

            {

                new: true

            }

        );

        res.json(
            delivery
        );

    }

    catch(err) {

        console.log(err);

        res.status(500).json({

            error:
            'Server error'

        });

    }

};

module.exports =
controller;
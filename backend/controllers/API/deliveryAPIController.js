const Delivery =require('../../models/delivery');
const Sale =require('../../models/sale');

let controller = {};

/**
 * Retrieves pending deliveries
 * @param {*} req 
 * @param {*} res 
 * @returns list of pending deliveries or error message
 */
controller.getPending =
async (req, res) => {

    try {

        const deliveries =
        await Delivery.find({

            status: 'available'

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


/**
 * Accepts a delivery  by the authenticated courier
 * @param {*} req 
 * @param {*} res 
 */
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

/**
 * Retrieves the authenticated courier's deliveries
 * @param {*} req 
 * @param {*} res 
 * @return list of deliveries or error message
 */
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

/**
 * Marks a delivery as delivered
 * @param {*} req 
 * @param {*} res 
 * @returns updated delivery or error message
 */
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
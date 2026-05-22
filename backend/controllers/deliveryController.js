const Delivery = require('../models/delivery');
const Sale = require('../models/sale');

exports.list = async (req, res) => {

    const role = req.session.user.role;
    const userId = req.session.user._id;

    let deliveries;

    if (role === 'admin') {

        deliveries = await Delivery.find();

    }

    else if (role === 'courier') {

        deliveries = await Delivery.find({
            $or: [
                { status: 'available' },
                { courier: userId }
            ]
        });

    }

    else {
        return res.status(403).send('Acesso negado');
    }

    res.render('deliveries/list', {
        deliveries: deliveries
    });
};

exports.accept = async (req, res) => {

    const userId = req.session.user._id;


    const activeDelivery = await Delivery.findOne({

        courier: userId,

        status: {
            $in: ['accepted', 'in_transit']
        }

    });


    if (activeDelivery) {
        return res.status(400).send('Já tens uma entrega em curso');
    }

    await Delivery.findByIdAndUpdate(req.params.id, {

        courier: userId,
        status: 'accepted',
        acceptedAt: new Date()

    });

    res.redirect('/deliveries');
};

exports.updateStatus = async (req, res) => {

    const status = req.body.status;

    const updatedData = {
        status: status
    };

    if (status === 'delivered') {

        updatedData.deliveredAt = new Date();

    }

    await Delivery.findByIdAndUpdate(
        req.params.id,
        updatedData
    );

    res.redirect('/deliveries');
};

    const User = require('../models/user');
    const Sale = require('../models/sale');
    const Supermarket = require('../models/supermarket');
    const Delivery = require('../models/delivery');

    exports.getDashboard = async (req, res) => {

    const role = req.session.user.role;
    const _id = req.session.user._id;
    const email = req.session.user.email;

    let data = {};

    if (role === 'admin') {
        data.totalUsers = await User.countDocuments();
        data.activeSupermarkets = await Supermarket.countDocuments({ approved: true });
        data.totalOrders = await Sale.countDocuments();
        data.totalDeliveries = await Delivery.countDocuments();

    } else if (role === 'supermarket') {
        const sm = await Supermarket.findOne({ owner: _id });
        data.totalOrders = await Sale.countDocuments({ supermarket: sm._id });

    } else if (role === 'courier') {
        data.totalDeliveries = await Delivery.countDocuments({ courier: _id });
        data.delivered = await Delivery.countDocuments({ courier: _id, status: 'delivered' });

    } else if (role === 'client') {
        data.totalOrders = await Sale.countDocuments({ customerEmail: email });
    }

    res.render('dashboards/index', { role, data });

    };

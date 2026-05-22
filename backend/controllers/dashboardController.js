    const User = require('../models/user');
    const Sale = require('../models/sale');
    const Product = require('../models/product');
    const Supermarket = require('../models/supermarket');
    const Delivery = require('../models/delivery');

    exports.getDashboard = async (req, res) => {
    const { role, _id } = req.session.user;
    let data = {};

    if (role === 'admin') {
        data.totalUsers         = await User.countDocuments();
        data.activeSupermarkets = await Supermarket.countDocuments({ approved: true });
        data.totalOrders        = await Sale.countDocuments();
        data.totalDeliveries    = await Delivery.countDocuments();

    } else if (role === 'supermarket') {
        const sm = await Supermarket.findOne({ owner: _id });
        if (sm) {
        data.totalOrders = await Sale.countDocuments({ supermarket: sm._id });
        const sales = await Sale.find({ supermarket: sm._id });
        const counts = {};
        sales.forEach(s => s.products.forEach(i => {
            counts[i.product] = (counts[i.product] || 0) + i.quantity;
        }));
        data.topProducts = Object.entries(counts)
            .sort((a, b) => b[1] - a[1]).slice(0, 5)
            .map(([name, qty]) => ({ name, qty }));
        }

    } else if (role === 'courier') {
        data.totalDeliveries = await Delivery.countDocuments({ courier: _id });
        data.delivered       = await Delivery.countDocuments({ courier: _id, status: 'delivered' });
        data.inProgress      = await Delivery.countDocuments({
        courier: _id, status: { $in: ['accepted', 'in_transit'] }
        });

    } else if (role === 'client') {
        data.totalOrders = await Sale.countDocuments({ customerEmail: req.session.user.email });
        const sales = await Sale.find({ customerEmail: req.session.user.email });
        const counts = {};
        sales.forEach(s => s.products.forEach(i => {
        counts[i.product] = (counts[i.product] || 0) + i.quantity;
        }));
        data.topProducts = Object.entries(counts)
        .sort((a, b) => b[1] - a[1]).slice(0, 5)
        .map(([name, qty]) => ({ name, qty }));
    }

    res.render('dashboards/index', { role, data }); 
    };
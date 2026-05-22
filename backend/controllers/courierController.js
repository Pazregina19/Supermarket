    const User = require('../models/user');
    const Delivery = require('../models/delivery');

    exports.list = async (req, res) => {
    const couriers = await User.find({ role: 'courier' });

    // For each courier, count their deliveries
    const couriersWithStats = await Promise.all(couriers.map(async (c) => {
        const total     = await Delivery.countDocuments({ courier: c._id });
        const delivered = await Delivery.countDocuments({ courier: c._id, status: 'delivered' });
        const active    = await Delivery.countDocuments({ courier: c._id, status: { $in: ['accepted', 'in_transit'] } });
        return { ...c.toObject(), total, delivered, active };
    }));

    res.render('couriers/list', { couriers: couriersWithStats });
    };

    
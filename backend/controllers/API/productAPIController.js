    const Product = require('../models/product');

    exports.compare = async (req, res) => {
    try {
        const name = req.query.name || '';
        const products = await Product.find({
        name: { $regex: name, $options: 'i' }
        }).populate('supermarket');
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Error comparing products' });
    }
    };
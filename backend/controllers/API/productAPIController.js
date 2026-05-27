var mongoose = require('mongoose');
var Product = require('../models/product');

var productAPIController = {};

/**
 * Create product
 */
productAPIController.create = async (req, res, next) => {
    try {

        const product = new Product(req.body);

        await product.save();

        res.json(product);

    } catch (err) {
        next(err);
    }
};

/**
 * Get all products
 */
productAPIController.getAll = async (req, res, next) => {
    try {

        const products = await Product.find()
            .populate('supermarket')
            .sort({ name: 1 });

        res.json(products);

    } catch (err) {
        console.log(err);
        next(err);
    }
};

/**
 * Compare products by name
 * Example:
 * /api/products/compare?name=milk
 */
productAPIController.compare = async (req, res, next) => {
    try {

        const name = req.query.name || '';

        const products = await Product.find({
            name: { $regex: name, $options: 'i' }
        })
        .populate('supermarket')
        .sort({ price: 1 });

        res.json(products);

    } catch (err) {
        next(err);
    }
};

/**
 * Get one product
 */
productAPIController.getOne = (req, res, next) => {

    if (req.product) {
        res.json(req.product);
    } else {
        res.status(404).send('Product not found');
    }

};

/**
 * Middleware get product by ID
 */
productAPIController.getById = async (req, res, next, id) => {

    try {

        const product = await Product.findById(id)
            .populate('supermarket');

        if (!product) {
            return res.status(404).send('Product not found');
        }

        req.product = product;

        next();

    } catch (err) {
        next(err);
    }

};

/**
 * Update product
 */
productAPIController.update = async (req, res, next) => {

    try {

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('supermarket');

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.json(product);

    } catch (err) {
        next(err);
    }

};

/**
 * Delete product
 */
productAPIController.delete = async (req, res, next) => {

    try {

        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.json({
            success: true,
            message: 'Product deleted successfully'
        });

    } catch (err) {
        next(err);
    }

}

    /**
 * Save product
 */
productAPIController.save = async (req, res, next) => {

    try {

        if (!req.product) {
            return res.status(404).send('Product not found');
        }

        Object.assign(req.product, req.body);

        await req.product.save();

        await req.product.populate('supermarket');

        res.json(req.product);

    } catch (err) {
        next(err);
    }

};

module.exports = productAPIController;
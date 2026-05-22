const Product = require("../models/product");
const Sale = require("../models/sale");
const Delivery = require("../models/delivery");

let salesController = {};

/* LIST SALES */
salesController.list = async (req, res) => {

    try {

        const sales =
        await Sale.find()

        .populate('products.product');

        res.render('sales/list', {

            title: 'Sales List',

            sales

        });

    } catch (err) {

        console.log(err);

        res.status(500)
        .send("Error loading sales");
    }
};

/* CREATE FORM */
salesController.create = async (req, res) => {

    try {

        const products =
        await Product.find()
        .populate('supermarket');

        res.render('sales/create', {

            title: 'Create Sale',

            products

        });

    } catch (err) {

        console.log(err);

        res.status(500)
        .send('Error loading products');
    }
};


/* SAVE SALE */
salesController.save = async (req, res) => {

    try {

        let {

            customerEmail,
            productIds,
            quantities,
            deliveryMethod,
            deliveryAddress

        } = req.body;

        const ids =
        Array.isArray(productIds)
        ? productIds
        : [productIds];

        const qtys =
        Array.isArray(quantities)
        ? quantities
        : [quantities];

        let productsArray = [];

        let total = 0;

        let supermarketId = null;

        for (let i = 0; i < ids.length; i++) {

            const product =
            await Product.findById(ids[i])
            .populate('supermarket');

            const quantity =
            parseInt(qtys[i]);

            if (product && quantity > 0) {

                productsArray.push({

                    product: product._id,

                    quantity

                });

                total +=
                product.price * quantity;

                if (!supermarketId) {

                    supermarketId =
                    product.supermarket._id;
                }
            }
        }

        const sale = new Sale({

            customerEmail,

            products: productsArray,

            total,

            supermarket: supermarketId

        });

        await sale.save();

        /* CREATE DELIVERY */

        if (deliveryMethod === 'courier') {

            await Delivery.create({

                sale: sale._id,

                supermarket: supermarketId,

                address:
                deliveryAddress ||
                'Address not specified',

                status: 'available'

            });
        }

        console.log("Sale created!");

        res.redirect('/sales');

    } catch (err) {

        console.log(err);

        res.status(500)
        .send("Error creating sale");
    }
};

module.exports = salesController;
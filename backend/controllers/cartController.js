const Product = require('../models/product');
const Sale = require('../models/sale');

let cartController = {};

// VIEW CART
cartController.viewCart =
async (req, res) => {

    try {

        const cart =
        req.session.cart || [];

        let products = [];

        let total = 0;

        for(const item of cart) {

            const product =
            await Product.findById(
                item.productId
            );

            if(product) {

                total +=
                product.price *
                item.quantity;

                products.push({

                    product,

                    quantity:
                    item.quantity
                });
            }
        }

        res.render('cart/index', {

            title: 'Shopping Cart',

            products,

            total
        });

    } catch(err) {

        console.log(err);

        res.status(500)
        .send('Cart error');
    }
};


// ADD TO CART
cartController.addToCart =
(req, res) => {

    const productId =
    req.params.id;

    if(!req.session.cart) {

        req.session.cart = [];
    }

    const existing =
    req.session.cart.find(

        item =>
        item.productId === productId
    );

    if(existing) {

        existing.quantity++;

    } else {

        req.session.cart.push({

            productId,

            quantity: 1
        });
    }

    res.redirect('/cart');
};


// REMOVE
cartController.removeFromCart =
(req, res) => {

    req.session.cart =
    req.session.cart.filter(

        item =>
        item.productId !==
        req.params.id
    );

    res.redirect('/cart');
};


// CHECKOUT
cartController.checkout =
async (req, res) => {

    try {

        const cart =
        req.session.cart || [];

        let products = [];

        let total = 0;

        for(const item of cart) {

            const product =
            await Product.findById(
                item.productId
            );

            if(product) {

                products.push({

                    product:
                    product._id,

                    quantity:
                    item.quantity
                });

                total +=
                product.price *
                item.quantity;
            }
        }

        const sale = new Sale({

            customerEmail:
            req.session.user.email,

            products,

            total
        });

        await sale.save();

        req.session.cart = [];

        res.redirect('/sales');

    } catch(err) {

        console.log(err);

        res.status(500)
        .send('Checkout error');
    }
};

module.exports = cartController;
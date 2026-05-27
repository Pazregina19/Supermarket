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
cartController.addToCart = async (req, res) => {

    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product || product.stock <= 0) {
        return res.status(400).send('Produto sem stock disponível');
    }

    if (!req.session.cart) {
        req.session.cart = [];
    }

    const existing = req.session.cart.find(item => item.productId === productId);

    if (existing) {
        existing.quantity++;
    } else {
        req.session.cart.push({ productId, quantity: 1 });
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
cartController.checkout = async (req, res) => {

    try {

        const cart = req.session.cart || [];

        let products = [];
        let total = 0;

        for (const item of cart) {

            const product = await Product.findById(item.productId);

            if (product) {

                // Verificar se ainda há stock suficiente no momento do checkout
                if (product.stock < item.quantity) {
                    return res.status(400).send(`Stock insuficiente para o produto: ${product.name}`);
                }

                products.push({ product: product._id, quantity: item.quantity });
                total += product.price * item.quantity;
            }
        }

        const sale = new Sale({
            customerEmail: req.session.user.email,
            products,
            total
        });

        await sale.save();

        for (const item of products) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { stock: -item.quantity }
            });
        }

        req.session.cart = [];
        res.redirect('/sales');

    } catch (err) {
        console.log(err);
        res.status(500).send('Checkout error');
    }
};

module.exports = cartController;
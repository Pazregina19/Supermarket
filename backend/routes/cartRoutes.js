const express = require('express');
const router = express.Router();
const cartController =require('../controllers/cartController');

/**
 * Renders the shopping cart page
 * @param {*} req 
 * @param {*} res   
 */
router.get('/',cartController.viewCart);

/**
 * Adds a product to the cart
 * @param {*} req 
 * @param {*} res 
 * @returns success message or error message
 */
router.post('/add/:id', cartController.addToCart);

/**
 * Removes a product from the cart
 * @param {*} req 
 * @param {*} res 
 * @returns success message or error message
 */
router.post('/remove/:id', cartController.removeFromCart);

/**
 * Checks out the items in the cart
 * @param {*} req 
 * @param {*} res 
 * @returns success message or error message
 */
router.post('/checkout', cartController.checkout);

module.exports = router;
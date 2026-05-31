const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/API/productAPIController');
const { verifyToken } = require('../../middleWares/authenticationMW');

/**
 * Compares products based on provided criteria
 * @param {*} req 
 * @param {*} res 
 * @returns comparison results or error message
 */
router.get('/compare', ctrl.compare);

/**
 * Retrieves all products
 * @param {*} req 
 * @param {*} res 
 * @returns list of products or error message
 */
router.get('/', ctrl.getAll);

/**
 * Creates a new product
 * @param {*} req 
 * @param {*} res 
 * @returns created product or error message
 */
router.post('/', verifyToken, ctrl.create);

/**
 * Updates a product
 * @param {*} req 
 * @param {*} res 
 * @returns updated product or error message
 */
router.put('/:id', verifyToken, ctrl.update);

/**
 * Deletes a product
 * @param {*} req 
 * @param {*} res 
 * @returns deletion confirmation or error message
 */
router.delete('/:id', verifyToken, ctrl.delete);

module.exports = router;
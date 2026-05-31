const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/API/orderAPIController');
const { verifyToken } = require('../../middleWares/authenticationMW');

/**@swagger
 * tags:
 *   name: Orders
 *   description: Operations related to orders
 */
/**@swagger
 * Creates a new order
 * @param {*} req 
 * @param {*} res 
 * @returns created order or error message
 */
router.post('/', verifyToken, ctrl.create);

/**@swagger
 * 
 * Updates the status of an order
 * @param {*} req 
 * @param {*} res 
 * @returns updated order or error message
 */
router.put('/:id/status', verifyToken, ctrl.updateStatus);

/**@swagger                                                                 
 * Retrieves all orders
 * @param {*} req 
 * @param {*} res 
 * @returns list of orders or error message
 */
router.get('/', verifyToken, ctrl.getAll);

module.exports = router;
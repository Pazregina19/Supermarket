const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/API/deliveryAPIController');
const { verifyToken } = require('../../middleWares/authenticationMW');

/**@swagger
 * tags:
 *   name: Deliveries
 *   description: Operations related to deliveries
 */
/**@swagger
 * Retrieves pending deliveries for the authenticated courier
 * @param {*} req 
 * @param {*} res 
 * @returns list of pending deliveries or error message
 */
router.get('/my', verifyToken, ctrl.getMyDeliveries);

/**@swagger
 * Retrieves pending deliveries
 * @param {*} req 
 * @param {*} res 
 * @returns list of pending deliveries or error message
 */
router.get('/', verifyToken, ctrl.getPending);

/**@swagger
 * Accepts a delivery  by the authenticated courier
 * @param {*} req 
 * @param {*} res   
 */
router.put('/:id/accept', verifyToken, ctrl.accept);

/**@swagger
 * Marks a delivery as delivered by the authenticated courier
 * @param {*} req 
 * @param {*} res       
 */
router.put('/:id/deliver', verifyToken, ctrl.markDelivered);

module.exports = router;
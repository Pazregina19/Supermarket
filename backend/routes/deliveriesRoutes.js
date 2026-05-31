const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/deliveryController');
const { verifyToken } = require('../middleWares/authenticationMW');

/**
 * Retrieves a list of all deliveries
 * @param {*} req 
 * @param {*} res 
 * @returns list of deliveries or error message
 */
router.get('/', verifyToken, ctrl.list);

/**
 * Accepts a delivery
 * @param {*} req 
 * @param {*} res 
 * @returns success message or error message
 */
router.post('/accept/:id', verifyToken, ctrl.accept);

/**
 * Updates the status of a delivery
 * @param {*} req 
 * @param {*} res 
 * @returns success message or error message
 */
router.post('/status/:id', verifyToken, ctrl.updateStatus);

module.exports = router;


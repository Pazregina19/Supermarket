const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/courierController');
const { verifyToken } = require('../middleWares/authenticationMW');
const { isAdmin } = require('../middleWares/roleMW');

/**
 * Retrieves a list of all couriers
 * @param {*} req 
 * @param {*} res 
 * @returns list of couriers or error message
 */
router.get('/', verifyToken, isAdmin, ctrl.list);

module.exports = router;
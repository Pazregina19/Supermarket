const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const verifyToken = require('../middleWares/authenticationMW');
const isAdmin = require('../middleWares/roleMW');

// CREATE ORDER
router.post('/create', verifyToken, orderController.create);

// LIST ALL ORDERS
router.get('/', orderController.list);

// GET ONE ORDER
router.get('/:id', orderController.getOne);

// UPDATE STATUS
router.patch('/:id/status', verifyToken,  isAdmin, orderController.updateStatus);

// ASSIGN COURIER
router.patch('/:id/assign-courier',  verifyToken, isAdmin, orderController.assignCourier);

module.exports = router;
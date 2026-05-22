const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// CREATE ORDER
router.post('/', orderController.create);

// LIST ALL ORDERS
router.get('/', orderController.list);

// GET ONE ORDER
router.get('/:id', orderController.getOne);

// UPDATE STATUS
router.patch('/:id/status', orderController.updateStatus);

// ASSIGN COURIER
router.patch('/:id/assign-courier', orderController.assignCourier);

module.exports = router;
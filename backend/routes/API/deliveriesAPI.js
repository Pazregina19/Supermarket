const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/API/deliveryAPIController');
const { verifyToken } = require('../../middleWares/authenticationMW');

router.get('/my', verifyToken, ctrl.getMyDeliveries);
router.get('/', verifyToken, ctrl.getPending);
router.put('/:id/accept', verifyToken, ctrl.accept);
router.put('/:id/deliver', verifyToken, ctrl.markDelivered);

module.exports = router;
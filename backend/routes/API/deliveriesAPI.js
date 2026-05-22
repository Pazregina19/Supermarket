const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/deliveryController'); // já existe
const { verifyToken } = require('../../middleWares/authJWT');

router.get('/', verifyToken, ctrl.list);
router.put('/:id/accept', verifyToken, ctrl.accept);
router.put('/:id/status', verifyToken, ctrl.updateStatus);

module.exports = router;
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/deliveryController');
const { verifyToken } = require('../middleWares/authenticationMW');

router.get('/', verifyToken, ctrl.list);
router.post('/accept/:id', verifyToken, ctrl.accept);
router.post('/status/:id', verifyToken, ctrl.updateStatus);

module.exports = router;


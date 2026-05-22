const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/deliveryController');
const { isAuthenticated } = require('../middleWares/authenticationMW');

router.get('/', isAuthenticated, ctrl.list);
router.post('/accept/:id', isAuthenticated, ctrl.accept);
router.post('/status/:id', isAuthenticated, ctrl.updateStatus);

module.exports = router;


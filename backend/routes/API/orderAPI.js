const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/API/orderAPIController');
const { verifyToken } = require('../../middleWares/authenticationMW');

router.post('/', verifyToken, ctrl.create);
router.put('/:id/status', verifyToken, ctrl.updateStatus);
router.get('/', verifyToken, ctrl.getAll);

module.exports = router;
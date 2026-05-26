const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/supermarketController');
const { verifyToken } = require('../../middleWares/authenticationMW');

router.get('/', ctrl.list);
router.get('/:id', ctrl.getOne);
router.post('/', verifyToken, ctrl.save);
router.put('/:id/approve', verifyToken, ctrl.approve);

module.exports = router;
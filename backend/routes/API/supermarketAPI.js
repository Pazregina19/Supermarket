const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/supermarketController');
const { verifyToken } = require('../../middleWares/authenticationMW');
const { isAdminAPI } = require('../../middleWares/roleMW');

router.get('/', ctrl.list);
router.get('/:id', ctrl.getOne);
router.post('/', verifyToken, ctrl.save);
router.put('/:id/approve', verifyToken, isAdminAPI, ctrl.approve);

module.exports = router;
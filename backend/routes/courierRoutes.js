const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/courierController');
const { verifyToken } = require('../middleWares/authenticationMW');
const { isAdmin } = require('../middleWares/roleMW');

router.get('/', verifyToken, isAdmin, ctrl.list);

module.exports = router;
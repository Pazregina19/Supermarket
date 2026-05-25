const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/dashboardController');
const { verifyToken } = require('../middleWares/authenticationMW');

router.get('/', verifyToken, ctrl.getDashboard);

module.exports = router;
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/dashboardController');
const { isAuthenticated } = require('../middleWares/authenticationMW');

router.get('/', isAuthenticated, ctrl.getDashboard);

module.exports = router;
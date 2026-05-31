const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/dashboardController');

/**
 * Renders the dashboard page
 * @param {*} req 
 * @param {*} res
 */
router.get('/', ctrl.getDashboard);

module.exports = router;

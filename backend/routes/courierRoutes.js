const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/courierController');
const { isAuthenticated } = require('../middleWares/authenticationMW');
const { isAdmin } = require('../middleWares/roleMW');

router.get('/', isAuthenticated, isAdmin, ctrl.list);

module.exports = router;
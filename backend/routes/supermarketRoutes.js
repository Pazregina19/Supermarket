const express = require('express');
const router = express.Router();
const supermarketController = require('../controllers/supermarketController');
const { isAuthenticated } = require('../middleWares/authenticationMW');
const { isAdmin } = require('../middleWares/roleMW');

router.get('/', supermarketController.list);
router.get('/create', supermarketController.create);
router.post('/create', supermarketController.save);
router.post('/approve/:id', isAuthenticated, isAdmin, supermarketController.approve);

router.get('/:id', supermarketController.getOne);
module.exports = router;


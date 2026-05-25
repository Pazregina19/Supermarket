const express = require('express');
const router = express.Router();
const supermarketController = require('../controllers/supermarketController');
const { verifyToken } = require('../middleWares/authenticationMW');
const { isAdmin } = require('../middleWares/roleMW');

router.get('/', supermarketController.list);
router.get('/create', supermarketController.create);
router.post('/create', verifyToken, supermarketController.save);
router.post('/approve/:id', verifyToken, isAdmin, supermarketController.approve);

router.get('/:id', supermarketController.getOne);
module.exports = router;


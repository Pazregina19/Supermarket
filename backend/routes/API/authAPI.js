const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/API/authAPIController');
const { verifyToken } = require('../../middleWares/authenticationMW');

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/me', verifyToken, ctrl.me);

module.exports = router;
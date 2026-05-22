const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/authAPIController');
const { verifyToken } = require('../../middleWares/authJWT');

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/me', verifyToken, ctrl.me);

module.exports = router;
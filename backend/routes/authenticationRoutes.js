const express = require('express');
const router = express.Router();
const auth = require('../controllers/authenticationControllers');

/**
 * Renders the registration page
 * @param {*} req 
 * @param {*} res 
 */
router.get('/register', auth.getRegister);

/**
 * Handles the registration form submission
 * @param {*} req 
 * @param {*} res 
 */
router.post('/register', auth.postRegister);

router.get('/login', auth.getLogin);

/**
 * Handles the login form submission
 * @param {*} req 
 * @param {*} res 
 */
router.post('/login', auth.postLogin);

/**
 * Logs the user out
 * @param {*} req 
 * @param {*} res 
 */
router.get('/logout', auth.logout);

module.exports = router;
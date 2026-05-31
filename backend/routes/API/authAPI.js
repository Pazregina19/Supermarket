const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/API/authAPIController');
const { verifyToken } = require('../../middleWares/authenticationMW');

/**@swagger
 * tags:
 *   name: Authentication
 *   description: User registration and login
 */
/**@swagger
 * Registers a new user
 * @param {*} req 
 * @param {*} res 
 */
router.post('/register', ctrl.register);

/**@swagger
 * Logs in a user
 * @param {*} req 
 * @param {*} res 
 */
router.post('/login', ctrl.login);

/**@swagger
 * Retrieves the authenticated user's information
 * @param {*} req 
 * @param {*} res 
 */
router.get('/me', verifyToken, ctrl.me);

module.exports = router;
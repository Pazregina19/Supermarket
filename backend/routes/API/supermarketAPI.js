const express =require('express');
const router =express.Router();

const ctrl =require('../../controllers/API/supermarketAPIController');
const {verifyToken} = require('../../middleWares/authenticationMW');
const {isAdminAPI} = require('../../middleWares/roleMW');

/**
 * Retrieves all supermarkets
 * @param {*} req 
 * @param {*} res 
 * @returns list of supermarkets or error message
 */
router.get('/', ctrl.getAll);

/**
 * Retrieves the logged-in user's supermarket
 * @param {*} req 
 * @param {*} res 
 * @returns user's supermarket or error message
 */
router.get('/mine', verifyToken, ctrl.getMine);

/**
 * Retrieves a specific supermarket
 * @param {*} req 
 * @param {*} res 
 * @returns supermarket or error message
 */
router.get('/:id', ctrl.getOne);

/**
 * Creates a new supermarket
 * @param {*} req 
 * @param {*} res 
 * @returns created supermarket or error message
 */
router.post('/', verifyToken, ctrl.save);

/**
 * Approves a supermarket
 * @param {*} req 
 * @param {*} res 
 * @returns approved supermarket or error message
 */
router.put('/:id/approve', verifyToken, isAdminAPI, ctrl.approve);

module.exports =
router;
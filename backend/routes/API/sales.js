const express =require('express');
const router =express.Router();
const ctrl =require('../../controllers/API/salesAPIController');

const {
  verifyToken
} = require('../../middleWares/authenticationMW');

/**
 * Retrieves all sales * @param {*} req 
 * @param {*} res 
 * @returns list of sales or error message
 */
router.get('/',verifyToken,ctrl.getAll);

/**
 * Creates a new sale
 * @param {*} req 
 * @param {*} res 
 * @returns created sale or error message
 */
router.post(  '/',verifyToken,ctrl.create);


module.exports =
router;
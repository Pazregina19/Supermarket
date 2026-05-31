const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

/**
 * Renders the create sale page
 * @param {*} req 
 * @param {*} res
 */
router.get('/create', salesController.create);

/**
 * Handles the create sale form submission
 * @param {*} req 
 * @param {*} res 
 * @returns created sale or error message
 */
router.post('/create', salesController.save);

/**
 * Retrieves a list of all sales
 * @param {*} req 
 * @param {*} res 
 * @returns list of sales or error message
 */
router.get('/', salesController.list);

module.exports = router;
const express =require('express');
const router =express.Router();

const ctrl =require('../../controllers/API/supermarketAPIController');
const {verifyToken} = require('../../middleWares/authenticationMW');
const {isAdminAPI} = require('../../middleWares/roleMW');

// Get all
router.get('/', ctrl.getAll);

// Get mine
router.get('/mine', verifyToken, ctrl.getMine);

// Get one
router.get('/:id', ctrl.getOne);

// Create Supermarket
router.post('/', verifyToken, ctrl.save);

// Approve Supermarket
router.put('/:id/approve', verifyToken, isAdminAPI, ctrl.approve);

module.exports =
router;
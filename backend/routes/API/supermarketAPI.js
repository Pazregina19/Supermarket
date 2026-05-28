const express =require('express');
const router =express.Router();

const ctrl =require('../../controllers/API/supermarketAPIController');
const {verifyToken} = require('../../middleWares/authenticationMW');
const {isAdminAPI} = require('../../middleWares/roleMW');

// Get all
router.get('/',ctrl.getAll);

// Get one
router.get('/:id',ctrl.getOne);

// Create Supermarket
router.post('/',ctrl.save);

// Approve Supermarket
router.put('/:id/approve',verifyToken,isAdminAPI,ctrl.approve);

module.exports =
router;
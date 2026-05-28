const express =require('express');
const router =express.Router();
const ctrl =require('../../controllers/API/salesAPIController');

const {
  verifyToken
} = require('../../middleWares/authenticationMW');

router.get('/',verifyToken,ctrl.getAll);
router.post(  '/',verifyToken,ctrl.create);

module.exports =
router;
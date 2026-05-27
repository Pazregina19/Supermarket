const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/API/productAPIController');
const { verifyToken } = require('../../middleWares/authenticationMW');

router.get('/compare', ctrl.compare);
router.get('/', ctrl.getAll);
router.post('/', verifyToken, ctrl.save);
router.put('/:id', verifyToken, ctrl.update);
router.delete('/:id', verifyToken, ctrl.delete);

module.exports = router;
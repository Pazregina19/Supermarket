const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/productController');
const apiCtrl = require('../../routes/API/productAPIController');
const { verifyToken } = require('../../middleWares/authenticationMW');

router.get('/compare', apiCtrl.compare);
router.get('/', ctrl.list);
router.get('/:id', ctrl.view);
router.post('/', verifyToken, ctrl.save);
router.put('/:id', verifyToken, ctrl.update);
router.delete('/:id', verifyToken, ctrl.delete);

module.exports = router;
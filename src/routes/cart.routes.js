let router = require('express').Router();
const cart = require('../controllers/cart.controller.js');

router.get('/getAll', cart.findAll);

router.post('/create', cart.create);
router.get('/detail/:id', cart.findOne);
router.delete('/delete/:id', cart.deleteOne);
router.delete('/deleteMulti', cart.deleteOne);

module.exports = router;

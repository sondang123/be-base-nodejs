let router = require('express').Router();
const Roles = require('../controllers/role.controller.js');

// router.get('/getAll', cart.findAll);

router.post('/create', Roles.create);

module.exports = router;

const express = require('express');

const cartRouter = require('./cart.routes');
const usersRouter = require('./user.routers');
const rolesRouter = require('./role.routers');

const router = express.Router();

router.use('/cart', cartRouter);

router.use('/users', usersRouter);
router.use('/role', rolesRouter);
module.exports = router;

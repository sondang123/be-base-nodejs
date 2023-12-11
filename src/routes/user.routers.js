let router = require('express').Router();
const users = require('../controllers/user.controller.js');

router.get('/getAll', users.getAll);

router.post('/register', users.create);
router.get('/getMe/:accountId', users.getMe);
// router.delete('/delete/:id', cart.deleteOne);
// router.delete('/deleteMulti', cart.deleteOne);

module.exports = router;

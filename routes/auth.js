var express = require('express');

var controller = require('../controllers/auth');

var router = express.Router();

router.get('/login', controller.login);

router.post('/login', controller.postlogin);

router.get('/logout', controller.logOut);

module.exports = router;
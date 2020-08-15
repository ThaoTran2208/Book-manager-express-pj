var express = require('express');

var controller = require('../controllers/signup');
var validate = require('../validate/users');

var router = express.Router();

router.get('/', controller.signUp);
router.post('/', validate.postindex, controller.postSignUp);

// router.post('/signUp', controller.postsignUp);

module.exports = router;
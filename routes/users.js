var express = require('express');

var controller = require('../controllers/users');

var validate = require('../validate/users');

var router = express.Router();

//users
router.get('/', controller.getindex);

router.post('/', validate.postindex, controller.postindex);

router.get('/:id/edit', controller.getedit);

router.post('/:id/edit', controller.postedit);

router.get('/:id/delete', controller.getdelete);

module.exports = router;
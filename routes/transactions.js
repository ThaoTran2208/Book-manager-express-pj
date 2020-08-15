var express = require('express');

var controller = require('../controllers/transactions')

var router = express.Router();

router.get('/', controller.getindex);

router.post('/', controller.postindex);

router.get('/rent/:sessionId', controller.addToTrans)

router.get('/:id/complete', controller.getcomplete);

module.exports = router;
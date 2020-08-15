var express = require('express');
var multer  = require('multer');

var controller = require('../controllers/books')

var router = express.Router();

var upload = multer({ dest: "./public/uploads/" });

router.get('/', controller.getindex);

router.post('/', upload.single("cover"), controller.postindex);

router.get('/:id/view', controller.getview);

router.get('/:id/update', controller.getupdate);

router.post('/:id/update', upload.single("cover"), controller.postupdate);

router.get("/:id/delete", controller.getdelete);

module.exports = router;
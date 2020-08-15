var express = require('express');
var multer  = require('multer');

var controller = require('../controllers/profile');

var router = express.Router();

var upload = multer({ dest: "./public/uploads/" });



router.get('/', controller.index);
router.post('/', controller.postindex);
router.get('/avatar', controller.getavatar);
router.post("/avatar", upload.single("avatar"), controller.postavatar);

module.exports = router;
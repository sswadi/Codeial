const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');


router.get('/', homeController.home);
router.use('/user', require('./userP'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));

router.use('/api', require('./api'));

module.exports = router;
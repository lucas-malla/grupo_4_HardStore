let express = require('express');
let router = express.Router();
//let remember = require('../services/remember')

const homeController =  require('../controllers/homeController');
router.get('/', homeController.home);

module.exports = router;
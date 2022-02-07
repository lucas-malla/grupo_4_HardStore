let express = require('express');
let router = express.Router();


const homeController =  require('../controllers/homeController');
router.get('/', homeController.home);

const userController =  require('../controllers/userController');
router.get('/login', userController.login);
router.get('/register', userController.register);

module.exports = router;
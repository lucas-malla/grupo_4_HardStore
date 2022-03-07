let express = require('express');
let router = express.Router();


const userController =  require('../controllers/userController');
router.get('/login', userController.login);
router.get('/register', userController.register);

router.post('/login', userController.loginPost);
router.post('/register', userController.registerPost)

module.exports = router;
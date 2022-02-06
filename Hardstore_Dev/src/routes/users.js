let express = require('express');
let router = express.Router();

const userController =  require('../controllers/userController');
console.log("ingreso")

router.get('/login', userController.login);

router.get('/register', userController.register)


module.exports = router;
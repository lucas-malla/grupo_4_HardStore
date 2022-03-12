let express = require('express');
let router = express.Router();
const userController =  require('../controllers/userController');

//multer
var multerWraper = require('../middlewares/multer') //multer as a function
var uploadFile = multerWraper("users") //multer for user avatar

//validations midellwares
const userValidations = require('../middlewares/userValidations');
let validationsReg = userValidations.validationsReg
let validationsLogin = userValidations.validationsLogin


router.get('/login', userController.login);
router.get('/register', userController.register);
router.get('/check', userController.userCheck);
router.get('/logout', userController.logout);


router.post('/login', validationsLogin, userController.loginPost);
router.post('/register',uploadFile.single('avatar'), validationsReg, userController.registerPost)

router.get('/user/:userName', userController.profile)
router.get('/user/:userName/edit', userController.profileEdit)

module.exports = router;
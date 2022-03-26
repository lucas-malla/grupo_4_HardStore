let express = require('express');
let router = express.Router();
const userController =  require('../controllers/userController');
const prodCartController =  require('../controllers/prodCartController');
const userMiddleware = require('../middlewares/user');

//multer
var multerWraper = require('../middlewares/multer') //multer as a function
var uploadFile = multerWraper("users") //multer for user avatar

//validations midellwares
const userValidations = require('../middlewares/userValidations');
let validationsReg = userValidations.validationsReg
let validationsLogin = userValidations.validationsLogin


router.get('/login', userController.login);
router.get('/register', userController.register);
router.get('/logout', userController.logout);


router.post('/login', validationsLogin, userController.loginPost);
router.post('/register',uploadFile.single('avatar'), validationsReg, userController.registerPost)

router.get('/user/:id',userMiddleware, userController.profile)
router.get('/user/:userName/edit',userMiddleware, userController.profileEdit)

//PRODUCT CART
//logged user
router.get('/user/:id/productCart' ,userMiddleware, prodCartController.cartLogged);
//Unlogged user
router.get('/user//productCart',prodCartController.cartUnlogged);

//TEST
router.get('/check', userController.userCheck);

module.exports = router;
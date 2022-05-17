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

//ROUTES
router.get('/login', userController.login);
router.get('/register', userController.register);
router.get('/logout', userController.logout);

router.post('/login', validationsLogin, userController.loginPost);
router.post('/register',uploadFile.single('avatar'), validationsReg, userController.registerPost)

router.get('/user/:id',userMiddleware, userController.profile)

router.get('/user/:id/edit',userMiddleware, userController.profileEdit)
router.post('/user/:id/edit',uploadFile.single('avatar'), userMiddleware, userController.profileEditPost)


//PRODUCT CART
router.get('/user/:id/productCart', userMiddleware, prodCartController.cartLogged);     //logged user
router.get('/user//productCart', prodCartController.cartUnlogged);                      //Unlogged user


module.exports = router;
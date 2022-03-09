let express = require('express');
let router = express.Router();
const { body } = require('express-validator')
const userController =  require('../controllers/userController');


var multerWraper = require('../services/multer') //multer as a function
var uploadFile = multerWraper("users") //multer for user avatar

const validationsReg = [
    body('userName').notEmpty().withMessage("Ingresa tu nombre de usuario"),
    body('email').notEmpty().withMessage("Ingresa un Email").bail()
                .isEmail().withMessage("Email invalido"),
    body('password').notEmpty().withMessage("Ingrese una contraseña"),
    body('password_repeat').notEmpty().withMessage("Repita su contraseña"),
    //body('password_1').matches(body('password_2')).withMessage("Las contraseñas no coinciden"),
]

router.get('/login', userController.login);
router.get('/register', userController.register);

router.post('/login', userController.loginPost);
router.post('/register',uploadFile.single('avatar'), validationsReg, userController.registerPost)

module.exports = router;
let express = require('express');
let router = express.Router();
const { body } = require('express-validator')
const userController =  require('../controllers/userController');


const validationsReg = [
    body('userName').notEmpty().withMessage("Nombre de usuario no ingresado"),
    body('email').isEmail().withMessage("Email invalido"),
    body('password_1').notEmpty().withMessage("Ingrese una contraseña"),
    body('password_2').notEmpty().withMessage("Repita su contraseña"),
    //body('password_1').matches(body('password_2')).withMessage("Las contraseñas no coinciden"),
]

router.get('/login', userController.login);
router.get('/register', userController.register);

router.post('/login', userController.loginPost);
router.post('/register', validationsReg, userController.registerPost)

module.exports = router;
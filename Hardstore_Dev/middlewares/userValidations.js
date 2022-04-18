const { body } = require('express-validator')

const userValidations = {
    validationsReg :  [
        body('userName').notEmpty().withMessage("Ingrese su nombre de usuario"),
        body('email').notEmpty().withMessage("Ingrese un Email").bail()
                    .isEmail().withMessage("Email invalido"),
        body('password').notEmpty().withMessage("Ingrese una contraseña"),
        body('password_repeat').notEmpty().withMessage("Repita su contraseña"),
        //body('password_1').matches(body('password_2')).withMessage("Las contraseñas no coinciden"),
        ],
    validationsLogin :  [
        body('userName').notEmpty().withMessage("Ingrese su nombre de usuario"),
        body('password').notEmpty().withMessage("Ingrese una contraseña"),
        ]
}

module.exports = userValidations
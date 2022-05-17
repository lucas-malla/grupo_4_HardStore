const { body } = require('express-validator')
const { User } =  require('../database/models')
const bcryptjs = require('bcryptjs')

const userValidations = {
    validationsReg :  [
        body('userName').notEmpty().withMessage("Ingrese su nombre de usuario").bail()
                        .isLength({ min: 2 }).withMessage("El usuario debe tener al menos 2 caracteres").bail()
                        .custom((value) => {
                                return User.findOne({raw: true, where: {username : value}})
                                .then(user => {
                                    return (user == null ? true : Promise.reject() )
                                })                      
                        }).withMessage('El nombre de usuario ya se encuentra registrado'),
        body('email').notEmpty().withMessage("Ingrese un Email").bail()
                    .isEmail().withMessage("Email invalido").bail()
                    .custom((value) => {
                        return User.findOne({raw: true, where: {email : value}})
                        .then(user => {
                            return (user == null ? true : Promise.reject() )
                        });                      
                }).withMessage('El Email ya se encuentra registrado'),
        body('password').notEmpty().withMessage("Ingrese una contraseña").bail()
                        .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres").bail()
                        .matches(/[A-Z]/).withMessage("1").withMessage("La contraseña debe contener un caracter en mayuscula").bail()
                        .matches(/[0-9]/).withMessage("2").withMessage("La contraseña debe contener un numero").bail()
                        .matches(/[¡¿?!&#%]/).withMessage("3").withMessage("La contraseña debe contener un caracter especial"),
        body('password_repeat').notEmpty().withMessage("Repita su contraseña").bail()
                        .custom((value, { req }) => {
                            return (value == req.body.password ? true : Promise.reject() )
                        }).withMessage('Las contraseñas ingresadas no coinciden')
    ],
    validationsLogin : [
        body('userName').notEmpty().withMessage("Ingrese su nombre de usuario").bail()
                        .custom((value) => {
                            return User.findOne({raw: true, where: {username : value}})
                            .then(user => {
                                return (user != null ? true : Promise.reject() )
                            })                      
                        }).withMessage('Usuario o contraseña invalida M').bail(),
        body('password').notEmpty().withMessage("Ingrese una contraseña").bail()
                        .custom((value, {req}) => {
                            return User.findOne({raw: true, where: {username : req.body.userName }})
                                .then(user => {
                                    return bcryptjs.compare(value, user.password)
                                        .then(passMach => {
                                            return (passMach==true ? true : Promise.reject())
                                        })    
                                })                      
                        }).withMessage('Usuario o contraseña invalida M').bail(),
    ]
}

module.exports = userValidations

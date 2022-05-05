const { body } = require('express-validator')
const { User } =  require('../database/models')
const bcryptjs = require('bcryptjs')

const userValidations = {
    validationsReg :  [
        body('userName').notEmpty().withMessage("Ingrese su nombre de usuario MIDELLWARE").bail()
                        .isLength({ min: 2 }).withMessage("El nombre de usuario debe tener al menos 2 caracteres MIDELLWARE").bail()
                        .custom((value) => {
                                return User.findOne({raw: true, where: {username : value}})
                                .then(user => {
                                    return (user == null ? true : Promise.reject() )
                                })                      
                        }).withMessage('El nombre de usuario ya se encuentra registrado MIDELLWARE'),
        body('email').notEmpty().withMessage("Ingrese un Email MIDELLWARE").bail()
                    .isEmail().withMessage("Email invalido MIDELLWARE").bail()
                    .custom((value) => {
                        return User.findOne({raw: true, where: {email : value}})
                        .then(user => {
                            return (user == null ? true : Promise.reject() )
                        });                      
                }).withMessage('El Email ya se encuentra registrado MIDELLWARE'),
        body('password').notEmpty().withMessage("Ingrese una contraseña MIDELLWARE").bail()
                        .isLength({ min: 8 }).withMessage("la contraseña debe tener al menos 8 caracteres MIDELLWARE").bail()
                        .matches(/[A-Z]/).withMessage("1").withMessage("La contraseña debe contener un caracter en mayuscula MIDELLWARE").bail()
                        .matches(/[0-9]/).withMessage("2").withMessage("La contraseña debe contener un numero MIDELLWARE").bail()
                        .matches(/[¡¿?!&#%]/).withMessage("3").withMessage("La contraseña debe contener un caracter especial MIDELLWARE"),
        body('password_repeat').notEmpty().withMessage("Repita su contraseña MIDELLWARE").bail()
                        .custom((value, { req }) => {
                            return (value == req.body.password ? true : Promise.reject() )
                        }).withMessage('Las contraseñas ingresadas no coinciden MIDELLWARE')
    ],
    validationsLogin : [
        body('userName').notEmpty().withMessage("Ingrese su nombre de usuario MIDELLWARE").bail()
                        .custom((value) => {
                            return User.findOne({raw: true, where: {username : value}})
                            .then(user => {
                                return (user != null ? true : Promise.reject() )
                            })                      
                        }).withMessage('Usuario o contraseña invalida MIDELLWARE'),
        body('password').notEmpty().withMessage("Ingrese una contraseña MIDELLWARE").bail()
                        .custom((value, {req}) => {
                            return User.findOne({raw: true, where: {username : req.body.userName }})
                                .then(user => {
                                    return bcryptjs.compare(value, user.password)
                                        .then(passMach => {
                                            return (passMach==true ? true : Promise.reject())
                                        })    
                                })                      
                        }).withMessage('Usuario o contraseña invalida MIDELLWARE'),
    ]
}

module.exports = userValidations

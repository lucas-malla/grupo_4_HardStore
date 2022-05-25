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
                        }).withMessage('Usuario o contraseña invalida').bail(),
        body('password').notEmpty().withMessage("Ingrese una contraseña").bail()
                        .custom((value, {req}) => {
                            return User.findOne({raw: true, where: {username : req.body.userName }})
                                .then(user => {
                                    return bcryptjs.compare(value, user.password)
                                        .then(passMach => {
                                            return (passMach==true ? true : Promise.reject())
                                        })    
                                })                      
                        }).withMessage('Usuario o contraseña invalida').bail(),
    ],
    validationsEditUser : [
        body('username').notEmpty().withMessage("El nombre de usuario esta vacio M").bail()
            .isLength({ min: 2 }).withMessage("El nombre de usuario debe tener al menos 2 caracteres M").bail()
            .custom((value, {req}) => {
            return User.findOne({raw: true, where: {username : value}})
                .then(user => {
                    if (user && user.id==req.session.userID){
                        return true
                    } else {
                    return (user == null ? true : Promise.reject() )
                    }
                })
            }).withMessage("El nombre de usuario ya esta en uso M"),
        body('email').notEmpty().withMessage("Ingrese un Email").bail()
            .isEmail().withMessage("Email invalido").bail(),
        //     .custom((value) => {
        //         return(
        //             User.findOne({raw: true, where: {email : value}})
        //                 .then(user => {
        //                     return User.findOne({raw: true, where: {email : value}})
        //                     .then(user => {
        //                         if (user && user.id==req.session.userID){
        //                             return true
        //                         } else {
        //                         return (user == null ? true : Promise.reject() )
        //                         }
        //                     })    
        //                 })             
        //         )
        // }).withMessage('El Email ya se encuentra registrado'),
        body('first_name').notEmpty().withMessage('Debe ingresar su nombre').bail()
            .isLength({min:2}).withMessage('Su nombre debe poseer al menos 2 caracteres').bail(),
        body('last_name').notEmpty().withMessage('Debe ingresar su apellido').bail()
            .isLength({min:2}).withMessage('Su apellido debe poseer al menos 2 caracteres').bail()
        ]
}

module.exports = userValidations

const { body } = require('express-validator')

const productValidations ={
    productCreation: [
    body('prodName').notEmpty().withMessage('Ingrese un nombre de producto').bail()
    .isLength({ min: 5 }).withMessage("El nombre debe tener al menos 5 caracteres").bail(),
    body('brand').notEmpty().withMessage('Ingrese una marca').bail(),
    body('modelo').notEmpty().withMessage('Ingrese un modelo').bail(),
    body('price').notEmpty().withMessage('Ingrese un Precio').bail()
    .isNumeric().withMessage('Ingrese un valor numerico'),
    body('dto').isNumeric().withMessage('Ingrese un valor numerico'),
    body('stock').isNumeric().withMessage('Ingrese un valor numerico').toInt(), 

]}  

module.exports = productValidations
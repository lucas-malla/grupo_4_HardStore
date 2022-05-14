const { body } = require('express-validator')

const productValidations ={
    productCreation: [
    body('prodName').notEmpty().withMessage('Ingrese un nombre de producto').bail()
    .isLength({ min: 5 }).withMessage("El nombre debe tener al menos 5 caracteres").bail(),
    body('brand').notEmpty().withMessage('Ingrese una marca').bail(),
    body('model').notEmpty().withMessage('Ingrese un modelo').bail(),
    body('price').notEmpty().withMessage('Ingrese un Precio').bail()
    .isNumeric().withMessage('Ingrese un valor numerico'),
    body('dto').isNumeric().withMessage('Ingrese un valor numerico'),
    body('stock').isNumeric().withMessage('Ingrese un valor numerico').toInt(),
    body('description').notEmpty().withMessage('Ingrese una descripción')


],
  productModification: [
    body('prodName').notEmpty().withMessage('Ingrese un nombre de producto nuevo').bail()
        .isLength({ min: 5 }).withMessage("El nombre debe tener al menos 5 caracteres").bail(),
    body('brand')
        .notEmpty().withMessage('Ingrese una Marca').bail(),
    body('model')
        .notEmpty().withMessage('Ingrese un Modelo').bail(),
    body('color')
        .notEmpty().withMessage('Ingrese un color').bail(),
    body('price')
        .notEmpty().withMessage('Ingrese un Precio').bail()
        .isNumeric(),
    body('dto')
        .isNumeric().withMessage('Ingrese un valor de descuento'),
    body('stock')
        .isNumeric().withMessage('Ingrese el Stock').toInt(), 
    body('description')
        .notEmpty().isLength({ min: 20}).withMessage('La decripcion es corta'),
    body('mostSold')
        .notEmpty().withMessage('Selecciona una Caracteristica'),
    body('offer')
        .notEmpty().withMessage('Selecciona una Caracteristica'),
    body('selection')
        .notEmpty().withMessage('Selecciona una Caracteristica') 
  ]
}  



module.exports = productValidations
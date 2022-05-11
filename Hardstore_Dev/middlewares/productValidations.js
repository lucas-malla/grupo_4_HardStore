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
<<<<<<< HEAD

],
  productModification: [
    body('prodName').notEmpty().withMessage('Ingrese un nombre de producto nuevo').bail()
    .isLength({ min: 5 }).withMessage("El nombre debe tener al menos 5 caracteres").bail(),
    body('brand').notEmpty().withMessage('Ingrese una marca').bail(),
    body('modelo').notEmpty().withMessage('Ingrese un modelo').bail(),
    body('color').notEmpty().withMessage('Ingrese un color').bail(),
    body('price').notEmpty().withMessage('Ingrese un Precio').bail()
    .isNumeric().withMessage('Ingrese un valor numerico'),
    body('dto').isNumeric().withMessage('Ingrese un valor numerico'),
    body('stock').isNumeric().withMessage('Ingrese un valor numerico').toInt(), 
    body('description').notEmpty().isLength({ min: 20}).withMessage('La decripcion es corta').bail(),
    body('mostSold').notEmpty().withMessage('Tenes que marcar uno')
]}  
=======
]
}  
>>>>>>> 846fb433a90b618b4937a4593bb895aef6c1ecb2

module.exports = productValidations
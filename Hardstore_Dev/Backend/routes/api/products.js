const express = require('express');
const router = express.Router();
const productsAPIController = require('../../controllers/api/productsAPIController');

//Rutas
//listado productos
router.get('/totals', productsAPIController.total)
router.get('/lastProduct', productsAPIController.lastProduct)
router.get('/detail/:id', productsAPIController.detail)
router.get('/categories', productsAPIController.categories)

router.post('/create', productsAPIController.create)
router.get('/?', productsAPIController.list)






module.exports = router;
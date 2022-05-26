const express = require('express');
const router = express.Router();
const productsAPIController = require('../../controllers/api/productsAPIController');

//Rutas
//listado productos
router.get('/?', productsAPIController.pagination)
router.get('/', productsAPIController.list)





module.exports = router;
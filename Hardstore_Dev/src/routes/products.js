let express = require('express');
let router = express.Router();

const productsController =  require('../controllers/productsController');


router.get('/galery', productsController.galery);

router.get('/product-detail/:idProduct?', productsController.detail)


module.exports = router;
let express = require('express');
let router = express.Router({mergeParams: true});


const productsController =  require('../controllers/productsController');
router.get('/galery/:filter?', productsController.galery);
router.get('/:id', productsController.detail)

module.exports = router;
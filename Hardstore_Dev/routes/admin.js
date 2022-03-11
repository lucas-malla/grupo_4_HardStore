let express = require('express');
let router = express.Router();
const adminController =  require('../controllers/adminController');
//var uploadFile = require('../services/multer') //multer as service


var multerWraper = require('../services/multer') //multer as a function
var uploadFile = multerWraper("products") //multer for products images

router.get('/', adminController.login);
router.get('/controlPanel', adminController.controlPanel);

router.get('/products/:id/edit', adminController.manageProductEdit);
router.put('/products/:id/edit',uploadFile.single('prodImg'), adminController.manageProductUpdate);

router.get('/products/create', adminController.addProduct);
router.post('/products/create', uploadFile.single('prodImg'), adminController.addProductPost);

/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', adminController.delete); 


module.exports = router;

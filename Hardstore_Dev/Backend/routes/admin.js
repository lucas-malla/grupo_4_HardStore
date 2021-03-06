let express = require('express');
let router = express.Router();
const adminController =  require('../controllers/adminController');
const adminMiddleware =  require('../middlewares/admin')
const {productCreation, productModification } =  require('../middlewares/productValidations')


var multerWraper = require('../middlewares/multer') //multer as a function
var uploadFile = multerWraper("products") //multer for products images


router.get('/controlPanel',adminMiddleware, adminController.controlPanel);

router.get('/products/:id/edit',adminMiddleware, adminController.manageProductEdit);
router.put('/products/:id/edit',uploadFile.single('prodImg'),adminMiddleware,productModification, adminController.manageProductUpdate);

router.get('/products/create',adminMiddleware, adminController.addProduct);
router.post('/products/create',adminMiddleware, uploadFile.single('prodImg'),productCreation, adminController.addProductPost);

/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id',adminMiddleware, adminController.delete); 

module.exports = router;

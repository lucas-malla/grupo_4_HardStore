let express = require('express');
let router = express.Router();
const multer = require("multer");
const path = require("path");

//multer
var storage = multer.diskStorage({
    destination: function (req, file, cb){
        let folder_path = path.join(__dirname, '../public/images/products');
        cb(null, folder_path)
    },
    filename: function (req, file, cb){
        let image_name =  `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        cb(null, image_name)
    }
})
// validacion de formato de multer
var uploadFile = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const whitelist = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']   
        if (whitelist.includes(file.mimetype)){
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
  });

const adminController =  require('../controllers/adminController');

router.get('/', adminController.login);
router.get('/controlPanel', adminController.controlPanel);
router.get('/products', adminController.products);

router.get('/products/create', adminController.addProduct);
router.get('/products/:id/edit', adminController.manageProduct);

router.post('/products/create', uploadFile.single('prodImg'), adminController.addProductPost);
router.post('/products/:id/edit', adminController.manageProductPost);

module.exports = router;

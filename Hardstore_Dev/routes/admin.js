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
        console.log(file);
        let image_name =  `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        console.log(image_name);
        cb(null, image_name)
    }
})

var uploadFile = multer({ storage });
const adminController =  require('../controllers/adminController');

router.get('/', adminController.login);
router.get('/controlPanel', adminController.controlPanel);
router.get('/addProduct', adminController.addProduct);
router.get('/manageProduct', adminController.manageProduct);

router.post('/addProduct', uploadFile.single('prodImg'), adminController.addProductPost);
router.post('/manageProduct', adminController.manageProductPost);

module.exports = router;

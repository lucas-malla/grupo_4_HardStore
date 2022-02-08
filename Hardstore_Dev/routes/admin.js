let express = require('express');
let router = express.Router();

const adminController =  require('../controllers/adminController');

router.get('/login', adminController.login);
router.get('/addProduct', adminController.addProduct);
router.get('/manageProduct', adminController.manageProduct);


module.exports = router;
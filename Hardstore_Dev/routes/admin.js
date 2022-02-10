let express = require('express');
let router = express.Router();


const adminController =  require('../controllers/adminController');

router.get('/', adminController.login);
router.get('/controlPanel', adminController.controlPanel);
router.get('/addProduct', adminController.addProduct);
router.get('/manageProduct', adminController.manageProduct);

module.exports = router;
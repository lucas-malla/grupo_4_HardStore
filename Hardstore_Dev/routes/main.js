let express = require('express');
let router = express.Router();
let remember = require('../middlewares/remember')

const homeController =  require('../controllers/homeController');
router.get('/', homeController.home);

router.get('/test_user', homeController.test_user);
router.get('/test_product', homeController.test_product);



module.exports = router;
const express = require('express');
const router = express.Router();
const prodCartController =  require('../controllers/prodCartController');

router.get('/productCart',prodCartController.cart);

module.exports = router;
const express = require('express');
const router = express.Router();
const usersAPIController = require('../../controllers/api/usersAPIController');

//API: users
router.get('/', usersAPIController.list)
router.get('/:id', usersAPIController.detail)


module.exports = router;
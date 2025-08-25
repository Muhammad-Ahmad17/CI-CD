const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/hello', userController.getHello);
router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);

module.exports = router;

const express = require('express');
const { login } = require('../controllers/LoginController');
const LoginController = require('../controllers/LoginController');

const router = express.Router();

router.get('/login', LoginController.login);

router.get('/register', LoginController.register);

router.post('/register', LoginController.storeUser);

router.post('/login', LoginController.auth);

router.get('/logout', LoginController.logout);

module.exports = router;
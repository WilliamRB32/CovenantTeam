const express = require(' express ');
const { login } = require('../controllers/LoginController');
const LoginController = require('../controllers/LoginController');

const router = express.Router();

router.get('/login', LoginController.login);

router.get('/register', LoginController.register);
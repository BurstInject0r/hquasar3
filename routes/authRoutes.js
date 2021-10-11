const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');
Login = new loginController();

const registerController = require('../controllers/registerController');
Register = new registerController();

router.get('/login', Login.index);
router.post('/login', Login.login);
router.get('/register', Register.index);
router.post('/register', Register.register);

module.exports = router;
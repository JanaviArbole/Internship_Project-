const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const express = require('express');
const router = express.Router();

// const { signup } = require('../Controllers/AuthController');
// const { signupValidation } = require('../Middlewares/AuthValidation'); 

router.post('/login', loginValidation, login);  
router.post('/signup', signupValidation, signup);  

module.exports = router;
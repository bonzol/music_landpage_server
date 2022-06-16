const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.logIn);
router.post('/checkEmail', authController.checkEmail);
router.post('/checkUsername', authController.checkUsername);


module.exports = router;

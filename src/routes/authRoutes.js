const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

// Use methods from AuthController so responses (including token) come from the controller
router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));

module.exports = router;

const express = require('express');
const router = express.Router();

const validator = require('../middlewares/validator');

const auth = require('./auth');

//public routes
router.post('/auth/login', validator.authenticate, auth.authenticate);
router.post('/auth/register', validator.register, auth.register);
router.post('/auth/send-otp', validator.sendOTP, auth.sendOTP);
router.post('/auth/verify-otp', validator.verifyOTP, auth.verifyOTP);

module.exports = router;

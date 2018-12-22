const express = require('express');
const registration = require('./registration');

const router = express.Router();

router.get('/register-user', registration.register);
router.get('/register-developer', registration.register);
router.get('/register/validate/:token', registration.validateRegistration);

module.exports = router;
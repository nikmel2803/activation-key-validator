const express = require('express');
const registration = require('./registration');

const router = express.Router();

router.get('/register', registration.register);
router.get('/register/token/:token', registration.validateRegistration);

module.exports = router;
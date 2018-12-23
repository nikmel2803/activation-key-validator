const express = require('express');
const registration = require('./registration');

const programId = require('./programId');

const router = express.Router();

router.get('/register-user', registration.register);
router.get('/register-developer', registration.register);
router.get('/register/validate/:token', registration.validateRegistration);

router.get('/buy', programId.buy);
router.get('/register-program', programId.registerProgram);
router.get('/check', programId.check);

module.exports = router;
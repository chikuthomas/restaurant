const express = require('express');
const router = express.Router();

router.post('/signup', signupValidator, validatorResult, signupController); 

module.exports = router;
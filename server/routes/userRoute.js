const express = require('express')

const userCrtl = require('../controller/userController')

const router = express.Router();

router.post('/register', userCrtl.registerUser)


module.exports = router
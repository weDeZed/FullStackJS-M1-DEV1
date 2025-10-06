const express = require('express');
const userCrtl = require('../controller/userController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
router.get('/users', requireAuth, userCrtl.getAllUsers);
module.exports = router;
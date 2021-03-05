const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user_controller');

router.get('/', userController.profile);

module.exports = router;

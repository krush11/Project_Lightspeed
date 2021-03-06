const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user_controller');

router.get('/', userController.profile);
router.post('/add_details', userController.add_details);

module.exports = router;

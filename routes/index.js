const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/vaccine', require('./vaccine'));
router.use('/login', require('./login'));
router.use('/profile', passport.checkAuthentication, require('./user'));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;

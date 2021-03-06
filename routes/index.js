const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/home_controller');
const vaccineController = require('../controllers/vaccine_controller');

router.get('/', homeController.home);
router.get('/vaccine', vaccineController.vaccine);
router.use('/login', require('./login'));
router.use('/profile', passport.checkAuthentication, require('./user'));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;

const express = require('express');
const router = express.Router();
const passport = require('passport');
const authenticationController = require('../controllers/authentication_controller');

router.get('/', authenticationController.login);
router.post('/create_user', authenticationController.create_user);
router.post('/create_session',
    passport.authenticate('local', {
        failureRedirect: '/login'
        // failureFlash: 'Invalid username or password.'
    }), function (req, res) {
        req.session.save(() => {
            res.redirect('/profile');
        })
    });

module.exports = router;

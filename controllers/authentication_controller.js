const Company = require('../models/company');
const passport = require('passport');

module.exports.login = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/profile');
    }
    return res.render('login');
}

module.exports.create_user = async function (req, res) {
    // console.log(req.body);
    // console.log(req.user);
    await Company.findOne({ user: req.body.user }, function (err, user) {
        if (user) {
            return res.redirect('/login');
        }
        else {
            if (req.body.password == req.body.confirm_password) {
                Company.create({
                    "country": req.body.country,
                    "username": req.body.user,
                    "password": req.body.password
                });
            }
        }
    });
    return res.redirect('/profile');
}

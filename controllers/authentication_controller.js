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
            else {
                console.log('Passwords didnt match');
            }
        }
    });
    req.session.save(() => {
        return res.redirect('/profile');
    })
}

module.exports.update_password = async function (req, res) {
    console.log(req.user);
    await Company.findOne({ username: req.user.username }, function (err, user) {
        if (user.password == req.body.current_password && req.body.new_password == req.body.confirm_password) {
            Company.findOneAndUpdate({ username: req.user.username }, { password: req.body.new_password }, { upsert: true }, function (err, doc) {
                if (err) return res.send(500, { error: err });
                // return res.redirect('/profile');
            });
        }
    });
    return res.redirect('/');
}

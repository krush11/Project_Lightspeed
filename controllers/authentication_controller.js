const Company = require('../models/company');
const passport = require('passport');

module.exports.login = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/profile');
    }
    return res.render('login');
}

module.exports.create_user = async function (req, res) {
    try {
        const user = await Company.findOne({ username: req.body.user }); // callback is not passed, it will return a Promise
        if (user) {
            return res.redirect('/login');
        }

        if (req.body.password == req.body.confirm_password) {
            await Company.create({ // wait until user is created
                "country": req.body.country,
                "username": req.body.user,
                "password": req.body.password
            });
            // then redirect page
            req.session.save(() => {
                return res.redirect('/profile');
            });
        } else {
            console.log('Passwords didn\'t match');
            // what happen when password didn't match
            return res.redirect('/login');
        }
    } catch (error) {
        // something went wrong
        console.log(error);
        return res.redirect('/login');
    }
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

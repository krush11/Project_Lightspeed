const Company = require('../models/company');
module.exports.home = function (req, res) {
    const auth = req.isAuthenticated();
    if (auth) {
        Company.findOne({ username: req.user.username }, function (err, user) {
            const required = user.vaccine.availibility - user.vaccine.needed;
            return res.render('home', {
                auth: auth,
                required: required
            });
        });
    }
    else {
        return res.render('home', {
            auth: auth
        });
    }
}

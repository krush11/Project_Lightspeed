const Company = require('../models/company');

module.exports.profile = async function (req, res) {
    await Company.findById(req.user._id, function (err, user) {
        // console.log(user);
        return res.render('profile', {
            profile_user: user
        });
    });
}

module.exports.add_details = async function (req, res) {
    if (req.body.password == req.user.password) {
        let vaccine = {
            name: req.body.name,
            vaccine_type: req.body.vaccine_type,
            availibility: req.body.availibility,
            price: req.body.price,
            extra: req.body.availibility-req.body.needed,
            needed: req.body.needed
        };
        console.log(vaccine.extra);
        Company.findOneAndUpdate({username: req.user.username}, {vaccine: vaccine}, { upsert: true }, function (err, doc) {
            if (err) return res.redirect('/profile');
            return res.redirect('/');
        });
    }
    else {
        return res.redirect('back');
    }
}

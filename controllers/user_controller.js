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
            availibility: req.body.vaccines,
            price: req.body.price,
            needed: req.body.vaccines_needed
        };
        console.log(vaccine, req.user.username, req.vaccine);
        MyModel.findOneAndUpdate(query, req.newData, { upsert: true }, function (err, doc) {
            if (err) return res.send(500, { error: err });
            return res.send('Succesfully saved.');
        });
        console.log(vaccine, req.user.username, req.vaccine);
    }
    else {
        return res.redirect('back');
    }
}

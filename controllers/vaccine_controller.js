const Company = require("../models/company");

module.exports.vaccine = function (req, res) {
    Company.find({}, function (err, allUsers) {
        if (err) {
            console.log(err);
        } else {
            res.render('vaccine', { users: allUsers })
        }
    })
};

const Company = require("../models/company");
const Transaction = require("../models/transactions");

module.exports.transaction_req = function (req, res) {
    if (req.isAuthenticated()) {
        const req_url = req.url.slice(1);
        // console.log(typeof(req_url));
        Company.findOne({ 'vaccine.name': req_url }, function (err, user) {
            if (user.vaccine.name == req.user.vaccine.name) {
                res.redirect('/vaccine');
            }
            else {
                return res.render('transaction', {
                    req_user: user
                });
            }
        });

    }
    else {
        return res.redirect('/login');
    }
};

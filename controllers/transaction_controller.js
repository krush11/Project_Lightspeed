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

module.exports.create_tracsaction = function (req, res) {
    Company.findOne({ username: req.body.req_from }, function (err, user) {
        if (user.vaccine.extra < req.body.req_vac) {
            return res.redirect('/vaccine');
        }
        else {
            var data = {
                req_from: req.body.req_from,
                req_to: req.body.req_to,
                amt_req: req.body.req_vac,
                transaction_status: "Awaiting confirmation",
                vaccine: user.vaccine.name,
                transaction_value: user.vaccine.price * req.body.req_vac
            }
            Transaction.create(data);
            return res.redirect('/vaccine');
        }
    })
    console.log(req.body);
};

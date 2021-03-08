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
                transaction_value: (user.vaccine.price+req.body.shipping) * req.body.req_vac
            }
            Transaction.create(data);
            return res.redirect('/vaccine');
        }
    })
    console.log(req.body);
};

module.exports.declined = async function (req, res) {
    const transac_id = req.url.slice(9);
    await Transaction.findOneAndUpdate({ _id: transac_id }, { transaction_status: 'declined' }, { upsert: true }, function (err, doc) {
        if (err) return res.send(500, { error: err });
        // return res.redirect('/profile');
    });
    return res.redirect('/vaccine');
};

module.exports.accepted = async function (req, res) {
    const transac_id = req.url.slice(8);
    await Transaction.findOneAndUpdate({ _id: transac_id }, { transaction_status: 'accepted' }, { upsert: true }, function (err, doc) {
        if (err) return res.send(500, { error: err });
    });
    await Transaction.findOne({ _id: transac_id }, function (err, transac) {
        var req_from = transac.req_from;
        var req_to = transac.req_to;
        Company.findOne({ username: req_from }, function (err, user) {
            var available = user.vaccine.availibility - transac.amt_req;
            var extra_vac = user.vaccine.extra - transac.amt_req;
            console.log(extra_vac, user.vaccine.extra);
            console.log(user.vaccine.availibility);
            Company.findOneAndUpdate({ username: req_from }, {
                'vaccine.name': user.vaccine.name,
                'vaccine.price': user.vaccine.price,
                'vaccine.needed': user.vaccine.needed,
                'vaccine.vaccine_type': user.vaccine.vaccine_type,
                'vaccine.availibility': available,
                'vaccine.extra': extra_vac
            }, { upsert: true }, function (err, doc) {
                if (err) return res.send(500, { error: err });
                console.log(user.vaccine.availibility);
            });
        });
        Company.findOne({ username: req_to }, function (err, user) {
            var available = user.vaccine.availibility + transac.amt_req;
            var extra_vac = user.vaccine.extra + transac.amt_req;
            Company.findOneAndUpdate({ username: req_to }, {
                'vaccine.name': user.vaccine.name,
                'vaccine.price': user.vaccine.price,
                'vaccine.needed': user.vaccine.needed,
                'vaccine.vaccine_type': user.vaccine.vaccine_type,
                'vaccine.availibility': available,
                'vaccine.extra': extra_vac
            }, { upsert: true }, function (err, doc) {
                if (err) return res.send(500, { error: err });
            });
        });
    });

    return res.redirect('/vaccine');
};

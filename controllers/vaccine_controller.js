const Company = require("../models/company");
const Transaction = require('../models/transactions');
module.exports.vaccine = async function (req, res) {
    await Company.find({}, function (err, allUsers) {
        if (err) {
            console.log(err);
        } else {
            Transaction.find({}, function (err2, allTransactions) {
                res.render('vaccine', {
                    users: allUsers,
                    allTransactions: allTransactions,
                    auth: req.isAuthenticated()? true : false
                });
            });
        }
    });
};

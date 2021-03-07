const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction_controller')
;const vaccineController = require('../controllers/vaccine_controller');
const Company = require('../models/company');
router.get('/', vaccineController.vaccine);

Company.find({}, function (err, user) {
    router.get('/:_id' , transactionController.transaction_req)
})
module.exports = router;

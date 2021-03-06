const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    country: {
        type: String,
    },
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    vaccine: {
        name: String,
        price: Number,
        availibility: Number,
        extra: Number,
        needed: Number,
        vaccine_type: String
    }
}, {
    timestamps: true
});

const Company = mongoose.model('company_list', companySchema);
module.exports = Company;

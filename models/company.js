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
        availibility: {
            type: Number,
            default: 0
        },
        extra: Number,
        needed: {
            type: Number,
            default: 0
        },
        vaccine_type: String
    }
}, {
    timestamps: true
});

const Company = mongoose.model('company_list', companySchema);
module.exports = Company;

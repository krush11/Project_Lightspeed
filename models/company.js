const mongoose = require('mongoose');   

const companySchema = new mongoose.Schema({
     country: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    vaccine: {
        name: String,
        price: Number,
        availibility: Number,
        needed: Number
    }

}, {
    timestamps: true
});

const Company = mongoose.model('company_list', companySchema);
module.exports = Company;

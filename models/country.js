const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
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
    }   
}, {
    timestamps: true
});

const Country = mongoose.model('country_list', countrySchema);
module.exports = Country;

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    req_from: {
        type: String,
        required: true
    },
    req_to: {
        type: String,
        required: true
    },
    amt_req: {
        type: Number,
        required:true
    },
    transaction_status: {
        type: String,
        default: "Awaiting confirmation"
    },
    vaccine: String,
    transaction_value: Number
}, {
    timestamps: true
});

const Transaction = mongoose.model('transactions', transactionSchema);
module.exports = Transaction;

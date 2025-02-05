const mongoose = require('mongoose');

const AddTransactionIdSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        unique: true,  
    },
    fullname: {
        type: String,
    },
    counselor: {
        type: String,
    },
});

module.exports = mongoose.model('AddTransactionId', AddTransactionIdSchema);
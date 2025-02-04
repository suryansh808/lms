const mongoose = require('mongoose');

const AddTransactionIdSchema = new mongoose.Schema({
    fullname: {
        type: String,
    },
    transactionId: {
        type: String,
        unique: true,
        
    }
});

module.exports = mongoose.model('AddTransactionId', AddTransactionIdSchema);
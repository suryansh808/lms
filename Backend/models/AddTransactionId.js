const mongoose = require('mongoose');

const AddTransactionIdSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        unique: true,
        
    },
});

module.exports = mongoose.model('AddTransactionId', AddTransactionIdSchema);
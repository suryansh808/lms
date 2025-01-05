const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    fullname: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    otp: {
        type: String,
    }
});

const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;
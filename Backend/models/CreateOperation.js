const mongoose = require("mongoose")

const CreateOperation = new mongoose.Schema({
    fullname: {type:String, unique: true , lowercase: true,},
    email: { type: String, unique: true , lowercase: true, },
    otp: { type: String },
    password: { type: String },
    mailSended: { type: Boolean, default: false },
});

const Operation =  mongoose.model("Operation" , CreateOperation);
module.exports = Operation;
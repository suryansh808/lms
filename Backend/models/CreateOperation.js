const mongoose = require("mongoose")

const CreateOperation = new mongoose.Schema({
    fullname: {type:String},
    email: { type: String, unique: true },
    otp: { type: String },
});

const Operation =  mongoose.model("Operation" , CreateOperation);
module.exports = Operation;
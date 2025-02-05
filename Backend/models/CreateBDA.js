const mongoose = require("mongoose");

const CreateBDA = new mongoose.Schema({
    fullname: { type: String, unique: true , lowercase: true, },
    email: { type: String, unique: true , lowercase: true, },
    password: { type: String },
    team: { type: String},
    otp: { type: String },
    mailSended : {type: Boolean , default: false},
  });
  
  const BDA = mongoose.model("BDA", CreateBDA);
  module.exports = BDA;
  
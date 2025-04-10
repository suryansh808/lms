const mongoose = require("mongoose");

const CreateBDA = new mongoose.Schema({
    fullname: { type: String, unique: true , },
    email: { type: String, unique: true , },
    password: { type: String },
    team: { type: String},
    designation: { type: String},
    otp: { type: String },
    mailSended : {type: Boolean , default: false},
    status: { type: String , default: "Inactive"},
    target:[{ currentMonth: { type: String }, targetValue: { type: String } }],
  });
  
  const BDA = mongoose.model("BDA", CreateBDA);
  module.exports = BDA;
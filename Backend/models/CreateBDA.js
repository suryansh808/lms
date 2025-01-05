const mongoose = require("mongoose");

const CreateBDA = new mongoose.Schema({
    fullname: { type: String },
    email: { type: String, unique: true },
    otp: { type: String },
  });
  
  const BDA = mongoose.model("BDA", CreateBDA);
  module.exports = BDA;
  
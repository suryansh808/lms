const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  otp: {
    type: String,
  },
  password: {
    type: String,
  },
  mailSended: { type: Boolean, default: false },
});

const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;

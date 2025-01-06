const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  otp:{
    type:String
  }
});

const AdminMail = mongoose.model('adminMail', AdminSchema);
module.exports = AdminMail;
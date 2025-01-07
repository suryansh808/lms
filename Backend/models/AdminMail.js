const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  otp:{
    type:String,
  },
  password:{
    type:String,
    default: "Admin@123"
  }
});

const AdminMail = mongoose.model('adminMail', AdminSchema);
module.exports = AdminMail;
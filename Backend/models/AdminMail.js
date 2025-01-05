const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
});

const AdminMail = mongoose.model('adminMail', AdminSchema);
module.exports = AdminMail;
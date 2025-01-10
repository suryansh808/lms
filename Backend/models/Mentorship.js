const mongoose = require("mongoose");

const MentorshipSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  collegeName:{
    type:String
  },
  domain:{
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Mentorship", MentorshipSchema);

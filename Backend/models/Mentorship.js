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
    lowercase: true,
  },
  collegeName:{
    type:String
  },
  domain:{
    type:String
  },
  passingyear:{
    type:String
  },
  action:{
    type:String,
    default:"Unseen"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Mentorship", MentorshipSchema);

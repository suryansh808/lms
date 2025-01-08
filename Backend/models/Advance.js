const mongoose = require("mongoose");

const AdvanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  currentRole: {
    type: String,
    enum: ["Founder", "Student", "Working Professional", "Self Employed"],
    required: true,
  },
  experience: {
    type: String,
    enum: ["0 year", "1-2 years", "3-5 years", "5+ years"],
    required: true,
  },
  goal: {
    type: String,
    enum: ["Career Transition", "Kickstart Career", "Upskilling", "Other"],
    required: true,
  },
  goalOther: {
    type: String,
    required: function () {
      return this.goal === "Other";
    },
  },
  domain: {
    type: String,
    enum: ["Digital Marketing/Performance marketing", "Marketing/Sales", "Management/Operations", "IT/Tech/Product", "Other"],
    required: true,
  },
  domainOther: {
    type: String,
    required: function () {
      return this.domain === "Other";
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Advance", AdvanceSchema);

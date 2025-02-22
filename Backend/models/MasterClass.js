const mongoose = require("mongoose");

const MasterClassSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  link: { type: String, required: true },
  image: { type: String, required: true },
  status: { type: String, enum: ["upcoming", "ongoing", "completed"], default: "upcoming" },
  applications: [
    {
      name: String,
      email: String,
      clgemail: String,
      phone: String,
      appliedAt: { type: Date, default: Date.now }
    }
  ]
});

const MasterClass = mongoose.model("MasterClass", MasterClassSchema);

module.exports = MasterClass;
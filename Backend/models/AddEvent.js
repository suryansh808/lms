const mongoose = require("mongoose");

const AddEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  status: { type: String, default: "active" },
  type: { type: String, default:"MCQ"},
  question: { type: String, required: true },
  
});

const AddEvent = mongoose.model("AddEvent", AddEventSchema);

module.exports = AddEvent;
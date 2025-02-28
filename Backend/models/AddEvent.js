const mongoose = require("mongoose");

const AddEventSchema = new mongoose.Schema({
  title: { type: String },
  start: { type: Date },
  status: { type: String, default: "active" },
  type: { type: String, default:"MCQ"},
  questions: [
    {
      question: { type: String },
      option1: { type: String },
      option2: { type: String },
      option3: { type: String },
      option4: { type: String },
      answer: { type: String },
    }
  ],
  
});

const AddEvent = mongoose.model("AddEvent", AddEventSchema);

module.exports = AddEvent;
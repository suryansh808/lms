const mongoose = require("mongoose");

const EventRegistrationSchema = new mongoose.Schema({
    name: { type: String },
    phone: { type: String },
    email: { type: String },
    collegeName: { type: String},
    collegeEmailId: { type: String},
});

const EventRegistration = mongoose.model("EventRegistration", EventRegistrationSchema);

module.exports = EventRegistration;
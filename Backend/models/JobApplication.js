const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobApplicationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CreateJob", // Reference to Job model
      required: true,
    },
    title: { type: String },
    company: { type: String },
  },
  {
    timestamps: true,
  },

);

const JobApplication = mongoose.model("JobApplication", JobApplicationSchema);
module.exports = JobApplication;

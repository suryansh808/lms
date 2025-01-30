const express = require('express');
const JobApplication = require("../models/JobApplication");
const router = express.Router();

// POST route: Create a new job application
router.post("/jobapplications", async (req, res) => {
  try {
    const { userId, jobId, title, company } = req.body;

    if (!userId || !jobId || !title || !company) {
      return res.status(400).json({ error: "userId and jobId are required" });
    }

    const newJobApplication = new JobApplication({ userId, jobId, title, company });
    await newJobApplication.save();
    res.status(201).json({ message: "Job Applied successfully", application: newJobApplication });
  } catch (error) {
    console.error("Error creating job application:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/jobapplications/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch applications matching the userId
    const applications = await JobApplication.find({ userId });
      // .populate("jobId", "title company")
      // .lean();

    if (!applications.length) {
      return res.status(404).json({ message: "No applications found for this user." });
    }

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching job applications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
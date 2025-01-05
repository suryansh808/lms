const express = require("express");
const router = express.Router();
const Mentorship = require("../models/Mentorship");

// GET request to retrieve all mentorship registrations
router.post("/mentorship/register", async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const existingUser = await Mentorship.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .json({ message: "You have already registered with this email." });
    }
    const newRegistration = new Mentorship({
      name,
      email,
      phone,
    });
    await newRegistration.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

router.get("/mentorqueries", async (req, res) => {
  try {
      queries = await Mentorship.find().sort({ _id: -1 });
    res.status(200).json(queries);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching data", error: error.message });
  }
});

module.exports = router;

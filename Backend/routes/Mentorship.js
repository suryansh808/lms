const express = require("express");
const router = express.Router();
const Mentorship = require("../models/Mentorship");

// post request to add new mentorship enqueries
router.post("/mentorship/register", async (req, res) => {
  const { name, email,collegeEmail, phone , collegeName, domain , passingyear , reason } = req.body;
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
      collegeEmail ,
      phone,
      collegeName,
      domain,
      passingyear,
      reason

    });
    await newRegistration.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

//get request to retrieve all the mentorship data in admin 
router.get("/mentorqueries", async (req, res) => {
  try {
      queries = await Mentorship.find().sort({ _id: -1 });
    res.status(200).json(queries);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching data", error: error.message });
  }
});

//put request to update the action data in admin
router.put("/queriesaction/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { action } = req.body;
    const query = await Mentorship.findById(id);
    if (query) {
      if (action === "Shared") {
        query.action = "Shared";
      }
      if (action === "Not Interested") {
        query.action = "Not Interested";
      }
      if (action === "Already Paid") {
        query.action = "Already Paid";
      }
      if (action === "Unseen") {
        query.action = "Unseen";
      }
      await query.save();

      res.status(200).json({ message: "Query updated successfully" });
      } else {
      res.status(404).json({ message: "Query not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating data", error: error.message });
  }
});

//put request to asign bda into lead
router.put("/bdaasign/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { bda , action } = req.body;
    const query = await Mentorship.findById(id);
       query.bda = bda;
       query.action = action;
      await query.save();

      res.status(200).json({ message: "Query updated successfully" });
      console.log("done")
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating data", error: error.message });
  }
});

module.exports = router;

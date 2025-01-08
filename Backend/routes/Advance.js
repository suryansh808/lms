const express = require("express");
const router = express.Router();
const Advance = require("../models/Advance");

// router.post("/advance/register", async (req, res) => {
//   const { name, email, phone } = req.body;
//   try {
//     const newRegistration = new Advance({
//       name,
//       email,
//       phone,
//     });
//     await newRegistration.save();
//     res.status(201).json({ message: "Registration successful!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error. Please try again later." });
//   }
// });

router.get("/advancequeries", async (req, res) => {
  try {
      queries = await Advance.find().sort({ _id: -1 });
    res.status(200).json(queries);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching data", error: error.message });
  }
});

router.post("/advance/register", async (req, res) => {
  const { name, email, phone, currentRole, experience, goal, goalOther, domain, domainOther } = req.body;
  try {
    const newRegistration = new Advance({
      name,
      email,
      phone,
      currentRole,
      experience,
      goal,
      goalOther: goal === "Other" ? goalOther : undefined,
      domain,
      domainOther: domain === "Other" ? domainOther : undefined,
    });
    await newRegistration.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

module.exports = router;

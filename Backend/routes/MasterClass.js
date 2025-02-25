const express = require("express");
const MasterClass = require("../models/MasterClass");
const router = express.Router();

// Create a MasterClass
router.post("/addmasterclass", async (req, res) => {
    try {
        const masterClass = new MasterClass(req.body);
        await masterClass.save();
        res.status(201).json(masterClass);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all MasterClasses
router.get("/allmasterclass", async (req, res) => {
    try {
      const masterClasses = await MasterClass.find().sort({ _id: -1 });
      res.status(200).json(masterClasses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Update a MasterClass
router.put("/masterclass/:id", async (req, res) => {
    try {
      const masterClass = await MasterClass.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!masterClass) return res.status(404).json({ error: "MasterClass not found" });
      res.status(200).json(masterClass);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  // Delete a MasterClass
router.delete("/masterclass/:id", async (req, res) => {
  try {
    const masterClass = await MasterClass.findByIdAndDelete(req.params.id);
    if (!masterClass) return res.status(404).json({ error: "MasterClass not found" });
    res.status(200).json({ message: "MasterClass deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// fetch masterclass with lemgth of application
router.get("/allmasterclasswithsapplicant", async (req, res) => {
  try {
    const masterClasses = await MasterClass.find({}, { 
      title: 1, 
      start: 1, 
      end: 1, 
      link: 1, 
      image: 1,
      status: 1,
      applications: { $size: "$applications" } // Get only the count of applications
    }).lean();

    res.json(masterClasses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// masterclass apply
// router.post("/masterclassapply/:id", async (req, res) => {
//   try {
//       const masterClass = await MasterClass.findById(req.params.id);
//       if (!masterClass) return res.status(404).json({ message: "MasterClass not found" });

//       masterClass.applications.push({ ...req.body, appliedAt: new Date() });
//       await masterClass.save();
//       res.json({ message: "Applied successfully!", masterClass });
//   } catch (error) {
//       res.status(500).json({ message: "Error applying", error: error.message });
//   }
// });

// masterclass apply
router.post("/masterclassapply/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, clgemail, phone } = req.body;

    // Find the masterclass
    const masterClass = await MasterClass.findById(id);
    if (!masterClass) {
      return res.status(404).json({ message: "MasterClass not found" });
    }

    // Check if the user has already applied using their email
    if (masterClass.applications.some((app) => app.email === email || app.phone === phone)) {
      return res.status(400).json({ message: "You have already applied" });
    }

    // Add the new application
    masterClass.applications.unshift({ name, email, clgemail, phone, appliedAt: new Date() });
    await masterClass.save();

    res.status(201).json({ message: "Applied successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error applying", error: error.message });
  }
});





module.exports = router;
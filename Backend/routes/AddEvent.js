const express = require("express");
const AddEvent = require("../models/AddEvent");
const router = express.Router();

// add a new event
router.post("/addevent", async (req, res) => {
    try {
        const addevent = new AddEvent(req.body);
        await addevent.save();
        res.status(201).json(addevent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all Events
router.get("/allevents", async (req, res) => {
    try {
      const addEvent = await AddEvent.find().sort({ _id: -1 });
      res.status(200).json(addEvent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Update a events
router.put("/allevents/:id", async (req, res) => {
    try {
      const addEvent = await AddEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!addEvent) return res.status(404).json({ error: "Event not found" });
      res.status(200).json(addEvent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  // Delete a events
router.delete("/allevents/:id", async (req, res) => {
  try {
    const addEvent = await AddEvent.findByIdAndDelete(req.params.id);
    if (!addEvent) return res.status(404).json({ error: "Event not found" });
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// fetch masterclass with length of application
// router.get("/allmasterclasswithsapplicant", async (req, res) => {
//   try {
//     const masterClasses = await MasterClass.find({}, { 
//       title: 1, 
//       start: 1, 
//       end: 1, 
//       link: 1, 
//       image: 1,
//       status: 1,
//       applications: { $size: "$applications" } // Get only the count of applications
//     }).lean();

//     res.json(masterClasses);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

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
// router.post("/masterclassapply/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, email, clgemail, phone } = req.body;

//     // Find the masterclass
//     const masterClass = await MasterClass.findById(id);
//     if (!masterClass) {
//       return res.status(404).json({ message: "MasterClass not found" });
//     }

//     // Check if the user has already applied using their email
//     if (masterClass.applications.some((app) => app.email === email || app.phone === phone)) {
//       return res.status(400).json({ message: "You have already applied" });
//     }

//     // Add the new application
//     masterClass.applications.unshift({ name, email, clgemail, phone, appliedAt: new Date() });
//     await masterClass.save();

//     res.status(201).json({ message: "Applied successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Error applying", error: error.message });
//   }
// });





module.exports = router;
const express = require("express");
const AddEvent = require("../models/AddEvent");
const EventRegistration = require("../models/EventRegistration");
const EventApplication = require("../models/EventApplication");
const router = express.Router();
const crypto = require('crypto'); 
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { sendEmail } = require("../controllers/emailController");

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

//push question to event
router.put("/addquestions/:id", async (req, res) => {
  try {
    const event = await AddEvent.findById(req.params.id);
    if (req.body.question) {
      const newQuestion = {
        question: req.body.question,
        option1: req.body.option1, 
        option2: req.body.option2, 
        option3:req.body.option3,
        option4: req.body.option4, 
        answer: req.body.answer 
      }; 
    event.questions.push(newQuestion);}
    const updatedEvent = await event.save();
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

//delete event question
router.delete("/allevents/:eventId/questions/:questionId", async (req, res) => {
  try {
    const { eventId, questionId } = req.params;
    const event = await AddEvent.findById(eventId);
    // if (!event) return res.status(404).json({ error: "Event not found" });
    const questionIndex = event.questions.findIndex(q => q._id.toString() === questionId);
    // if (questionIndex === -1) return res.status(404).json({ error: "Question not found" });
    event.questions.splice(questionIndex, 1);
    await event.save();
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//edit event question
router.put('/addquestions/:eventId/questions/:questionId', async (req, res) => {
  const { eventId, questionId } = req.params;
  const { question, option1, option2, option3, option4, answer } = req.body;
  try {
    const event = await AddEvent.findById(eventId);
    if (!event) {return res.status(404).json({ message: 'Event not found' });}
    const existingQuestion =  event.questions.find(q => q._id.toString() === questionId);
    if (!existingQuestion) {return res.status(404).json({ message: 'Question not found' });}
    existingQuestion.question = question;
    existingQuestion.option1 = option1;
    existingQuestion.option2 = option2;
    existingQuestion.option3 = option3;
    existingQuestion.option4 = option4;
    existingQuestion.answer = answer;
    await event.save();
    res.status(200).json({ message: 'Question updated successfully', question: existingQuestion });
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ message: 'Error updating question', error });
  }
});

// --------------------------------------------------------------------------------------------------------------------

// Event Registration
router.post("/eventregistration", async (req, res) => {
    try {
        const eventregister = new EventRegistration(req.body);
        await eventregister.save();
        res.status(201).json(eventregister);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

// Get all Event Registrations
router.get("/alleventregistrationnts", async (req, res) => {
  try {
    const alleventregistrations = await EventRegistration.find().sort({ _id: -1 });
    res.status(200).json(alleventregistrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// send otp route
router.post("/eventsendotp",async (req, res) => {
  const { email } = req.body;
  try {
    const eventuser = await EventRegistration.findOne({ email });
    if (!eventuser) {
      return res.status(404).json({ message: "User not found enter a valid email" });
    }
     const otp = crypto.randomInt(100000, 1000000);
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins expiration
       const  EmailMessage = `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #F15B29; color: #fff; text-align: center; padding: 20px;">
        <h1>Krutanic Talent Hunt</h1>
    </div>
    <div style="padding: 20px; text-align: center;">
        <p style="font-size: 16px; color: #333;">Hello, Join us for an exciting Talent Hunt event! Below are your participation details:</p>
        <p style="font-size: 14px; color: #555;">Your participation verification code (for event access) is:</p>
        <p style="font-size: 24px; font-weight: bold; color: #4a90e2; margin: 10px 0;">${otp}</p>
        <p style="font-size: 14px; color: #555;">This code is valid for <strong>10 minutes</strong>. Please keep it safe and don't share it with others.</p>
    </div>
    <div style="text-align: center; font-size: 12px; color: #888; padding: 10px 0; border-top: 1px solid #ddd;">
        <p>If you didn’t register for the Talent Hunt event, please ignore this email or contact our support team.</p>
        <p>&copy; 2024 Krutanic Talent Hunt. All Rights Reserved.</p>
    </div>
</div>

    `;
    eventuser.otp = otp;
    eventuser.otpExpires = otpExpires;
    await Promise.all([
      eventuser.save(),
      sendEmail({email ,  subject: "Your OTP for Login", message: EmailMessage}),
    ]);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending OTP" });
  }
});

// verfiy otp route
router.post("/eventverifyotp", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await EventRegistration.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
      if (user.status === "inactive") {
        return res.status(403).json({ message: "Your account is inactive. Please contact support." });
      }

    if (!user.otp || user.otpExpires < Date.now()) {
      return res
        .status(400)
        .json({ message: "OTP expired. Please request a new one." });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, _id: user._id, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error verifying OTP" });
  }
});


//apply on event
router.post("/eventapplications", async (req, res) => {
  try {
    const { userId, eventId} = req.body;

    if (!userId || !eventId) {
      return res.status(400).json({ error: "userId and eventId are required" });
    }

    const existingApplication = await EventApplication.findOne({ userId, eventId });

    if (existingApplication) {
      return res.status(400).json({ error: "User has already applied for this event" });
    }

    const newEventApplication = new EventApplication({ userId, eventId});
    await newEventApplication.save();
    res.status(201).json({ message: "Job Applied successfully", application: newEventApplication });
  } catch (error) {
    console.error("Error creating job application:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all Event applits
router.get("/eventapplications", async (req, res) => {
  try {
    const appliedEvent = await EventApplication.find()
    .populate('userId','id')
    .populate('eventId', 'id');
  
  const response = appliedEvent.map(event => {
    const { createdAt, updatedAt, ...rest } = event.toObject();
    return rest;
  });

  res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get all the event with user application data
// router.get("/events-with-applications", async (req, res) => {
//   try {
//     // Fetch all events with their applications and user data, matching by eventId
//     const events = await EventApplication.find()
//       .populate({
//         path: "EventApplication",
//         model: "EventApplication",
//         select: "userId", // Only select userId from EventApplication
//         match: { eventId: req.query.eventId }, // Optionally filter by eventId in the query
//         populate: {
//           path: "userId", // Populating the userId field with full EventRegistration data
//           model: "EventRegistratio9n",
//           select: "name phone email collegeName collegeEmailId" // Fields to select from EventRegistration
//         }
//       });

//     // Return the response
//     res.json(events);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });



// router.get("/events-with-applications", async (req, res) => {
//   try {
//     const eventWithEnrolls = await AddEvent.aggregate([
//       {
//         $lookup: {
//           from: "eventapplications", // Collection name should match your MongoDB collection
//           localField: "id",
//           foreignField: "enentId",
//           as: "enrollments",
//         },
//       },
//       {
//         $unwind: {
//           path: "$enrollments", // Unwind the enrollments array to work with individual applications
//           preserveNullAndEmptyArrays: true, // If no enrollments, still include the event
//         },
//       },
//       // Remove second $lookup since we only want the userId, not full user data
//       {
//         $project: {
//           "enrollments.userId": 1, // Keep only the userId field in enrollments
//           title: 1,
//           start: 1,
//           status: 1,
//           type: 1,
//           questions: 1,
//         },
//       },
//     ]);
    
//     res.status(200).json(eventWithEnrolls);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error", message: error.message });
//   }
// });


module.exports = router;
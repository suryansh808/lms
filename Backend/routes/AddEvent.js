const express = require("express");
const AddEvent = require("../models/AddEvent");
const EventRegistration = require("../models/EventRegistration");
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
  console.log(req.body);
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





module.exports = router;
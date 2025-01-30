const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// Path to the exercise.json file
const exerciseFilePath = path.join(__dirname, "../config/exercise.json");

// Fetch categories
router.get("/exercise-categories", (req, res) => {
  fs.readFile(exerciseFilePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading exercise.json:", err);
      return res.status(500).json({ error: "Failed to load categories." });
    }

    try {
      const questions = JSON.parse(data);
      const categories = [...new Set(questions.map((q) => q.category))];
      res.json(categories);
    } catch (parseError) {
      console.error("Error parsing exercise.json:", parseError);
      return res.status(500).json({ error: "Failed to parse categories." });
    }
  });
});

// Fetch questions by category
router.get("/exercise-questions/:category", (req, res) => {
  const { category } = req.params;
  const decodedCategory = decodeURIComponent(category);

  if (!decodedCategory || decodedCategory.trim() === "") {
    return res.status(400).json({ error: "Category is required." });
  }

  fs.readFile(exerciseFilePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading exercise.json:", err);
      return res.status(500).json({ error: "Failed to load questions." });
    }

    try {
      const allQuestions = JSON.parse(data);
      const filteredQuestions = allQuestions.filter(
        (q) => q.category.toLowerCase() === decodedCategory.toLowerCase()
      );

      if (filteredQuestions.length === 0) {
        return res
          .status(404)
          .json({ error: "No questions found for this category." });
      }

      const shuffledQuestions = filteredQuestions.sort(() => 0.5 - Math.random());
      const selectedQuestions = shuffledQuestions.slice(0, 8);
      res.json(selectedQuestions);
    } catch (parseError) {
      console.error("Error parsing exercise.json:", parseError);
      return res.status(500).json({ error: "Failed to parse questions." });
    }
  });
});


// Evaluate answers
router.post("/exercise-evaluate", (req, res) => {
  const { questions, answers } = req.body;

  if (!Array.isArray(questions) || !Array.isArray(answers)) {
    return res.status(400).json({ error: "Invalid input format." });
  }

  let correct = 0;

  questions.forEach((question, index) => {
    if (question.correctAnswer === answers[index]) {
      correct++;
    }
  });

  const feedback = {
    total: questions.length,
    correct,
    incorrect: questions.length - correct,
  };

  res.json(feedback);
});

module.exports = router;

const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const router = express.Router();

// Initialize Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// In-memory session store (replace with a database for production)
const sessions = {};

// Route to start a new interview session
router.post("/start-session", (req, res) => {
  const sessionId = Date.now().toString(); // Generate a simple session ID
  sessions[sessionId] = {
    questions: [],
    answers: [],
  };
  res.json({ sessionId });
});

// Route to generate a question dynamically
  router.get("/questions", async (req, res) => {
    const { sessionId, category } = req.query;

    if (!sessionId || !category) {
      return res
        .status(400)
        .json({ error: "Session ID and category are required." });
    }
    // Generate a interview question based on  ${category} domain.
    try {
      const prompt = `
      Generate a clear and concise interview question related to the ${category} domain. The question should be simple, easy to understand, and well-formatted. The question should be written in the following way:

  - The question should be straightforward and focused.
  - Use short sentences.
  - Make sure the question is relevant to the ${category} domain.
  - Format the question using bullet points.
  - Ensure that the question encourages the candidate to explain their understanding in a simple and structured manner.
  - Avoid using complex jargon or overly technical terms.
  - Include relevant examples or scenarios, if applicable, to make the question practical.

  Example format:
  - **Question**: [Question here]
  - **Follow-up**: [Optional follow-up or clarification, if needed]

      `;
      const result = await model.generateContent(prompt);

      if (!result.response.text()) {
        throw new Error("No question generated.");
      }

      const question = result.response.text();
      res.json({ questions: [question] });
    } catch (error) {
      console.error("Error generating questions:", error.message || error);
      res.status(500).json({ error: "Failed to generate questions." });
    }
  });

// Route to evaluate user answers
router.post("/evaluate", async (req, res) => {
  const { sessionId, answers } = req.body;

  // Validate input
  if (
    !sessionId ||
    !answers ||
    !Array.isArray(answers) ||
    answers.length === 0
  ) {
    return res
      .status(400)
      .json({ error: "Invalid request. sessionId and answers are required." });
  }

  try {
    const feedbacks = [];

    // Evaluate each answer
    for (const answer of answers) {
      const { question, response } = answer;

      if (!question || !response) {
        feedbacks.push({
          question,
          evaluation: "No response provided for this question.",
        });
        continue;
      }

      // Generate evaluation using AI
      const prompt = `Question: ${question}\nUser Response: ${response}\nEvaluate the response on a scale of 1-10 with short feedback:`;
      const result = await model.generateContent(prompt);
      const evaluation = result.response.text();

      feedbacks.push({ question, evaluation });
    }

    res.json({ feedbacks });
  } catch (error) {
    console.error("Error in evaluation:", error.message || error);
    res.status(500).json({ error: "Failed to evaluate responses." });
  }
});

// Route to get session details
router.get("/session/:sessionId", (req, res) => {
  const { sessionId } = req.params;

  if (!sessions[sessionId]) {
    return res.status(404).json({ error: "Session not found." });
  }

  res.json(sessions[sessionId]);
});

module.exports = router;

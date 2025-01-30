import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../API";

const MockInterview = () => {
  const [sessionId, setSessionId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingQuestions, setFetchingQuestions] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [interviewStarted, setInterviewStarted] = useState(false);

  const startInterview = async () => {
    try {
      const res = await axios.post(`${API}/start-session`);
      setSessionId(res.data.sessionId);
      setInterviewStarted(true);
    } catch (error) {
      console.error("Error starting session:", error);
      alert("Failed to start the interview.");
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!selectedDomain || !sessionId) return;

      setFetchingQuestions(true);
      try {
        const res = await axios.get(
          `${API}/questions?sessionId=${sessionId}&category=${selectedDomain}`
        );
        setQuestions(res.data.questions || []);
      } catch (error) {
        console.error("Error fetching questions:", error);
        alert("Failed to fetch questions. Please try again.");
        setQuestions([]);
      } finally {
        setFetchingQuestions(false);
      }
    };

    fetchQuestions();
  }, [selectedDomain, sessionId]);

  const handleAnswerChange = (question, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: answer,
    }));
  };

  const submitResponse = async () => {
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const answerArray = questions.map((question) => ({
      question,
      response: answers[question] || "",
    }));

    console.log("Submitting payload:", { sessionId, answers: answerArray });

    setLoading(true);
    try {
      const res = await axios.post(`${API}/evaluate`, {
        sessionId,
        answers: answerArray,
      });
      setFeedback(res.data.feedbacks || []);
    } catch (error) {
      console.error("Error evaluating responses:", error);
      alert("Failed to evaluate responses.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-10">
        Mock Interview
      </h1>

      {!interviewStarted && (
        <button
          onClick={startInterview}
          className="w-full py-4 text-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-md focus:outline-none transition duration-300 ease-in-out"
        >
          Start Interview
        </button>
      )}

      {interviewStarted && (
        <div className="mb-8">
          <label
            htmlFor="domain"
            className="text-xl font-medium text-gray-700 mb-2 block"
          >
            Select Domain:
          </label>
          <select
            id="domain"
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="w-full p-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          >
            <option value="">Select a Domain</option>
            <option value="Android App Development">
              Android App Development
            </option>
            <option value="Data Science">Data Science</option>
            {/* Add more domains */}
          </select>
        </div>
      )}

      {fetchingQuestions && (
        <div className="text-center text-lg text-gray-600 mb-8">
          Loading questions...
        </div>
      )}

      {!fetchingQuestions && questions.length > 0 && (
        <div>
          {questions.map((question, index) => (
            <div key={index} className="mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Question {index + 1}:
                </h3>
              </div>
              <p className="text-lg text-gray-700 mb-4">{question}</p>
              <textarea
                rows="5"
                placeholder="Your answer..."
                value={answers[question] || ""}
                onChange={(e) => handleAnswerChange(question, e.target.value)}
                className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              />
            </div>
          ))}

          <button
            onClick={submitResponse}
            disabled={loading}
            className={`w-full py-4 text-lg font-semibold text-white rounded-lg shadow-md mt-6 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            } focus:outline-none transition duration-300 ease-in-out`}
          >
            {loading ? "Submitting..." : "Submit Answers"}
          </button>
        </div>
      )}

      {/* No Questions Available */}
      {!fetchingQuestions && questions.length === 0 && selectedDomain && (
        <p className="text-lg text-center text-gray-600 mt-8">
          No questions available for this domain.
        </p>
      )}

      {/* Feedback Section */}
      {feedback.length > 0 && (
        <div className="mt-12 bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Feedback:
          </h3>
          {feedback.map((item, index) => (
            <div key={index} className="mb-6 p-4 bg-white rounded-lg shadow-sm">
              <p className="text-xl text-gray-800 font-medium">
                Question {index + 1}:
              </p>
              <p className="text-lg text-gray-600 mb-2">{item.question}</p>
              <p className="text-lg font-semibold text-blue-600">Feedback:</p>
              <p className="text-lg text-gray-800">{item.evaluation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MockInterview;

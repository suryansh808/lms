import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../API";

const Exercise = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/exercise-categories`)
      .then((response) => {
        setCategories(response.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please try again.");
        setLoading(false);
      });
  }, []);

  const fetchQuestions = (category) => {
    setLoading(true);
    setError(null);
    axios
      .get(`${API}/exercise-questions/${encodeURIComponent(category)}`)
      .then((response) => {
        setQuestions(response.data || []);
        setAnswers({});
        setFeedback(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions. Please try again.");
        setLoading(false);
      });
  };

  const handleAnswerChange = (index, answer) => {
    setAnswers({ ...answers, [index]: answer });
  };

  const handleSubmit = () => {
    setLoading(true);
    axios
      .post(`${API}/exercise-evaluate`, {
        questions,
        answers: Object.values(answers),
      })
      .then((response) => {
        setFeedback(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error submitting answers:", err);
        setError("Failed to submit answers. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
        {/* Error Display */}
        {error && (
          <div className="bg-red-100 text-red-600 rounded-lg p-4 mb-6 text-center">
            {error}
          </div>
        )}

        {/* Start Interview Button */}
        {!showDropdown && !selectedCategory && (
          <div className="text-center">
            <p className="text-2xl font-semibold mb-7">Exercise Prep</p>
            <button
              onClick={() => setShowDropdown(true)}
              className="bg-blue-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition duration-200 font-semibold text-lg"
            >
              Start Interview
            </button>
          </div>
        )}

        {/* Category Dropdown */}
        {showDropdown && !selectedCategory && (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Select a Category
            </h1>
            {loading ? (
              <p className="text-gray-500">Loading categories...</p>
            ) : (
              <select
                onChange={(e) => {
                  const category = e.target.value;
                  if (category) {
                    setSelectedCategory(category);
                    fetchQuestions(category);
                  }
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 md:w-1/2 p-3"
              >
                <option value="">-- Select a Category --</option>
                {categories.length > 0 ? (
                  categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))
                ) : (
                  <option value="">No categories available</option>
                )}
              </select>
            )}
          </div>
        )}

        {/* Questions Display */}
        {selectedCategory && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">
                {selectedCategory} Questions
              </h1>
              <p className="text-sm text-gray-400 italic">Powered by DSA AI</p>
            </div>
            {loading ? (
              <p className="text-gray-500">Loading questions...</p>
            ) : questions.length > 0 ? (
              <div>
                {questions.map((q, index) => (
                  <div
                    key={index}
                    className="mb-6 p-6 border rounded-lg shadow-sm bg-gray-50"
                  >
                    <p className="text-lg font-medium mb-4">
                      <strong>Q{index + 1}:</strong> {q.question}
                    </p>
                    <div className="space-y-3">
                      {q.options && q.options.length > 0 ? (
                        q.options.map((option, i) => (
                          <label
                            key={i}
                            className="flex items-center space-x-4 p-3 bg-white rounded-lg shadow hover:bg-gray-100 transition"
                          >
                            <input
                              type="radio"
                              name={`question-${index}`}
                              value={option}
                              onChange={() => handleAnswerChange(index, option)}
                              className="text-blue-500 focus:ring focus:ring-blue-300"
                            />
                            <span className="text-gray-700">{option}</span>
                          </label>
                        ))
                      ) : (
                        <p className="text-gray-500">No options available.</p>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-200 mt-6 w-full font-semibold text-lg"
                >
                  Submit
                </button>
              </div>
            ) : (
              <p className="text-gray-500">No questions available.</p>
            )}
          </div>
        )}

        {/* Feedback Section */}
        {feedback && (
          <div className="mt-10 bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
              Feedback Summary
            </h2>
            <div className="space-y-4 text-center">
              <p className="text-gray-700 text-lg">
                <strong>Total Questions:</strong> {feedback.total}
              </p>
              <p className="text-gray-700 text-lg">
                <strong>Correct Answers:</strong> {feedback.correct}
              </p>
              <p className="text-gray-700 text-lg">
                <strong>Incorrect Answers:</strong> {feedback.incorrect}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exercise;

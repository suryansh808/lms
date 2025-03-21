import axios from 'axios';
import React, { useEffect, useState } from 'react';
import API from '../API';
import toast, { Toaster } from "react-hot-toast";

const Playground = () => {
  const userId = localStorage.getItem("eventuserId");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [appliedUsers, setAppliedUsers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(45); 
  const [applied, setApplied] = useState([]);

  const fetchAppliedUsers = async () => {
    try {
      const response = await axios.get(`${API}/events-with-applications`);
      setAppliedUsers(response.data?.filter(event => event.enrollments.includes(userId)));
    } catch (error) {
      console.error("There was an error fetching applied users", error);
    }
  };

  useEffect(() => {
    if (isDialogOpen && !quizCompleted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      nextQuestion();
    }
  }, [isDialogOpen, timeLeft, quizCompleted]);

  const startQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setIsDialogOpen(true);
    setCurrentQuestionIndex(0);
    setScore(0); // Reset score to 0 at the start of the quiz
    setSelectedOption(null);
    setQuizCompleted(false);
    setTimeLeft(45);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const nextQuestion = () => {
    // Check if the selected option is the correct answer for the current question
    const correctAnswer = currentQuiz.questions[currentQuestionIndex].answer; // Assuming the correct answer is stored in 'answer'
    // console.log(selectedOption, correctAnswer);

    if (selectedOption === correctAnswer) {
      setScore((prevScore) => prevScore + 1); // Increment score if the answer is correct
    }
    //  console.log(score);
    // Check if there are more questions in the quiz

    if (currentQuestionIndex + 1 < currentQuiz.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
      setTimeLeft(45); // Reset timer for the next question
    } else {
      setQuizCompleted(true); // End the quiz when all questions are answered
    }

    setSelectedOption(null); // Reset the selected option
  };

  
  const storeScore = async (score) => {
    const quizId = currentQuiz._id;
   
    try {
      const response = await axios.post(`${API}/finalscore`, {
        userId,
        eventId: quizId,
        coin: score,
      });
      toast.success('Application submitted successfully!');
      setQuizCompleted(true);
      fetchAppliedUsers();
      fetchApplied();
      reset();
    } catch (error) {
      console.error('Error submitting application:', error.response?.data || error.message);
    }
  };

  const reset = () => {
    setIsDialogOpen(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setQuizCompleted(false);
  };

  const fetchApplied = async () => {
    try {
      const response = await axios.get(`${API}/eventapplications`);
      setApplied(response.data);
    } catch (error) {
      console.error("Error fetching applied users:", error);
    }
  };

  useEffect(() => {
    fetchAppliedUsers();
    fetchApplied();
  }, []);

  return (
    <div className="eventheight text-white p-6">
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Card Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {appliedUsers?.map((quiz, index) => {
          const appliedQuiz = applied.find((item) =>item.eventId && item.eventId._id === quiz._id && item.userId && item.userId._id === userId);
          const hasCoins = appliedQuiz?.coin !== null;
          
          return (
            <div
              key={index}
              className="p-4 text-center rounded-lg bg-[#080808] drop-shadow-sm shadow-black border border-[#eeeeee2d] shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-lg font-semibold mb-2">{quiz.title}</h2>

              {!hasCoins ? (
                quiz.status === "Ongoing" ? (
                  <button
                    onClick={() => startQuiz(quiz)}
                    className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Start Quiz
                  </button>
                ) : (
                  <button className="px-4 py-2 bg-gray-600 rounded-md cursor-not-allowed opacity-75">
                    Quiz Will Start Soon
                  </button>
                )
              ) : (
                <p className="text-sm text-green-500">You have already participated.</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Quiz Dialog */}
      {isDialogOpen && currentQuiz && currentQuiz?.questions?.length > 0 && !quizCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1d1c1c] p-6 rounded-lg w-full max-w-2xl shadow-2xl">
            <div className="flex justify-between items-center gap-3 mb-4">
              <h3 className="text-xl font-bold">
                {currentQuiz?.questions[currentQuestionIndex].question}
              </h3>
              <div className="text-sm text-red-400 whitespace-nowrap">Time Left: {timeLeft}s</div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((opt) => (
                <label
                  key={opt}
                  className={`flex items-center p-3 rounded-md cursor-pointer transition-colors duration-200 ${
                    selectedOption === currentQuiz?.questions[currentQuestionIndex][`option${opt}`]
                      ? 'bg-blue-600'
                      : ' shadow-black border border-[#eeeeee2d] shadow-sm'
                  }`}
                >
                  <input
                    type="radio"
                    name="option"
                    checked={selectedOption === currentQuiz?.questions[currentQuestionIndex][`option${opt}`]}
                    onChange={() => handleOptionChange(currentQuiz?.questions[currentQuestionIndex][`option${opt}`])}
                    className="mr-2"
                  />
                  {currentQuiz?.questions[currentQuestionIndex][`option${opt}`]}
                </label>
              ))}
            </div>
             <button onClick={nextQuestion} className="mt-6 px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 w-full">
                Next
              </button>
          </div>
        </div>
      )}

      {/* Quiz Completed Dialog */}
      {quizCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1d1c1c] p-6 rounded-lg w-full max-w-md shadow-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-lg mb-2 hidden">Your Score:{score}</p>
            <button
              onClick={reset}
              className="px-6 py-2 bg-black border border-gray-600 rounded-md hover:bg-gray-900 transition-colors duration-200"
            >
              Close
            </button>
            <button
              onClick={()=> storeScore(score)}
              className="px-6 py-2 ml-5 bg-black border border-gray-600 rounded-md hover:bg-gray-900 transition-colors duration-200"
            >
              Finish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playground;

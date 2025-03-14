import axios from 'axios';
import React, { useEffect, useState } from 'react';
import API from '../API';

const Playground = () => {
  const userId = localStorage.getItem("eventuserId");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [appliedUsers, setAppliedUsers] = useState([]);

  const fetchAppliedUsers = async () => {
    try {
      const response = await axios.get(`${API}/events-with-applications`);
      setAppliedUsers(response.data.filter(event => event.enrollments.includes(userId)));
    //   setAppliedUsers(response.data.filter(event => event.enrollments.includes(userId) && event.status === "Ongoing"));
    } catch (error) {
      console.error("There was an error fetching applied users", error);
    }
  };

  useEffect(() => {
    fetchAppliedUsers();
  }, []);

  const startQuiz = (quiz) => {
    // console.log(quiz)
    setCurrentQuiz(quiz);
    setIsDialogOpen(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setQuizCompleted(false);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  // Next question logic
  const nextQuestion = () => {
    if (selectedOption === currentQuiz.questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex + 1 < currentQuiz.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
    setSelectedOption(null);
  };


  const reset = async (score) => {
    const userId = localStorage.getItem("eventuserId");
    const quizId = currentQuiz._id;
    try {
      const response = await axios.post(`${API}/finalscore`, {
        userId,
        eventId : quizId,
        coin: score,
      });
      console.log('Application submitted successfully:', response.data);
      setIsDialogOpen(false)
     setCurrentQuestionIndex(0);
     setSelectedOption(null);
    setQuizCompleted(false);
    } catch (error) {
      console.error('Error submitting application:', error.response?.data || error.message);
    }
  };
  

  return (
    <div id="eventheight">
      <h1>Playground</h1>
      <div className="card-container">
        {appliedUsers?.map((quiz, index) => (
          <div key={index} className="card p-2 mb-2 h-[200px] w-[300px] backdrop-blur-sm shadow-sm shadow-[#ffffff54] rounded-md bg-gradient-to-tr from-[#2f3640] to-[#18133c50]">
            <h2>{quiz.title}</h2>
            <p>Type: {quiz.type}</p>
            <p>Status: {quiz.status}</p>
            <button onClick={() => startQuiz(quiz)}>Start</button>
          </div>
        ))}
      </div>

      {isDialogOpen && currentQuiz && currentQuiz?.questions?.length > 0 && !quizCompleted && (
        <div className="dialog">
          <h3>{currentQuiz?.questions[currentQuestionIndex].question}</h3>
          <div>
            <label>
              <input
                type="checkbox"
                checked={selectedOption === currentQuiz?.questions[currentQuestionIndex].option1}
                onChange={() => handleOptionChange(currentQuiz?.questions[currentQuestionIndex].option1)}
              />
              {currentQuiz?.questions[currentQuestionIndex].option1}
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                checked={selectedOption === currentQuiz?.questions[currentQuestionIndex].option2}
                onChange={() => handleOptionChange(currentQuiz?.questions[currentQuestionIndex].option2)}
              />
              {currentQuiz?.questions[currentQuestionIndex].option2}
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                checked={selectedOption === currentQuiz?.questions[currentQuestionIndex].option3}
                onChange={() => handleOptionChange(currentQuiz?.questions[currentQuestionIndex].option3)}
              />
              {currentQuiz?.questions[currentQuestionIndex].option3}
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                checked={selectedOption === currentQuiz?.questions[currentQuestionIndex].option4}
                onChange={() => handleOptionChange(currentQuiz?.questions[currentQuestionIndex].option4)}
              />
              {currentQuiz?.questions[currentQuestionIndex].option4}
            </label>
          </div>

          {selectedOption && (
            <div>
              <button onClick={nextQuestion}>Next</button>
            </div>
          )}
        </div>
      )}

      {quizCompleted && (
        <div className="dialog">
          <h2>Quiz Completed! Your Score: {score}</h2>
          <button onClick={() => reset(score)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Playground;

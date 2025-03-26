import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import API from '../API';
import toast, { Toaster } from "react-hot-toast";

const Playground = () => {
  const userId = localStorage.getItem("eventuserId");
  const [state, setState] = useState({
    isDialogOpen: false,
    currentQuiz: null,
    currentQuestionIndex: 0,
    selectedOption: null,
    score: 0,
    quizCompleted: false,
    appliedUsers: [],
    timeLeft: 45,
    applied: [],
    quizEndedDueToTabSwitch: false,
    showInstructions: false
  });
  const scoreRef = useRef(0);

  const fetchData = async (endpoint, setter) => {
    try {
      const response = await axios.get(`${API}/${endpoint}`);
      setter(response.data);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  };

  const fetchAppliedUsers = () => fetchData('events-with-applications', 
    data => setState(prev => ({ ...prev, appliedUsers: data.filter(event => 
      event.enrollments.some(enrollment => enrollment.userId === userId)) })));

  const fetchApplied = () => fetchData('eventapplications', 
    data => setState(prev => ({ ...prev, applied: data })));

  useEffect(() => {
    fetchAppliedUsers();
    fetchApplied();
  }, []);

  useEffect(() => {
    let timer;
    if (state.isDialogOpen && !state.quizCompleted && state.timeLeft > 0) {
      timer = setInterval(() => setState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 })), 1000);
    } else if (state.timeLeft === 0) {
      nextQuestion();
    }
    return () => clearInterval(timer);
  }, [state.isDialogOpen, state.timeLeft, state.quizCompleted]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && state.isDialogOpen && !state.quizCompleted) {
        storeScore(scoreRef.current); // Auto-submit on tab switch
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [state.isDialogOpen, state.quizCompleted]);

  const startQuiz = (quiz) => setState(prev => ({ ...prev, currentQuiz: quiz, showInstructions: true }));

  const beginQuiz = () => setState(prev => ({ 
    ...prev, 
    showInstructions: false, 
    isDialogOpen: true, 
    currentQuestionIndex: 0, 
    score: 0, 
    selectedOption: null, 
    quizCompleted: false, 
    timeLeft: 45 
  }));

  const reset = () => setState(prev => ({ 
    ...prev, 
    isDialogOpen: false, 
    currentQuestionIndex: 0, 
    selectedOption: null, 
    quizCompleted: false, 
    quizEndedDueToTabSwitch: false 
  }));

  const storeScore = async (finalScore) => {
    try {
      await axios.post(`${API}/finalscore`, {
        userId,
        eventId: state.currentQuiz._id,
        coin: finalScore,
      });
      toast.success('Quiz auto-submitted due to tab switch!');
      setState(prev => ({ ...prev, quizEndedDueToTabSwitch: true, isDialogOpen: false }));
      fetchAppliedUsers();
      fetchApplied();
    } catch (error) {
      console.error('Error auto-submitting score:', error.response?.data || error.message);
    }
  };

  const finishScore = async (finalScore) => {
    try {
      await axios.post(`${API}/finalscore`, {
        userId,
        eventId: state.currentQuiz._id,
        coin: finalScore,
      });
      toast.success('Quiz completed successfully!');
      setState(prev => ({ ...prev, quizCompleted: false, isDialogOpen: false }));
      fetchAppliedUsers();
      fetchApplied();
    } catch (error) {
      console.error('Error submitting final score:', error.response?.data || error.message);
    }
  };

  const nextQuestion = () => {
    if (!state.selectedOption) return toast.error("Please select an option before proceeding.");
    
    const currentQuestion = state.currentQuiz.questions[state.currentQuestionIndex];
    if (state.selectedOption === currentQuestion.answer) {
      const newScore = state.score + currentQuestion.coin;
      scoreRef.current = newScore;
      setState(prev => ({ ...prev, score: newScore }));
    }

    const nextIndex = state.currentQuestionIndex + 1;
    setState(prev => nextIndex < state.currentQuiz.questions.length 
      ? { ...prev, currentQuestionIndex: nextIndex, timeLeft: 45, selectedOption: null }
      : { ...prev, quizCompleted: true, selectedOption: null }
    );
  };

  const { appliedUsers, applied, currentQuiz, currentQuestionIndex, selectedOption, timeLeft, 
    quizCompleted, isDialogOpen, quizEndedDueToTabSwitch, showInstructions, score } = state;

  return (
    <div className="eventheight text-white">
      <Toaster position="top-center" reverseOrder={false} />
      
      {quizEndedDueToTabSwitch && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-red-700 p-6 rounded-lg w-full max-w-md text-center shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-white">Quiz Ended</h2>
            <p className="text-white mb-4">You switched tabs. Your score has been saved.</p>
            <button onClick={reset} className="px-6 py-2 bg-white text-black rounded-md hover:bg-gray-300 transition">Okay</button>
          </div>
        </div>
      )}

      {showInstructions && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">Instructions</h2>
            <p className="text-sm mb-4">Don't switch tabs or leave the page. Your quiz will be auto-submitted if you do.</p>
            <button onClick={beginQuiz} className="px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition">Start Quiz</button>
          </div>
        </div>
      )}
      
      <div className='h-full backdrop-blur-xl bg-[#e7dfdf1e] p-1'>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {appliedUsers.length > 0 ? appliedUsers.map((quiz, index) => {
            const appliedQuiz = applied.find(item => item.eventId?._id === quiz._id && item.userId?._id === userId);
            const hasCoins = appliedQuiz?.coin !== null;
            return (
              <div key={index} className="p-4 text-center rounded-lg bg-[#080808] drop-shadow-sm shadow-black border border-[#eeeeee2d] shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-lg font-semibold mb-2">{quiz.title}</h2>
                <p className="text-orange-400 text-sm">
                  <span className="font-semibold">Start: </span>
                  {new Date(quiz.start).toLocaleString("en-US", { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true })}
                </p>
                {!hasCoins ? quiz.status === "Ongoing" ? (
                  <button onClick={() => startQuiz(quiz)} className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200">Start Quiz</button>
                ) : (
                  <button className="px-4 py-2 bg-gray-600 rounded-md cursor-not-allowed opacity-75">Quiz Will Start Soon</button>
                ) : (
                  <p className="text-sm text-green-500">You have already participated.</p>
                )}
              </div>
            );
          }) : (
            <h2 className="text-lg font-semibold text-black mb-2">No Quiz Available</h2>
          )}
        </div>
      </div>

      {isDialogOpen && currentQuiz?.questions?.length > 0 && !quizCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 py-11 flex items-center justify-center">
          <div className="bg-[#1d1c1c] p-6 rounded-lg w-full h-full shadow-2xl">
            <div className="flex justify-between items-center gap-3 mb-4">
              <h3 className="text-xl font-bold">{currentQuiz.questions[currentQuestionIndex].question}</h3>
              <div className="text-sm text-red-400 whitespace-nowrap">Time Left: {timeLeft}s</div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(opt => (
                <label key={opt} className={`flex items-center p-3 rounded-md cursor-pointer transition-colors duration-200 ${
                  selectedOption === currentQuiz.questions[currentQuestionIndex][`option${opt}`] ? 'bg-blue-600' : 'shadow-black border border-[#eeeeee2d] shadow-sm'
                }`}>
                  <input
                    type="radio"
                    name="option"
                    checked={selectedOption === currentQuiz.questions[currentQuestionIndex][`option${opt}`]}
                    onChange={() => setState(prev => ({ ...prev, selectedOption: currentQuiz.questions[currentQuestionIndex][`option${opt}`] }))}
                    className="mr-2"
                  />
                  {currentQuiz.questions[currentQuestionIndex][`option${opt}`]}
                </label>
              ))}
            </div>
            <button onClick={nextQuestion} className="mt-6 px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 w-full">Next</button>
          </div>
        </div>
      )}

      {quizCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1d1c1c] p-6 rounded-lg w-full max-w-md shadow-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            {/* <button onClick={reset} className="px-6 py-2 bg-black border border-gray-600 rounded-md hover:bg-gray-900 transition-colors duration-200">Close</button> */}
            <button onClick={() => finishScore(score)} className="px-6 py-2 bg-black border border-gray-600 rounded-md hover:bg-gray-900 transition-colors duration-200">Finish</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playground;
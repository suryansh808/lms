import React, { useState } from "react";
import logo from "../assets/logowhite.png";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Events from "./Events";
import toast, { Toaster } from "react-hot-toast";
import Playground from "./Playground";

const EventDashBoard = () => {
  const [activePage, setActivePage] = useState("events");
  const navigate = useNavigate();

  const handleLogOut = () => {
    toast.success('Logout Successful!', {
      style: {
        border: '1px solid #f15b29',
        padding: '16px',
        color: '#ffffff',
        background: '#1d1e20',
      },
      iconTheme: {
        primary: '#f15b29',
        secondary: '#ffffff',
      },
    });
    setTimeout(() => {
      localStorage.removeItem('eventuserId');
      localStorage.removeItem('eventuserEmail');
      localStorage.removeItem('eventToken');
      navigate('/Talenthunt');
    }, 1500);
  };

  const renderPage = () => {
    switch (activePage) {
      case "profile":
        return <Profile />;
      case "quiz":
        return <Playground />;
      case "events":
        return <Events />;
      default:
        return <Events />;
    }
  };

  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={false} />
      
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#080808] text-white  shadow-lg px-[10px] py-3">
        <div className=" mx-auto flex items-center justify-between gap-2">
          <img src={logo} alt="Logo" className="w-24 lg:w-36 transform hover:scale-105 transition-transform duration-300" />
          
          <nav className="flex font-semibold">
            <button 
              onClick={() => setActivePage("events")}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activePage === "events" 
                  ? " text-[#f15b29] shadow-md" 
                  : "hover:text-[#f15b29] hover:bg-gray-950"
              }`}
            >
              Events
            </button>
            <button 
              onClick={() => setActivePage("quiz")}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activePage === "quiz"
                  ? " text-[#f15b29] shadow-md"
                  : "hover:text-[#f15b29] hover:bg-gray-950"
              }`}
            >
              Playground
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <i 
              onClick={() => setActivePage("profile")} 
              className="fa fa-user text-xl cursor-pointer hover:text-[#f15b29] transition-colors duration-300"
              aria-hidden="true"
            />
          </div>
        </div>
      </header>

      <main>
          {renderPage()}
      </main>

      <footer className="backdrop-blur-md text-white bg-[#080808]  px-[10px] py-2 shadow-lg">
        <div className=" mx-auto flex items-center justify-between">
          <p className="text-sm opacity-75 hover:opacity-100 transition-opacity duration-300">
            © 2024 Krutanic Event. All Rights Reserved.
          </p>
          <button 
            onClick={handleLogOut}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-300 transform hover:scale-105 font-medium"
          >
            Log Out
          </button>
        </div>
      </footer>

    </div>
  );
};

export default EventDashBoard;
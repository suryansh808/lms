import React, { useState } from "react";
import logo from "../assets/logowhite.png";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Events from "./Events";

const EventDashBoard = () => {
  const [activePage, setActivePage] = useState("events");
  const navigate = useNavigate();
  const handleLogOut = () =>{
    setTimeout(() => {
        localStorage.removeItem('eventuserId');
        localStorage.removeItem('eventuserEmail');
        localStorage.removeItem('eventToken');
        navigate('/Talenthunt');
    }, 1500); 
  }

  const renderPage = () => {
    switch (activePage) {
      case "profile":
        return (
          <div>
            <h2><Profile/></h2>
          </div>
        );
      case "quiz":
        return (
          <div>
            <h2>Quiz Page</h2>
          </div>
        );
      case "events":
        return (
          <div>
            <h2><Events/></h2>
          </div>
        );
      default:
        return (
          <div>
            <h2>Profile Page</h2>
          </div>
        );
    }
  };

  return (
    <div className="bg-black p-[8px]">
      <header className="flex items-center rounded-full gap-2 justify-between px-[20px] py-2 bg-[#1d1e20a1] text-white">
        <img src={logo} alt="" className="w-32" />
        <nav className="flex gap-2">
          <button onClick={() => setActivePage("events")}>Events</button>
          <button onClick={() => setActivePage("quiz")}>Quiz</button>
          {/* <button onClick={() => setActivePage("leaderboard")}> Leaderboard</button> */}
        </nav>
        <i onClick={() => setActivePage("profile")} class="fa fa-user text-white cursor-pointer" aria-hidden="true"></i>
      </header>

        <div id="eventdashboard" className="container m-auto">
        <main>
          {renderPage()}
        </main>
        </div>

       <footer className="fixed left-[50%] right-[50%] bottom-0 z-[999] transform translate-x-[-50%] translate-y-[-50%] rounded-full  bg-[#1d1e20a1] text-white w-full px-[20px] py-2 flex items-center justify-between">
          <p className="text-xs">&copy; 2024 Krutanic Event. All Rights Reserved.</p>
          <button onClick={handleLogOut} className="hover:text-red-600">LogOut</button>
        </footer>
    </div>
  );
};

export default EventDashBoard;

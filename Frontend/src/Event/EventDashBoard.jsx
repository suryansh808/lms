import React, { useState } from "react";
import logo from "../assets/logowhite.png";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";

const EventDashBoard = () => {
  const [activePage, setActivePage] = useState("profile");
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
      // case "leaderboard":
      //   return (
      //     <div>
      //       <h2>Leaderboard Page</h2>
      //     </div>
      //   );
      default:
        return (
          <div>
            <h2>Profile Page</h2>
          </div>
        );
    }
  };

  return (
    <div>
      <header className="flex items-center gap-2 justify-between px-[10px] py-2 bg-black text-white">
        <img src={logo} alt="" className="w-32" />
        <nav className="flex gap-2">
          <button onClick={() => setActivePage("profile")}>Profile</button>
          <button onClick={() => setActivePage("quiz")}>Quiz</button>
          {/* <button onClick={() => setActivePage("leaderboard")}> Leaderboard</button> */}
        </nav>
      </header>

      <div id="eventdashboard" className="container m-auto">
      <main>
        {renderPage()}
      </main>
      </div>

       <footer className="fixed bottom-0 bg-black text-white w-full px-[10px] py-2 flex items-center justify-between">
          <p className="text-xs">&copy; 2024 Krutanic Event. All Rights Reserved.</p>
          <button onClick={handleLogOut} className="hover:text-red-600">LogOut</button>
        </footer>
    </div>
  );
};

export default EventDashBoard;

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate  } from "react-router-dom";
import logo from "../assets/LOGO3.png";
import toast ,{Toaster} from 'react-hot-toast';

const AdminHeader = () => {
  const [isMobileVisible, setisMobileVisible] = useState(false);
  const mobileMenuRef = useRef(null);
  const toggleVisibility = () => {
    setisMobileVisible((prevState) => !prevState);
  };
   useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          mobileMenuRef.current &&
          !mobileMenuRef.current.contains(event.target)
        ) {
          setisMobileVisible(false);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);

const navigate = useNavigate();
  const handleLogout = () => {
    toast.success('Logout successful!!!');
    setTimeout(() => {
    localStorage.removeItem("adminToken");
    navigate("/AdminLogin");
  }, 2000); 
  }; 
  return (
    <div id="AdminHeader">
       <Toaster position="top-center" reverseOrder={false}/>
      <div className="navbar">
        <div>
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div ref={mobileMenuRef}>
          <span onClick={toggleVisibility}>☰</span>
        </div>
      </div>
      {isMobileVisible && (
      <div className="sidebar">
      <Link to="/AdminDashboard"><i class="fa fa-home"></i> Home</Link>
      <Link to="/AddCourse">Create Course</Link>
      <Link to="/AddModule">Course List</Link>
      <Link to="/CreateOperation">Create Operation A/c</Link>
      <Link to="/CreateBDA">Create Team A/c</Link>
      <Link to="/CreatePlacementCoordinator">Create PC A/c</Link>
      <Link to="/AcceptedApplication">Active Users</Link>
      <Link to="/PendingApplication">Inactive Users</Link>
      <Link to="/OnBoardingDetails">OnBoarding Details</Link>
      <Link to="/BookedList">Booked Amount List</Link>
      <Link to="/HalfPayment">Half Amount List</Link>
      <Link to="/DefaultList">Default Amount List</Link>
      <Link to="/FullPaidList">Full Paid Amount List</Link>
      <Link to="/AdvanceQueries">Adv Course Queries</Link>
      <Link to="/MentorQueries">Mentor Course Queries</Link>
      <Link to="/MasterClasses">Master Class</Link>
      <Link to="/AddEvent">Add Event</Link>
      <Link to="/EventRegistration">Event Registrations</Link>
      <Link to="/AllTeamDetail">Team Detail</Link>
      <Link to="/RevenueSheet">Revenue Sheet</Link>
     <button onClick={handleLogout}><i className="fa fa-sign-out"></i> Logout</button>
      </div>
      )}
    </div>
  );
};

export default AdminHeader;

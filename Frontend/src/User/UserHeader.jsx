import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../API";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import logo from "../assets/LOGO3.png";

const UserHeader = () => {
  const [isMobileVisible, setisMobileVisible] = useState(false);
  const mobileMenuRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const fetchUserData = async () => {
    if (!userId) {
      console.log("User not logged in");
      return;
    }
    try {
      const response = await axios.get(`${API}/users`, { params: { userId } });
      setUserData(response.data);
      console.log(response.data);
    } catch (err) {
      console.log("Failed to fetch user data");
    }
  };
  const handleLogout = () => {
    toast.success("logout successful!!!");
    setTimeout(() => {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      navigate("/Login");
    }, 2000);
  };

  const toggleVisibility = () => {
    setisMobileVisible((prevState) => !prevState);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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
  return (
    <div id="UserHeader">
      <Toaster position="top-center" reverseOrder={false} />
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
          <div className="detail">
            <span className="fa fa-graduation-cap"></span>
            {userData ? (
              <>
                <h2 className="capitalize">{userData.fullName}</h2>
                <h3>{userData.contact}</h3>
                <h3>{userData.email}</h3>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <Link to="/Dashboard">
            <i className="fa fa-home"></i> Home
          </Link>
          <Link to="/EnrolledCourses">
            <i className="fa fa-book"></i> Enrolled Courses
          </Link>
          <Link to="/Setting">
            <i className="fa fa-gear"></i> Setting
          </Link>
          <button onClick={handleLogout}>
            <i className="fa fa-sign-out"></i> LogOut
          </button>
        </div>
      )}
    </div>
  );
};

export default UserHeader;

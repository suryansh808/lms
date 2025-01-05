import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/LOGO3.png";
import { useNavigate } from "react-router-dom";
import toast ,{Toaster} from 'react-hot-toast';

const BDAHeader = () => {
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
    toast.success("Logged out successfully!");
    setTimeout(() => {
    localStorage.removeItem("bdaId");
    localStorage.removeItem("bdaName");
    localStorage.removeItem("bdaToken");
    navigate("/bdalogin");
    }, 2000);
  }; 
 
   const BdaName = localStorage.getItem("bdaName")
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
          <Link to="/bdadashboard"><i class="fa fa-home"></i> {BdaName}</Link>
          <Link to="/bbookedpayment">Booked Payment</Link>
          <Link to="/bfullpayment">Full Payment</Link>
          <Link to="/bdefaultpayment">Default Payment</Link>
         <button onClick={handleLogout}><i className="fa fa-sign-out"></i> Logout</button>
        </div>
      )}
    </div>
  );
};

export default BDAHeader;

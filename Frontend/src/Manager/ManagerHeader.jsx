import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate  } from "react-router-dom";
import logo from "../assets/LOGO3.png";
import toast ,{Toaster} from 'react-hot-toast';

const OperationHeader = () => {
  const [isMobileVisible, setisMobileVisible] = useState(false);
  const mobileMenuRef = useRef(null);
 
  const navigate = useNavigate();

  const toggleVisibility = () => {
    setisMobileVisible((prevState) => !prevState);
  };
  const handleLogout = () => {
    toast.success('Logout successful!!!');
    setTimeout(() => {
    localStorage.removeItem("managerId");
    localStorage.removeItem("managerEmail");
    localStorage.removeItem("managerToken");
    navigate("/ManagerLogin");
  }, 1500);
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
          <Link to="/ManagerDashBoard"><i class="fa fa-home"></i>Home</Link>
          <Link to="/BookingList">Booked Payment</Link>
          <Link to="/FullPaymentList">Full Payment</Link>
          <Link to="/DefaultedList">Default Payment</Link>
        <button onClick={handleLogout} ><i className="fa fa-sign-out"></i> Logout</button>
        </div>
      )}
    </div>
  );
};


export default OperationHeader;

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import axios from "axios";
import toast ,{Toaster} from 'react-hot-toast';

const OperationLogin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const errorRef = useRef(null);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    try {
      const response = await axios.post(`${API}/operationsendotp`, { email });
      if (response.status === 200) {
        setOtpSent(true);
        toast.success('OTP sent to your email!');
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send OTP. Please try again."
      );
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.success("Please enter OTP.");
      return;
    }
    try {
      const response = await axios.post(`${API}/operationverifyotp`, {
        email,
        otp,
      });
      if (response.status === 200) {
        toast.success('OTP verified successfully!');
        setTimeout(() => {
        localStorage.setItem("operationId", response.data._id);
        localStorage.setItem("operationName", response.data.operationName);
        localStorage.setItem("operationToken", response.data.token);
        navigate("/operationdashboard");
      }, 2000); 
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid OTP. Please try again."
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (errorRef.current && !errorRef.current.contains(event.target)) {
        toast.error(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div id="loginpage">
       <Toaster position="top-center" reverseOrder={false}/>
      <div className="loginform">
        <h2>Operation Login</h2>
        {!otpSent ? (
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSendOtp}>Send OTP</button>
          </div>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <label htmlFor="otp">Enter OTP:</label>
            <input
              type="text"
              id="otp"
              placeholder="Enter OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button type="submit">Verify OTP</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default OperationLogin;


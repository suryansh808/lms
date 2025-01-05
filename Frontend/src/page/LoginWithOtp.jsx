
import React, {useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import API from '../API';
import toast ,{Toaster} from 'react-hot-toast';

const LoginWithOtp = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();
  
  const handleSendOtp = async () => {
    try {
      const response = await axios.post(`${API}/send-otp`, { email });
      if (response.status === 200) {
        toast.success('OTP sent successfully');
        setShowOtp(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error sending OTP');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/verify-otp`, { email, otp });
      toast.success('logout successful!!!');
      if (response.status === 200) {
        setTimeout(() => {
        localStorage.setItem('userId', response.data._id);
        localStorage.setItem('userEmail', response.data.email);
        localStorage.setItem('token', response.data.token);
        navigate('/Dashboard');
      }, 2000); 
      }
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("Your account is inactive. Please contact support.");
      } else if (error.response?.status === 400) {
        toast.error("Invalid or expired OTP. Please try again.");
      } else if (error.response?.status === 404) {
        toast.error("User not found. Please check your email.");
      } else {
        toast.error(
          error.response?.data?.message || "An error occurred while verifying OTP. Please try again."
        );
      }
    }
  };

  return (
    <div id="loginpage">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="loginform">
        <h2>Login with OTP</h2>
        <form onSubmit={handleVerifyOtp}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {!showOtp ? (
            <button type="button" onClick={handleSendOtp}>
              Send OTP
            </button>
          ) : (
            <>
              <div>
                <label>OTP:</label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button type="submit">Verify OTP</button>
            </>
          )}
        </form>
          <p>--------------------or--------------------</p>
          <div className='loginwith'><Link to="/Login">Login with password</Link></div>
      </div>
    </div>
  );
};

export default LoginWithOtp;

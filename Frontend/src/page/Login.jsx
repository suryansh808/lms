import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API from "../API";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/checkuserauth`, {
        email,
        password,
      });
      toast.success("Login successful!!!");
      if (response.status === 200) {
        setTimeout(() => {
          console.log(response.data);
          localStorage.setItem("userId", response.data._id);
          localStorage.setItem("userEmail", response.data.email);
          localStorage.setItem("token", response.data.token);
          navigate("/Dashboard");
        }, 2000);
      }
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("Your account is inactive. Please contact support.");
      } else if (error.response?.status === 401) {
        toast.error("Invalid email or password.");
      } else {
        toast.error(
          error.response?.data?.message ||
            "An error occurred while logging in. Please try again."
        );
      }
    }
  };

  return (
    <div id="loginpage">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="loginform">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter your password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className=" absolute mt-2 right-7 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <div>
            <button type="submit">Login</button>
          </div>
        </form>
        <p>--------------------or--------------------</p>
        <div className="loginwith">
          <Link to="/Loginwithotp" className="">
            Login with OTP
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

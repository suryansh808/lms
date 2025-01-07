
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and Password are required");
      return;
    }
    try {
      const response = await axios.post(`${API}/checkadmin`, {
        email,
        password,
      });
     if(response.status === 200){
       toast.success("Login successful!");
      setTimeout(() => {
        localStorage.setItem("adminToken", response.data.token);
        navigate("/AdminDashboard");
      }, 1500);
     }
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div id="loginpage">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="loginform">
        <h2>Admin LogIn</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleLogin}>Log In</button>
        <p>--------------------or--------------------</p>
                <div className='loginwith'>
                    <Link to="/AdminLogin">Login with OTP</Link>
                </div>
      </div>
    </div>
  );
};

export default LoginAdmin;

import React, { useState } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Setting = () => {
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== rePassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const email = localStorage.getItem("userEmail");
      const response = await axios.put(`${API}/updatepassword`, {
        email,
        newPassword,
      });
      toast.success("Password updated successfully!");
      setNewPassword("");
      setRePassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <div id="usersetting">
      <Toaster position="top-center" reverseOrder={false} />
      <h2>Change Password</h2>
      <div className="form relative">
        <form onSubmit={handleSubmit}>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              id="NewPassword"
              name="NewPassword"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
           
          </div>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              id="RePassword"
              name="RePassword"
              placeholder="Re-Enter Password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>
          <span className=" absolute bottom-16 right-5" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
          <input type="submit" className="btn mt-3" value="Update Password" />
        </form>
      </div>
    </div>
  );
};

export default Setting;

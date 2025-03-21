import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../API";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [appliedUsers, setAppliedUsers] = useState([]);
  const userEmail = localStorage.getItem("eventuserEmail");
  const userRole = localStorage.getItem("eventuserId");

  const fetchEventUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API}/alleventregistrationnts`);
      const filteredUsers = response.data.filter(
        (item) => item.email === userEmail
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.error("There was an error fetching the event users", error);
      setError("Failed to load profile data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchApplietUsers = async () => {
    try {
      const response = await axios.get(`${API}/eventapplications`);
      // console.log(response.data.filter((item)=> item.userId._id === userRole))
      setAppliedUsers(response.data.filter((item)=> item.userId._id === userRole));
    } catch (error) {
      console.error("Error fetching applied users:", error);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchEventUsers();
      fetchApplietUsers();
    } else {
      setError("No user email found. Please log in.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="eventheight flex items-center justify-center">
        <p className="text-white">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="eventheight flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  

  return (
    <div className="eventheight">
     <div className="flex items-center justify-center h-full">
     {users.length > 0 ? (
        users.map((user, index) => (
          <div key={index} className="space-y-4 bg-[#080808] text-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-xl  font-semibold">
              <span className=" font-bold">Name: </span>
              {user.name}
            </h2>
            <h2 className="text-xl  font-semibold">
              <span className=" font-bold">Email: </span>
              {user.email}
            </h2>
            <h2 className="text-xl  font-semibold">
              <span className=" font-bold">Phone No: </span>
              {user.phone}
            </h2>
            <h2 className="text-xl font-semibold ">
              <span className=" font-bold">College Name:</span> {user.collegeName}
            </h2>
            <h2 className="text-xl font-semibold "><span className=" font-bold">K Coins : </span> {appliedUsers.map(item => item.userId && item.userId._id === user._id ? Number(item.coin) || 0 : 0).reduce((total, coin) => total + coin, 0)}</h2>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-white">
            No profile data found for this email.
          </p>
        </div>
      )}
     </div>
    </div>
  );
};

export default Profile;

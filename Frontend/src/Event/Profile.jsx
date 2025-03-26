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
     <div className="backdrop-blur-2xl bg-[#9e9a9a46] profile h-full">
    <div className="p-1 border-r-2 border-[#0808083a]">
    {users.length > 0 ? (
        users.map((user, index) => (
          <div key={index} className="space-y-4  p-3 ">
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
            <h2 className="text-xl font-semibold "><span className=" font-bold">Krutanic Coins : </span> {appliedUsers.map(item => item.userId && item.userId._id === user._id ? Number(item.coin) || 0 : 0).reduce((total, coin) => total + coin, 0)}</h2>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-black text-center">
            No profile data found for this email.
          </p>
        </div>
      )}
    </div>
    <div className="p-4">
  <h2 className="text-center font-bold text-xl mb-4">Krutanic Coins Redemption Instructions</h2>

  <p className="mb-4">
    <strong>Collect 5000 Krutanic Coins:</strong><br />
    Unlock exclusive offers by collecting a total of 5000 Krutanic Coins.
  </p>

  <div className="mb-6">
    <h3 className="font-semibold text-lg mb-2">Available Offers:</h3>
    <ul className="list-disc list-inside space-y-2">
      <li>
        <strong>Krutanic Self-Learning Program: </strong> Choose any domain and gain access to our self-learning program.
      </li>
      <li>
        <strong>Placement Assistance Program: </strong> Get access to our placement assistance program to help kickstart your career.
      </li>
      <li>
        <strong>₹1000 Cash: </strong> Redeem your coins to receive up to ₹1000 in cash.
      </li>
    </ul>
  </div>

  <div className="mb-6">
    <h3 className="font-semibold text-lg mb-2">Additional Offers:</h3>
    <ul className="list-disc list-inside space-y-2">
      <li>
        <strong>Add 2000 Coins for ₹2000 Cash: </strong> Add 2000 more coins to your redemption and receive up to ₹2000 in cash.
      </li>
      <li>
        <strong>Add 4000 Coins for ₹3000 Cash: </strong> Increase your total redemption to 9000 coins and receive up to ₹3000 in cash.
      </li>
    </ul>
  </div>

  <p className="mb-4">
    <strong>Note:</strong> Make sure to collect enough coins to access these valuable offers!
  </p>

  <div className="border border-gray-950 p-4 rounded-md text-center">
    <p className="font-semibold">Ready to redeem your coins?</p>
    <p>Contact us to convert your Krutanic Coins into any of the offers above.</p>
    <p className="mt-2 font-semibold">Email: <a href="mailto:info@krutanic.com" className="text-blue-600 underline">info@krutanic.com</a></p>
  </div>
</div>

     </div>
    </div>
  );
};

export default Profile;

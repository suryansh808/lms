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
  const userEmail = localStorage.getItem("eventuserEmail");

  const fetchEventUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API}/alleventregistrations`);
      console.log(
        "event users",
        response.data.filter((item) => item.email === userEmail)
      );
      setUsers(
        response.data.filter((item) => item.email && item.email === userEmail)
      );
    } catch (error) {
      console.error("There was an error fetching the event users", error);
      setError("Failed to load profile data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchEventUsers();
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

  const applicationData = users?.[0]?.applicationData || [];

  return (
    <div className="eventheight">
      <div className="backdrop-blur-2xl bg-[#9e9a9a46] profile h-full">
        <div className="p-1 border-r-2 border-[#0808083a]">
          {users.length > 0 ? (
            users.map((user, index) => (
              <div
                key={index}
                className="space-y-4 p-3 bg-gradient-to-r from-white to-purple-500 text-transparent bg-clip-text"
              >
                <h2 className="text-xl font-semibold">
                  <span className="font-bold">Name: </span>
                  {user.name}
                </h2>
                <h2 className="text-xl font-semibold">
                  <span className="font-bold">Email: </span>
                  {user.email}
                </h2>
                <h2 className="text-xl font-semibold">
                  <span className="font-bold">Phone No: </span>
                  {user.phone}
                </h2>
                <h2 className="text-xl font-semibold">
                  <span className="font-bold">College Name: </span>
                  {user.collegeName}
                </h2>
                <h2 className="text-xl font-semibold">
                  <span className="font-bold">Krutanic Coins: </span>
                  {user.totalCoins}
                </h2>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-black text-center">
                No profile data found for this email.
              </p>
            </div>
          )}
           <div className="text-center mt-5 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-black gradient-text">
              | Follow Us
            </h2>
            <p className=" text-lg text-black">
              Stay updated with the latest news and announcements on our social
              channels.
            </p>

            <div className=" flex justify-center gap-6">
              <a
                target="_blank"
                href="https://www.facebook.com/people/Krutanic-Solutions/61563953173071/"
                className="text-blue-500 text-4xl hover:text-blue-700"
              >
                <span className="fa fa-facebook"></span>
              </a>
              <a
                target="_blank"
                href="https://www.youtube.com/@KrutanicSolutions"
                className="text-red-800 text-4xl hover:text-red-900"
              >
                <span className="fa fa-youtube"></span>
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/krutanic"
                className="text-pink-500 text-4xl hover:text-pink-700"
              >
                <span className="fa fa-instagram"></span>
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/company/krutanic/"
                className="text-blue-700 text-4xl hover:text-blue-900"
              >
                <span class="fa fa-linkedin"></span>
              </a>
              <a
            target="_blank"
              href="https://github.com/Krutanic/"
              className="text-black text-4xl"
            >
              <span class="fa fa-github"></span>
            </a>
            </div>
          </div>
        </div>

        <div className="p-4 scrollbar-hidden">
          <h2 className="text-2xl text-white font-bold text-center">
            Events Details
          </h2>
          <div className="rounded-xl mt-3 overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-purple-500 text-white">
                 <th className=" px-4 py-2">SL No</th>
                <th className=" px-4 py-2">Events</th>
                <th className=" px-4 py-2">Date & Time</th>
                <th className=" px-4 py-2">Coins</th>
              </tr>
            </thead>
            <tbody>
              {applicationData.length > 0 ? (
                applicationData.map((user, index) => (
                  <tr
                    key={index}
                    className="bg-white odd:bg-gray-100 text-center"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className=" px-4 py-2">
                      {user.remarks || "N/A"}
                    </td>
                    <td className=" px-4 py-2">
                      {new Date(user.createdAt).toLocaleString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td className=" px-4 py-2">
                      {user.coin !== null ? user.coin : "Not Assigned"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center px-4 py-2"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

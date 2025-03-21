import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";

const Events = () => {
  const [users, setUsers] = useState([]);
  const [event, setEvent] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [appliedUsers, setAppliedUsers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const userId = localStorage.getItem("eventuserId");
  // const userEmail = localStorage.getItem("eventuserEmail");

  const fetchEventUsers = async () => {
    try {
      const response = await axios.get(`${API}/alleventregistrationnts`);
      setUsers(response.data);
    } catch (error) {
      console.error("There was an error fetching the event users", error);
    }
  };

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`${API}/allevents`);
      setEvent(
        response.data?.filter((item) => item.status === "Upcoming Events")
      );
      setOngoing(response.data?.filter((item) => item.status === "Ongoing"));
      setCompleted(
        response.data?.filter((item) => item.status === "Completed")
      );
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleApply = async (event) => {
    try {
      if (!userId || !event) {
        toast.error("User ID or Event is missing.");
        return;
      }
      const response = await axios.post(`${API}/eventapplications`, {
        userId,
        eventId: event._id,
      });
      toast.success("Applied Successfully!");
      fetchApplietUsers();
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Already Applied");
    }
  };

  const fetchApplietUsers = async () => {
    try {
      const response = await axios.get(`${API}/eventapplications`);
      setAppliedUsers(response.data);

      const userCoins = users
        .map((user) => {
          if (!user || !user._id) return { name: user?.name, coin: 0 };
          const totalCoins = response.data
            .filter((item) => item.userId && item.userId._id === user._id)
            .reduce((total, item) => total + (Number(item.coin) || 0), 0);

          return totalCoins !== null
            ? { name: user.name, coin: totalCoins }
            : null;
        })
        .filter((user) => user !== null);
      const sortedLeaderboard = [...userCoins].sort((a, b) => b.coin - a.coin);
      // console.log(sortedLeaderboard);
      setLeaderboard(sortedLeaderboard);
    } catch (error) {
      console.error("Error fetching applied users:", error);
    }
  };

  useEffect(() => {
    fetchEvent();
    fetchApplietUsers();
    fetchEventUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      fetchApplietUsers();
    }
  }, [users]);

  const EventCard = ({ dets, status }) => {
    const appliedCount = Array.isArray(appliedUsers)
      ? appliedUsers.filter((user) => user.eventId && user.eventId._id === dets._id).length
      : 0;
    const isAlreadyApplied = Array.isArray(appliedUsers)
      ? appliedUsers.some(
          (user) => user.eventId && user.eventId._id === dets._id && user.userId &&  user.userId._id === userId
        )
      : false;

    return (
      <div className="p-4 mb-4 rounded-lg drop-shadow-sm shadow-black border border-[#eeeeee2d] shadow-lg">
        <h2 className="text-xl font-bold text-white text-center mb-2">
          {dets.title}
        </h2>
        <p className="text-orange-400 text-sm">
          <span className="font-semibold">Start: </span>
          {new Date(dets.start).toLocaleString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-gray-300 text-sm">
            {appliedCount > 0 ? `${appliedCount} registered` : "0 registered"}
          </p>
          {isAlreadyApplied ? (
            <button className="px-3 py-1 bg-gray-600 text-white rounded-md cursor-not-allowed opacity-75">
              Already Applied
            </button>
          ) : (
            <button
              onClick={() => handleApply(dets)}
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="eventheight bg-black text-white p-2">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="grid lg:grid-cols-4 gap-3">
        {/* Events Sections */}
        <div className="lg:col-span-3 grid lg:grid-cols-3 gap-3">
          {/* Upcoming Events */}
          <div className="bg-[#080808] pereventheigth rounded-lg p-4 shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              Upcoming Events
            </h2>
            <div className="max-h-[70vh] scrollbar-hidden">
              {event.length > 0 ? (
                event.map((dets) => (
                  <EventCard key={dets._id} dets={dets} status="Upcoming" />
                ))
              ) : (
                <p className="text-center text-gray-400">No upcoming events</p>
              )}
            </div>
          </div>

          {/* Ongoing Events */}
          <div className="bg-[#080808] pereventheigth rounded-lg p-4 shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-4 bg-gradient-to-r from-green-500 to-teal-500 text-transparent bg-clip-text">
              Ongoing Events
            </h2>
            <div className="max-h-[70vh] scrollbar-hidden">
              {ongoing.length > 0 ? (
                ongoing.map((dets) => (
                  <EventCard key={dets._id} dets={dets} status="Ongoing" />
                ))
              ) : (
                <p className="text-center text-gray-400">No ongoing events</p>
              )}
            </div>
          </div>

          {/* Completed Events */}
          <div className="bg-[#080808] pereventheigth rounded-lg p-4 shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-4 bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text">
              Completed Events
            </h2>
            <div className="max-h-[70vh] scrollbar-hidden">
              {completed.length > 0 ? (
                completed.map((dets) => (
                  <EventCard key={dets._id} dets={dets} status="Completed" />
                ))
              ) : (
                <p className="text-center text-gray-400">No completed events</p>
              )}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-[#080808] pereventheigth rounded-lg p-4 shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text">
            Leaderboard
          </h2>
          <div className="space-y-4">
            {leaderboard.length > 0 ? (
              leaderboard.slice(0, 3).map((user, index) => (
                <div
                  key={index}
                  className="p-3 drop-shadow-sm shadow-black border border-[#eeeeee2d] shadow-lg rounded-md flex items-center justify-between hover:bg-gray-950 transition-colors"
                >
                  <span className="text-lg font-medium">
                    {index + 1}. {user.name}
                  </span>
                  <span className="text-sm text-yellow-400">
                    Score: {user.coin}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">
                No users on the leaderboard yet.
              </p>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .pereventheigth {
          height: calc(100vh - 133px);
        }
      `}</style>
    </div>
  );
};

export default Events;

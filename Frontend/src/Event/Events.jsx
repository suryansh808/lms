import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";

const Events = () => {
  const [event, setEvent] = useState();
  const [ongoing, setOngoing] = useState();
  const [completed , setCompleted] = useState();
  const userId = localStorage.getItem("eventuserId");
  const [appliedUsers, setAppliedUsers] = useState();

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`${API}/allevents`);
      setEvent(response.data.filter((item)=> item.status === "Upcoming Events"));
      setOngoing(response.data.filter((item) => item.status === "Ongoing"));
      setCompleted(response.data.filter((item) => item.status === "Completed"));
    } catch (error) {
      console.error("There was an error fetching the event users", error);
    }
  };

  const handleApply = async (event) => {
    try {
      if (!userId || !event) {
        alert("User ID or Job is missing.");
        return;
      }
      const response = await axios.post(`${API}/eventapplications`, {
        userId,
        eventId: event._id,
      });
      toast.success("Applied Successfully");
      fetchApplietUsers();
    } catch (error) {
      console.error("Error submitting job application:", error);
      toast.error("Already Applied");
    }
  };

  const fetchApplietUsers = async () => {
    try {
      const response = await axios.get(`${API}/eventapplications`);
      setAppliedUsers(response.data);
    } catch (error) {
      console.error("There was an error fetching applied users", error);
    }
  };

  useEffect(() => {
    fetchEvent();
    fetchApplietUsers();
  }, []);

  return (
    <div className="lg:flex eventheight">
      <Toaster position="top-center" reverseOrder={false} />
      <div className=" lg:flex lg:gap-1 p-1 w-full">
        <div className="overflow-hidden border-r border-gray-900 lg:w-1/3">
          <h2 className="text-center text-white">Upcoming Events</h2>
          <div className="h-full overflow-auto scrollbar-hide p-1">
            {event?.map((dets) => {
              const appliedCount = appliedUsers?.filter(
                (user) => user.eventId._id === dets._id
              ).length;
              const isAlreadyApplied = appliedUsers?.some(
                (user) =>
                  user.eventId._id === dets._id && user.userId._id === userId
              );
              return (
                <div className="p-2 mb-2 rounded-md bg-gradient-to-tr from-[#10ac85ec] to-[#030303]">
                  <h2 className="text-center text-white text-2xl">
                    {dets.title}
                  </h2>
                  <p className="text-center text-xs mt-2 text-[#eee]">
                    {dets.status}
                  </p>
                  <div className="flex items-center justify-between mt-5">
                    <p> {appliedCount} Condidates have registered</p>
                    {isAlreadyApplied ? (
                      <button className="border cursor-not-allowed px-2 py-1 rounded-md">
                        already applied
                      </button>
                    ) : (
                      <button
                        className="border text-white px-2 py-1 rounded-md"
                        onClick={() => handleApply(dets)}
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className=" overflow-hidden border-r border-gray-900 lg:w-1/3">
          <h2 className="text-center text-white">Ongoing Events</h2>
          <div className="h-full overflow-auto scrollbar-hide p-1">
            {ongoing && ongoing.length > 0 ? (
              ongoing.map((dets) => {
                const appliedCount = appliedUsers?.filter(
                  (user) => user.eventId._id === dets._id
                ).length;
                const isAlreadyApplied = appliedUsers?.some(
                  (user) =>
                    user.eventId._id === dets._id && user.userId._id === userId
                );
                return (
                  <div className="p-2 mb-2 h-1/2 rounded-md bg-gradient-to-tr from-[#10ac85ec] to-[#030303]">
                    <h2>{dets.title}</h2>
                    <p>{dets.status}</p>
                    {isAlreadyApplied ? (
                      <p>Already applied</p>
                    ) : (
                      <button onClick={() => handleApply(dets)}>
                        Apply Now
                      </button>
                    )}
                    <p>{appliedCount} Candidates have registered</p>
                  </div>
                );
              })
            ) : (
              <p className="text-white text-center">Event not started yet</p>
            )}
          </div>
        </div>

        <div className=" overflow-hidden border-r border-gray-900 lg:w-1/3">
          <h2 className="text-center text-white">Completed Events</h2>
          <div className="h-full overflow-auto scrollbar-hide p-1">
          {completed && completed.length > 0 ? (
              completed.map((dets) => {
                const appliedCount = appliedUsers?.filter(
                  (user) => user.eventId._id === dets._id
                ).length;
                const isAlreadyApplied = appliedUsers?.some(
                  (user) =>
                    user.eventId._id === dets._id && user.userId._id === userId
                );
                return (
                  <div className="p-2 mb-2 h-1/2 rounded-md bg-gradient-to-tr from-[#10ac85ec] to-[#030303]">
                    <h2>{dets.title}</h2>
                    <p>{dets.status}</p>
                    {isAlreadyApplied ? (
                      <p>Already applied</p>
                    ) : (
                      <button onClick={() => handleApply(dets)}>
                        Apply Now
                      </button>
                    )}
                    <p>{appliedCount} Candidates have registered</p>
                  </div>
                );
              })
            ) : (
              <p className="text-white text-center">Event not finist yet</p>
            )}
          </div>
        </div>
      </div>

      <div className="lg:w-1/5 w-full p-1">
        <div className="h-full">
          <h2 className="text-center text-white">LeaderBoards</h2>
          <div className="text-white">
            <h2>Danish</h2>
            <h2>affan</h2>
            <h2>Suryansh</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;

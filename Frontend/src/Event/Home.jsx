import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
      const [event, setEvent] = useState();
      const userId = localStorage.getItem("eventuserId");
      const [appliedUsers, setAppliedUsers] = useState();

      const fetchEvent = async () => {
        try {
          const response = await axios.get(`${API}/allevents`);
          setEvent(response.data.filter((item)=> item.status === "Upcoming Events"));
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
    <div className="px-[10px] py-[10px]">
         <Toaster position="top-center" reverseOrder={false} />
         <div className="grid lg:grid-cols-4 grid-cols-1 gap-3">
            {event?.map((dets) => {
              const appliedCount = appliedUsers?.filter(
                (user) => user.eventId._id === dets._id
              ).length;
              const isAlreadyApplied = appliedUsers?.some(
                (user) =>
                  user.eventId._id === dets._id && user.userId._id === userId
              );
              return (
                <div className="bg-[#1817175d] shadow-sm shadow-white backdrop-blur-md h-[250px] w-[300px] mb-2 lg:mb-0 p-1 rounded-md ">
                  <h2 className="text-center text-white text-2xl">
                    {dets.title}
                  </h2>
                  <p className="text-center text-xs mt-2 text-[#eee]">
                    {dets.status}
                  </p>
                  <div className="flex items-center justify-between mt-5">
                    <p> {appliedCount} registered</p>
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
  )
}

export default Home

import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";

import { EffectCoverflow, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Events = () => {
    const [event, setEvent] = useState();
    const userId = localStorage.getItem("eventuserId");
    const [appliedUsers, setAppliedUsers] = useState();

    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${API}/allevents`);
        setEvent(response.data);
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
    <div>
        <Toaster position="top-center" reverseOrder={false} />
      <div className="p-4 rounded-2xl shadow-lg mb-2 lg:mb-0">
          <h2 className="text-xl font-bold mb-4 text-center">
            Events Categories
          </h2>
          <Swiper
            className="cursor-grab active:cursor-grabbing p-5"
            modules={[A11y, EffectCoverflow]}
            effect="coverflow"
            spaceBetween={5}
            slidesPerView={3}
          >
            {event?.map((dets) => {
              const appliedCount = appliedUsers?.filter((user) => user.eventId._id === dets._id).length;
              const isAlreadyApplied = appliedUsers?.some((user) => user.eventId._id === dets._id && user.userId._id === userId);
              return (
                <SwiperSlide className="h-[300px] rounded-lg overflow-auto text-white ">
                  <div className="w-full h-full p-2 bg-gradient-to-tr from-[#10ac84] to-[#222f3e]">
                    <h2>{dets.title}</h2>
                    <h2>{dets.type}</h2>
                    <p>{dets.status}</p>
                    {isAlreadyApplied ? (
                      <p>already applied</p>
                    ) : (
                      <button onClick={() => handleApply(dets)}>
                        Apply Now
                      </button>
                    )}
                    <p> {appliedCount} Condidates have registered</p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
    </div>
  )
}

export default Events

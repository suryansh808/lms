import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../API";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Profile = () => {
  const [users, setUsers] = useState();
  const userEmail = localStorage.getItem("eventuserEmail");
  const fetchEventUsers = async () => {
    try {
      const response = await axios.get(`${API}/alleventregistrationnts`);
      setUsers(response.data.filter((item) => item.email === userEmail));
    } catch (error) {
      console.error("There was an error fetching the event users", error);
    }
  };
  useEffect(() => {
    fetchEventUsers();
  }, []);


  return (
    <div className="py-2 lg:flex gap-2">
      <div className="text-white bg-[#1d1e20a1] p-[10px] lg:min-w-fit rounded-md">
          {users?.map((user, index) => (
            <div key={index} className="space-y-2">
              <h2>
                <strong>Name: </strong>
                {user.name}
              </h2>
              <h2>
                <strong>Email:</strong> {user.email}
              </h2>
              <h2>
                <strong>Phone No: </strong>
                {user.phone}
              </h2>
            </div>
          ))}
        </div>
        <div className="bg-[#1d1e20a1] text-white text-center lg:w-full rounded-md">
          <h2>LeaderBoards</h2>
        </div>
    </div>
  );
};

export default Profile;

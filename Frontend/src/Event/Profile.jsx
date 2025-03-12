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
    <div className="inner-div">
          {users?.map((user, index) => (
            <div key={index} className="space-y-2">
              <h2 className="text-[#B212A8] font-semibold">
                <strong className="text-[#130C36]">Name: </strong>
                {user.name}
              </h2>
              <h2 className="text-[#B212A8] font-semibold">
                <strong className="text-[#130C36]">Email:</strong> {user.email}
              </h2>
              <h2 className="text-[#B212A8] font-semibold">
                <strong className="text-[#130C36]">Phone No: </strong>
                {user.phone}
              </h2>
            </div>
          ))}
        
    </div>
  );
};

export default Profile;

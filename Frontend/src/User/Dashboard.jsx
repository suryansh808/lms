import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../API";



const Dashboard = () => {
  const userEmail = localStorage.getItem("userEmail");
  const [enrollData, setenrollData] = useState([]);

  const fetchenrollData = async () => {
    try {
      const response = await axios.get(`${API}/enrollments`);
      console.log("enrooled data", response.data);
      setenrollData(response.data.filter((item) => item.email === userEmail));
    } catch (error) {
      console.error("There was an error fetching enrolledData:", error);
    }
  };

  const navigate = useNavigate();

  const handleStartLearning = (title, sessionlist) => {
    console.log("learning", title, sessionlist);
    navigate('/Learning', { state: { courseTitle: title, sessions: sessionlist } });
  };

  useEffect(() => {
    fetchenrollData();
  }, []);

  return (
    <div id='UserDashboard'>
      <div className='password'>
        <span><i className="fa fa-lock"></i> Change Password</span>
        <Link to="/Setting"> Click Here</Link>
      </div>
      <br />
      <h2>Dashboard</h2>
      <div className='number'>
        <div>
          <span><i className='fa fa-book' ></i> Enrolled Courses</span>
          <h2>{enrollData.length}</h2>
        </div>
        <div>
          <span> <i className='fa fa-graduation-cap'></i> Active Courses</span>
          <h2>{(enrollData.filter((item) => item.status === "fullPaid")).length}</h2>
        </div>
      </div>
      <br />
      <h2>Courses</h2>
      <div className='courselist'>

        {enrollData.map((item, index) => (
          <div key={index} className="list">
            <h2>{item.domain.title}</h2>
            <span>★★★★★</span>
            <p> Session {Object.keys(item.domain.session).length}</p>

            {item.status === "fullPaid" ? (
              <button onClick={() => handleStartLearning(item.domain.title,item.domain.session)}>Start Learning</button>
            ) : (
              <h3>Your Due Date: {item.clearPaymentMonth}</h3>
            )}
          </div>
        ))}

      </div>
    </div>
  )
}

export default Dashboard;

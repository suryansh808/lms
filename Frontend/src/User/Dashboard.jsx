import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../API";
import debounce from "lodash/debounce";

const Dashboard = () => {
  const userEmail = localStorage.getItem("userEmail");
  const [enrollData, setenrollData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchenrollData = debounce(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/enrollments`);
      setenrollData(response.data.filter((item) => item.email === userEmail));
    } catch (error) {
      console.error("There was an error fetching enrolledData:", error);
    }finally {
      setLoading(false);
    }
  }, 500);


  useEffect(() => {
    fetchenrollData();
  }, []);


 
  const handleStartLearning = (title, sessionlist) => {
    navigate("/Learning", {state: { courseTitle: title, sessions: sessionlist },});
  };


  return (
    <div id="UserDashboard">
      <div className="password">
        <span>
          <i className="fa fa-lock"></i> Change Password
        </span>
        <Link to="/Setting"> Click Here</Link>
      </div>
      <br />
      <h2>Dashboard</h2>
      <div className="number">
        <div>
          <span>
            <i className="fa fa-book"></i> Enrolled Courses
          </span>
          <h2>{enrollData.length}</h2>
        </div>
        <div>
          <span>
            {" "}
            <i className="fa fa-graduation-cap"></i> Active Courses
          </span>
          <h2>
            {enrollData.filter((item) => item.status === "fullPaid").length}
          </h2>
        </div>
      </div>
      <h2>Courses</h2>
      {loading ? (
         <div id="loader">
         <div class="three-body">
           <div class="three-body__dot"></div>
           <div class="three-body__dot"></div>
           <div class="three-body__dot"></div>
         </div>
       </div>
        ) : (
      <div className="courselist">
        {enrollData.map((item, index) => (
          <div key={index} className="list">
            <h2>{item.domain.title}</h2>
            <span>★★★★★</span>
            <p> Session {Object.keys(item.domain.session).length}</p>
            

            {item.status === "fullPaid" ? (
              <button
                onClick={() =>
                  handleStartLearning(item.domain.title, item.domain.session)
                }
              >
                Start Learning
              </button>
            ) : (
             <div className=" space-y-2">
               <h3><strong>Your Due Date:</strong> {item.clearPaymentMonth}</h3>
               <p><strong>Your Due Payment Amount Is :</strong> ₹ {item.programPrice - item.paidAmount}/-</p>
               <p className="text-center"><strong>Note:</strong> <span className="font-bold">To begin your learning journey, please ensure your outstanding payment is cleared. Kindly settle the due amount before the specified due date.</span> </p>
             </div>

            )}
          </div>
        ))}
      </div>
       )}
    </div>
  );
};

export default Dashboard;

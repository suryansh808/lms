import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import API from "../API";

ChartJS.register(ArcElement, Tooltip, Legend);

const BDADashboard = () => {
  const [newStudent, setNewStudent] = useState([]);

  const fetchNewStudent = async () => {
    const bdaName = localStorage.getItem("bdaName");
    try {
      const response = await axios.get(`${API}/getnewstudentenroll`);
      setNewStudent(
        response.data.filter(
          (item) => item.counselor && item.counselor === bdaName
        )
      );
    } catch (error) {
      console.error("There was an error fetching new student:", error);
    }
  };

  useEffect(() => {
    fetchNewStudent();
  }, []);

  const totalRevenue = newStudent.reduce(
    (acc, student) => acc + (student.programPrice || 0),
    0
  );
  const totalBooked = newStudent.reduce(
    (acc, student) => acc + (student.paidAmount || 0),
    0
  );
  const defaultAmount = newStudent.reduce((acc, student) => {
    if (student.status === 'default') {
      return acc + (student.paidAmount || 0);
    }
    return acc + (student.defaultAmount || 0);
  }, 0);

  const data = {
    labels: ["Total Revenue", "Total Booked", "Default Amount"],
    datasets: [
      {
        data: [totalRevenue, totalBooked, defaultAmount],
        backgroundColor: ["#36A2EB", "#4BC0C0", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#4BC0C0", "#FF6384"],
      },
    ],
  };

  if(!newStudent){
    return <div id="loader">
    <div class="three-body">
  <div class="three-body__dot"></div>
  <div class="three-body__dot"></div>
  <div class="three-body__dot"></div>
  </div>
  </div>;
 }
 
  return (
    <div id="AdminDashboard">
      <h2 className="text-center font-semibold mb-2">Dashboard</h2>

      <div className="numberdiv">
        <div>
          <i className="text-yellow-500 fa fa-calendar"></i>
          <h2>Booked</h2>
          <span>
            {newStudent.filter((item) => item.status === "booked").length}
          </span>
        </div>
        <div>
          <i className="text-green-700 fa fa-money"></i>
          <h2>Full PAID</h2>
          <span>
            {newStudent.filter((item) => item.status === "fullPaid").length}
          </span>
        </div>
        <div>
          <i className="text-red-700 fa fa-times-circle"></i>
          <h2>Default</h2>
          <span>
            {newStudent.filter((item) => item.status === "default").length}
          </span>
        </div>
      </div>

      <div className="revenue">
        <div className="revenue-card">
          <h2>Total Revenue Details</h2>
          <p>Total Revenue: {totalRevenue}/-</p>
          <p>Total Booked: {totalBooked}/-</p>
          <p>Default Amount: {defaultAmount}/-</p>
        </div>

        <div className="revenue-card">
        <h2 className="text-lg font-medium mb-4">Overall Performance</h2>
        <div className="">
          <Pie data={data} />
        </div>
      </div>
      </div>

     
    </div>
  );
};

export default BDADashboard;

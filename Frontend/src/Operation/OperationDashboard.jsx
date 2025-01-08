import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const OperationDashboard = () => {
  const [operationData, setOperationData] = useState([]);

  const fetchOperationData = async () => {
    const operationId = localStorage.getItem("operationId");
    try {
      const response = await axios.get(`${API}/getnewstudentenroll`, {
        params: { operationId },
      });
      setOperationData(
        response.data.filter((data) => data.operationId == operationId)
      );
    } catch (err) {
      console.log("Failed to fetch user data");
    }
  };

  useEffect(() => {
    fetchOperationData();
  }, []);
  
  if(!operationData){
    return <div id="loader">
    <div class="three-body">
  <div class="three-body__dot"></div>
  <div class="three-body__dot"></div>
  <div class="three-body__dot"></div>
  </div>
  </div>;
 }

  const bookedCount = operationData.filter(
    (item) => item.status === "booked"
  ).length;
  const fullPaidCount = operationData.filter(
    (item) => item.status === "fullPaid"
  ).length;
  const defaultCount = operationData.filter(
    (item) => item.status === "default"
  ).length;

  const data = {
    labels: ["Booked", "Full Paid", "Default"],
    datasets: [
      {
        data: [bookedCount, fullPaidCount, defaultCount],
        backgroundColor: ["#FFD700", "#4CAF50", "#FF6347"],
        hoverBackgroundColor: ["#FFC107", "#388E3C", "#D32F2F"],
      },
    ],
  };



  return (
    <div id="AdminDashboard">
      <h2 className="text-center font-semibold mb-4">Operation Dashboard</h2>

      
      <div className="numberdiv">
        <div>
          <i className="text-yellow-500 fa fa-calendar"></i>
          <h2>Booked</h2>
          <span>{bookedCount}</span>
        </div>
        <div>
          <i className="text-green-700 fa fa-money"></i>
          <h2>Full PAID</h2>
          <span>{fullPaidCount}</span>
        </div>
        <div>
          <i className="text-red-700 fa fa-times-circle"></i>
          <h2>Default</h2>
          <span>{defaultCount}</span>
        </div>
      </div>


      <div className=" text-center flex flex-col items-center justify-center mt-5">
        <h2>Overall Status</h2>
        <div className="w-[400px]">
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
};

export default OperationDashboard;

import React, { useEffect, useState } from "react";
import API from "../API";
import axios from "axios";

const ManagerDashBoard = () => {
  const [operationData, setOperationData] = useState(null);
  const fetchOperationData = async () => {
    try {
      const response = await axios.get(`${API}/getnewstudentenroll`);
      setOperationData(response.data);
      console.log("manager dashboard page data ",response.data);
    } catch (err) {
      console.log("Failed to fetch user data");
    }
  };
  useEffect(() => {
    fetchOperationData();
  }, []);

  const groupAndCalculateData = (data) => {
    return data.reduce((acc, item) => {
      if (!acc[item.counselor]) {
        acc[item.counselor] = {
          totalRevenue: 0,
          paidAmount: 0,
          booked: 0,
          paid: 0,
          defaultAmount: 0,  // Added defaultAmount for clarity
        };
      }
      
      acc[item.counselor].totalRevenue += item.programPrice;
      
      // Handling status calculations correctly
      if (item.status === "default") {
        acc[item.counselor].defaultAmount += item.paidAmount; // Fixed: added defaultAmount
      }
      if (item.status === "booked") {
        acc[item.counselor].booked += item.paidAmount;
      }
      if (item.status === "fullPaid") {
        acc[item.counselor].paid += item.paidAmount;
      }
  
      return acc;
    }, {});
  };
  
  if (!operationData) {
    return <div id="loader">
    <div class="three-body">
  <div class="three-body__dot"></div>
  <div class="three-body__dot"></div>
  <div class="three-body__dot"></div>
  </div>
  </div>;
  }
  
  const groupedData = groupAndCalculateData(operationData);
  const sortedData = Object.entries(groupedData).sort((a, b) => b[1].totalRevenue - a[1].totalRevenue);

  return (
    <div id="AdminDashboard">
      <h2 className="text-center font-semibold mb-2">Manager's DashBoard</h2>
     <div className="numberdiv">
     <div className="">
        <i className="text-yellow-500 fa fa-calendar"></i>
        <h2>Booked</h2>
        <span>{operationData?.filter((item) => item.status === "booked").length}</span>
      </div>
      <div>
        <i className="text-green-700	fa fa-money"></i>
        <h2>Full PAID</h2>
        <span>
          {operationData?.filter((item) => item.status === "fullPaid").length}
        </span>
      </div>
      <div>
        <i className="text-red-700 fa fa-times-circle"></i>
        <h2>Default</h2>
        <span>
          {operationData?.filter((item) => item.status === "default").length}
        </span>
      </div>
     </div>
     <table className="counselor-table">
    <caption>Counselor Wise Revenue</caption>
    <thead>
      <tr>
        <th>Sl.No</th>
        <th>Counselor Name</th>
        <th>Total Revenue</th>
        <th>Booked</th>
        <th>Pending Amount</th>
        <th>Credited Amount</th>
        <th>Default Amount</th>
      </tr>
    </thead>
    <tbody>
      {sortedData.map(([counselorName, counselor], index) => (
        <tr key={counselorName}>
          <td>{index + 1}</td>
          <td>{counselorName}</td>
          <td>₹{counselor.totalRevenue}</td>
          <td>₹{counselor.booked}</td>
          <td>₹{counselor.totalRevenue - (counselor.paid + counselor.booked)}</td>
          <td>₹{counselor.paid}</td>
          <td>₹{counselor.defaultAmount}</td>
        </tr>
      ))}
    </tbody>
  </table>
    </div>
  );
};

export default ManagerDashBoard;

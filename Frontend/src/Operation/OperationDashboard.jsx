import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import { Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

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

  if (!operationData) {
    return (
      <div id="loader">
        <div className="three-body">
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
        </div>
      </div>
    );
  }

  // Calculations for booked, full paid, and default counts
  const bookedCount = operationData.filter(
    (item) => item.status === "booked"
  ).length;
  const fullPaidCount = operationData.filter(
    (item) => item.status === "fullPaid"
  ).length;
  const defaultCount = operationData.filter(
    (item) => item.status === "default"
  ).length;

  // Revenue Calculation Logic
  const revenueByMonth = operationData.reduce((acc, item) => {
    const month = new Date(item.createdAt).toLocaleString("default", { month: "long", year: "numeric" });

    if (!acc[month]) {
      acc[month] = { totalRevenue: 0 };
    }

    if (item.status === "booked" || item.status === "default") {
      acc[month].totalRevenue += item.paidAmount; // Only paid amount is revenue
    } else if (item.status === "fullPaid") {
      acc[month].totalRevenue += item.programPrice; // Full program price is revenue
    }

    return acc;
  }, {});

  // Get the last 2 months data
  const sortedMonths = Object.keys(revenueByMonth).sort((a, b) =>
    new Date(`1 ${a}`) - new Date(`1 ${b}`)
  );
  const lastTwoMonths = sortedMonths.slice(-2);
  const revenueData = lastTwoMonths.map((month) => ({
    month,
    revenue: revenueByMonth[month]?.totalRevenue || 0,
  }));

  // Data for Line Chart
  const lineChartData = {
    labels: revenueData.map((data) => data.month),
    datasets: [
      {
        label: "Revenue Growth (₹)",
        data: revenueData.map((data) => data.revenue),
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

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

     <div className="w-full flex items-center justify-center flex-wrap my-5 py-2">
     <div className="text-center flex flex-col items-center justify-center">
        <h2>Overall Status</h2>
        <div className="w-[400px]">
          <Pie data={data} />
        </div>
      </div>

      <div className="text-center flex flex-col items-center justify-center">
        <h2>Revenue Growth</h2>
        <div className="w-[600px]">
          <Line data={lineChartData} />
        </div>
      </div>
     </div>
    </div>
  );
};

export default OperationDashboard;

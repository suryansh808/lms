import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";

const AllTeamDetail = () => {
  const [detailVisible, setDetailVisible] = useState(false);
  const [allData, setAllData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedBda, setSelectedBda] = useState(null);

  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  const fetchAllData = async () => {
    try {
      const response = await axios.get(`${API}/bda-with-enrolls`);
      setAllData(response.data);
    } catch (error) {
      console.error("There was an error fetching all Data:", error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Function to group enrollments by date (last 7 days only)
  const groupByDate = (enrollments) => {
    const result = {};
    const today = new Date();
    const last10Days = new Date();
    last10Days.setDate(today.getDate() - 9); // 10-day range

    enrollments.forEach((item) => {
      const date = new Date(item.createdAt).toISOString().split("T")[0]; // Extract YYYY-MM-DD
      const itemDate = new Date(date);

      // Filter only last 10 days
      if (itemDate >= last10Days && itemDate <= today) {
        if (!result[date]) {
          result[date] = { count: 0, total: 0, credited: 0 };
        }
        result[date].count++;
        result[date].total += item.programPrice || 0;
        result[date].credited += item.paidAmount || 0;
      }
    });

    return Object.entries(result).map(([date, values]) => ({
      date,
      count: values.count,
      total: values.total,
      credited: values.credited,
    }));
  };


  // Function to group enrollments by month (current and previous month only)
  const groupByMonth = (enrollments) => {
    const result = {};
    const today = new Date();
    const currentMonth = today.toISOString().slice(0, 7); // YYYY-MM
    const prevMonth1 = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().slice(0, 7);
    const prevMonth2 = new Date(today.getFullYear(), today.getMonth() - 2, 1).toISOString().slice(0, 7);
    const prevMonth3 = new Date(today.getFullYear(), today.getMonth() - 3, 1).toISOString().slice(0, 7);

    enrollments.forEach((item) => {
      const month = new Date(item.createdAt).toISOString().slice(0, 7); // Extract YYYY-MM

      // Filter only the last 3 months
      if ([currentMonth, prevMonth1, prevMonth2, prevMonth3].includes(month)) {
        if (!result[month]) {
          result[month] = { count: 0, total: 0, credited: 0 };
        }
        result[month].count++;
        result[month].total += item.programPrice || 0;
        result[month].credited += item.paidAmount || 0;
      }
    });

    return Object.entries(result).map(([month, values]) => ({
      month,
      count: values.count,
      total: values.total,
      credited: values.credited,
    }));
  };



  const selectedBdaDetail = (bda) => {
    setSelectedBda(bda);
    setDetailVisible(true);
    console.log(bda);
    setDailyRevenue(groupByDate(bda.enrollments));
    setMonthlyRevenue(groupByMonth(bda.enrollments));
  };

  const resetData = () => {
    setSelectedBda(null);
    setDetailVisible(false);
  };

  const filteredData = selectedTeam ? allData.filter((bda) => bda.team === selectedTeam) : allData;

  return (
    <div id="AdminAddCourse">
      {/* selected bda detail */}
      {detailVisible && selectedBda && (
        <div className="form" >
          <div className="p-2 rounded-lg mx-auto bg-white w-fit" >
            <div className="flex justify-between">
              <strong>{selectedBda.fullname}</strong>
              <strong onClick={resetData} className=" text-red-500 " style={{ cursor: 'pointer' }}>EXIT</strong>
            </div>
            <u>Daily Revenue</u>
            <table className="bdarevenuetable">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>No of Booked</th>
                  <th>Total Revenue</th>
                  <th>Credited</th>
                  <th>Pending</th>
                </tr>
              </thead>
              <tbody>
                {dailyRevenue.length > 0 ? (
                  dailyRevenue.map((data, index) => (
                    <tr key={index}>
                      <td>{data.date}</td>
                      <td>{data.count}</td>
                      <td>₹ {data.total}</td>
                      <td>₹ {data.credited}</td>
                      <td>₹ {data.total - data.credited} </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5">No Data</td></tr>
                )}
              </tbody>
            </table>

            <u>Monthly Revenue</u>
            <table className="bdarevenuetable" >
              <thead>
                <tr>
                  <th>Month</th>
                  <th>No of Booked</th>
                  <th>Total Revenue</th>
                  <th>Credited</th>
                  <th>Pending</th>
                </tr>
              </thead>
              <tbody>
                {monthlyRevenue.length > 0 ? (
                  monthlyRevenue.map((data, index) => (
                    <tr key={index}>
                      <td>{data.month}</td>
                      <td>{data.count}</td>
                      <td>₹ {data.total}</td>
                      <td>₹ {data.credited}</td>
                      <td>₹ {data.total - data.credited}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5">No Data</td></tr>
                )}
              </tbody>
            </table>
            <u>ALL Revenue</u>
            <table className="bdarevenuetable" >
              <thead>
                <tr>
                  <th>No of Booked</th>
                  <th>Total Revenue</th>
                  <th>Credited</th>
                  <th>Pending</th>
                </tr>
              </thead>
              <tbody>
                {selectedBda.enrollments.length > 0 ? (
                  <tr>
                    <td>{selectedBda.enrollments.length}</td>
                    <td>₹ {selectedBda.enrollments.reduce((sum, item) => sum + (item.programPrice || 0), 0)}</td>
                    <td>₹ {selectedBda.enrollments.reduce((sum, item) => sum + (item.paidAmount || 0), 0)}</td>
                    <td>₹ {selectedBda.enrollments.reduce((sum, item) => sum + (item.programPrice || 0), 0) -
                      selectedBda.enrollments.reduce((sum, item) => sum + (item.paidAmount || 0), 0)}
                    </td>
                  </tr>

                ) : (
                  <tr><td colSpan="4">No Data</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="coursetable">
        <h2>Team Details</h2>
        <div className="mb-2">
          <h2>{selectedTeam} </h2>
            <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
            <option value="">All Team</option>
              <option value="BEAST">BEAST</option>
              <option value="GLADIATOR">GLADIATOR</option>
              <option value="TITAN">TITAN</option>
              <option value="WARRIOR">WARRIOR</option>
              <option value="NO TEAM">NO TEAM</option>
            </select>

        </div>
        <table border="1">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Team</th>
              <th>Total</th>
              <th>Full Paid</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((bda, index) => (
              <tr key={index} className="hover:bg-slate-100">
                <td>{index + 1}</td>
                <td style={{ color: 'blue', cursor: 'pointer' }} onClick={() => selectedBdaDetail(bda)} >{bda.fullname}</td>
                <td>{bda.email}</td>
                <td>{bda.designation}</td>
                <td>{bda.team}</td>
                <td>{bda.enrollments.length}</td>
                <td>{bda.enrollments.filter((item) => item.status === "fullPaid").length}</td>
                <td>{bda.enrollments.filter((item) => item.status === "default").length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTeamDetail;

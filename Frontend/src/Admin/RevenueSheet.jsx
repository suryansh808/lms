import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../API";

const RevenueSheet = () => {
  const [newStudent, setNewStudent] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNewStudent = async () => {
    try {
      const response = await axios.get(`${API}/getnewstudentenroll`);
      setNewStudent(response.data);
    } catch (err) {
      setError("There was an error fetching new students.");
      console.error("Error fetching new students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewStudent();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const revenueByDay = {};
  const revenueByMonth = {};
  let totalRevenue = 0;

  newStudent.forEach((student) => {
    const date = new Date(student.createdAt).toLocaleDateString("en-GB");
    const month = new Date(student.createdAt).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    const revenue = student.programPrice || 0;
    const booked = student.paidAmount || 0;
    const credited = student.status === "fullPaid" || (Array.isArray(student.remark) && student.remark[student.remark.length - 1] === "Half_Cleared") ? student.paidAmount || 0 : 0;
    const pending = revenue - credited;


    if (!revenueByDay[date]) {
      revenueByDay[date] = { total: 0, booked: 0, credited: 0, pending: 0, payments:0,  paymentsByLead: { CGFL: 0, SGFL: 0 }, month };
    }
    if (!revenueByMonth[month]) {
      revenueByMonth[month] = { total: 0, booked: 0, credited: 0, pending: 0 , payments:0 ,paymentsByLead: { CGFL: 0, SGFL: 0 } };
    }

    revenueByDay[date].total += revenue;
    revenueByDay[date].booked += booked;
    revenueByDay[date].credited += credited;
    revenueByDay[date].pending += pending;
    revenueByDay[date].payments += 1;

    revenueByMonth[month].total += revenue;
    revenueByMonth[month].booked += booked;
    revenueByMonth[month].credited += credited;
    revenueByMonth[month].pending += pending;

    revenueByMonth[month].payments += 1;

    // Count payment based on student.lead
if (student.lead === "CGFL") {
  revenueByDay[date].paymentsByLead.CGFL += 1;
  revenueByMonth[month].paymentsByLead.CGFL += 1;
} else if (student.lead === "SGFL") {
  revenueByDay[date].paymentsByLead.SGFL += 1;
  revenueByMonth[month].paymentsByLead.SGFL += 1;
}

    totalRevenue += revenue;
  });

  const months = Object.keys(revenueByMonth).sort((a, b) => new Date(b) - new Date(a));
  const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" });
  const filteredDailyRevenue = Object.entries(revenueByDay).filter(
    ([, data]) => data.month === (selectedMonth || currentMonth)
  );



  return (
    <div className="p-6 ml-[270px] mx-auto">
      <h2 className="text-center  font-bold mb-6">Operation Revenue Sheet</h2>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Daily Revenue</h2>
        <div className="mb-4">
          <label className="font-semibold">Select Month: </label>
          <select
            className="border p-2 rounded"
            value={selectedMonth || currentMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value={currentMonth}>Current Month ({currentMonth})</option>
            {months
              .filter((month) => month !== currentMonth)
              .map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left">Date</th>
                <th className="border p-3 text-left">Total Revenue</th>
                <th className="border p-3 text-left">Credited Revenue</th>
                <th className="border p-3 text-left">Pending Revenue</th>
                <th className="border p-3 text-left">Total No Of Payments</th>
                 <th className="border p-3 text-left">CGFL Payments</th>
                 <th className="border p-3 text-left">SGFL Payments</th>
              </tr>
            </thead>
            <tbody>
              {filteredDailyRevenue.map(([date, data], index) => (
                <tr key={date} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="border p-3">{date}</td>
                  <td className="border p-3">₹{data.total.toFixed(2)}</td>
                  <td className="border p-3">₹{data.credited.toFixed(2)}</td>
                  <td className="border p-3">₹{data.pending.toFixed(2)}</td>
                  <td className="border p-3">{revenueByDay[date].payments}</td>
                  <td className="border p-3">{data.paymentsByLead?.CGFL || 0}</td>
                  <td className="border p-3">{data.paymentsByLead?.SGFL || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Monthly Revenue</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left">Month</th>
                <th className="border p-3 text-left">Total Revenue</th>
                <th className="border p-3 text-left">Credited Revenue</th>
                <th className="border p-3 text-left">Pending Revenue</th>
                <th className="border p-3 text-left">Total No Of Payments</th>
                <th className="border p-3 text-left">CGFL Payments</th>
                <th className="border p-3 text-left">SGFL Payments</th>
              </tr>
            </thead>
            <tbody>
              {months.map((month, index) => (
                <tr key={month} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="border p-3">{month}</td>
                  <td className="border p-3">₹{revenueByMonth[month].total.toFixed(2)}</td>
                  <td className="border p-3">₹{revenueByMonth[month].credited.toFixed(2)}</td>
                  <td className="border p-3">₹{revenueByMonth[month].pending.toFixed(2)}</td>
                  <td className="border p-3">{revenueByMonth[month].payments}</td>
                  <td className="border p-3">{revenueByMonth[month].paymentsByLead?.CGFL || 0}</td>
                  <td className="border p-3">{revenueByMonth[month].paymentsByLead?.SGFL || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="text-lg font-semibold">
        <h2 className="text-xl font-semibold mb-2">Total Revenue Till Now</h2>
        <p className="mb-2">
          <strong>Total Revenue:</strong> ₹{totalRevenue.toFixed(2)}
        </p>

        {/* {growthPercentage !== null && (
          <p className={growthPercentage >= 0 ? "text-green-600" : "text-red-600"}>
            {growthPercentage >= 0 ? "Growth" : "Loss"}: {growthPercentage.toFixed(2)}%
          </p>
        )} */}
      </section>
    </div>
  );
};

export default RevenueSheet;

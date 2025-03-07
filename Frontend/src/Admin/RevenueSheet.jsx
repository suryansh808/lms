import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../API";

const RevenueSheet = () => {
  const [payment, setPayment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchNewStudent = async () => {
    try {
      const response = await axios.get(`${API}/getnewstudentenroll`);
      setPayment(response.data);
    } catch (error) {
      console.error("There was an error fetching new student:", error);
    }
  };

  useEffect(() => {
    fetchNewStudent();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [payment]);

  const revenueByDay = {};
  const revenueByMonth = {};
  let totalRevenue = 0;

  payment.forEach((student) => {
    const date = new Date(student.createdAt).toLocaleDateString("en-GB");
    const month = new Date(student.createdAt).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    const revenue = student.programPrice || 0;
    const credited = (student.paidAmount || 0) - (student.defaultAmount || 0);
    const pending = revenue - credited;

    if (!revenueByDay[date]) {
      revenueByDay[date] = { total: 0, credited: 0, pending: 0 };
    }
    if (!revenueByMonth[month]) {
      revenueByMonth[month] = { total: 0, credited: 0, pending: 0 };
    }

    revenueByDay[date].total += revenue;
    revenueByDay[date].credited += credited;
    revenueByDay[date].pending += pending;

    revenueByMonth[month].total += revenue;
    revenueByMonth[month].credited += credited;
    revenueByMonth[month].pending += pending;

    totalRevenue += revenue;
  });
  // pagination code here
  const sortedRevenueDays = Object.entries(revenueByDay)
    .map(([date, data]) => ({ date, ...data }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const totalPages = Math.ceil(sortedRevenueDays.length / itemsPerPage);
  const paginatedData = sortedRevenueDays.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const months = Object.keys(revenueByMonth);
  months.sort((a, b) => new Date(a) - new Date(b));

  let growthPercentage = null;
  if (months.length > 1) {
    const lastMonth = revenueByMonth[months[months.length - 2]].total || 0;
    const currentMonth = revenueByMonth[months[months.length - 1]].total || 0;
    if (lastMonth > 0) {
      growthPercentage = ((currentMonth - lastMonth) / lastMonth) * 100;
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-center text-3xl font-bold mb-6">Revenue Sheet</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Monthly Revenue</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-2">
            <thead>
              <tr className="">
                <th className="border p-3 text-left">Month</th>
                <th className="border p-3 text-left">Total Revenue</th>
                <th className="border p-3 text-left">Credited Revenue</th>
                <th className="border p-3 text-left">Pending Revenue</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(revenueByMonth).map(([month, data], index) => (
                <tr
                  key={month}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="border p-3">{month}</td>
                  <td className="border p-3">₹{data.total.toFixed(2)}</td>
                  <td className="border p-3">₹{data.credited.toFixed(2)}</td>
                  <td className="border p-3">₹{data.pending.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Daily Revenue</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="">
                <th className="border p-3 text-left">Date</th>
                <th className="border p-3 text-left">Total Revenue</th>
                <th className="border p-3 text-left">Credited Revenue</th>
                <th className="border p-3 text-left">Pending Revenue</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((data, index) => (
                <tr
                  key={data.date}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="border p-3">{data.date}</td>
                  <td className="border p-3">₹{data.total.toFixed(2)}</td>
                  <td className="border p-3">₹{data.credited.toFixed(2)}</td>
                  <td className="border p-3">₹{data.pending.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 border rounded ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next
          </button>
        </div>
      </section>

      <section className="text-lg font-semibold">
        <h2 className="text-xl font-semibold mb-2">Total Revenue Till Now</h2>
        <p className="mb-2">
          <strong>Total Revenue:</strong> ₹{totalRevenue.toFixed(2)}
        </p>
        {growthPercentage !== null && (
          <p
            className={
              growthPercentage >= 0 ? "text-green-600" : "text-red-600"
            }
          >
            {growthPercentage >= 0 ? "Growth" : "Loss"}:{" "}
            {growthPercentage.toFixed(2)}%
          </p>
        )}
      </section>
    </div>
  );
};

export default RevenueSheet;

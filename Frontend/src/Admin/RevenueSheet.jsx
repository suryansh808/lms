import React, { useState, useEffect} from "react";
import axios from "axios";
import API from "../API";
const RevenueSheet = () => {
 const [payment, setPayment] = useState([]);
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
  return (
    <div>
    {(() => {
        // Group payments by month and calculate revenue and status-specific amounts
        const revenueByMonth = payment.reduce((acc, item) => {
            const month = new Date(item.createdAt).toLocaleString("default", { month: "long", year: "numeric" });
            if (!acc[month]) {
                acc[month] = { totalRevenue: 0, booked: 0, credited: 0, defaulted: 0 };
            }

            if (item.status === "booked") {
                acc[month].booked += item.paidAmount; // Only the paid amount is revenue for booked
                acc[month].totalRevenue += item.paidAmount;
            } else if (item.status === "fullPaid") {
                acc[month].credited += item.programPrice; // Full program price is revenue for fullPaid
                acc[month].totalRevenue += item.programPrice;
            } else if (item.status === "default") {
                acc[month].defaulted += item.paidAmount; // Only the paid amount is revenue for default
                acc[month].totalRevenue += item.paidAmount;
            }

            return acc;
        }, {});

        // Convert grouped data into an array of sorted months
        const sortedMonths = Object.keys(revenueByMonth).sort((a, b) =>
            new Date(`1 ${a}`) - new Date(`1 ${b}`)
        );

        // Split into groups of 3 months
        const groupedData = [];
        for (let i = 0; i < sortedMonths.length; i += 3) {
            groupedData.push(sortedMonths.slice(i, i + 3));
        }

        // Render each group
        return groupedData.map((group, groupIndex) => {
            let prevRevenue = null;

            return (
                <div key={groupIndex} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
                    <h2>Group {groupIndex + 1}</h2>
                    {group.map((month, index) => {
                        const { totalRevenue, booked, credited, defaulted } = revenueByMonth[month];
                        let growthPercentage = null;

                        if (prevRevenue !== null) {
                            growthPercentage = ((totalRevenue - prevRevenue) / prevRevenue) * 100;
                        }

                        prevRevenue = totalRevenue;

                        return (
                            <div key={index} style={{ marginBottom: "10px" }}>
                                <h3>{month}</h3>
                                <p>Total Revenue: ₹{totalRevenue.toFixed(2)}</p>
                                {growthPercentage !== null && (
                                    <p style={{ color: growthPercentage >= 0 ? "green" : "red" }}>
                                        {growthPercentage >= 0 ? "Growth" : "Loss"}: {growthPercentage.toFixed(2)}%
                                    </p>
                                )}
                                <p>Booked Revenue: ₹{booked.toFixed(2)}</p>
                                <p>Credited Revenue (Full Paid): ₹{credited.toFixed(2)}</p>
                                <p>Defaulted Revenue: ₹{defaulted.toFixed(2)}</p>
                            </div>
                        );
                    })}
                </div>
            );
        });
    })()}
</div>



  )
}

export default RevenueSheet

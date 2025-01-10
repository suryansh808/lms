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
                acc[month] = { totalRevenue: 0, credited: 0, defaulted: 0, booked: 0 };
            }

            acc[month].totalRevenue += item.paidAmount;

            // Add amounts based on status
            if (item.status === "fullPaid") {
                acc[month].credited += item.paidAmount;
            } else if (item.status === "default") {
                acc[month].defaulted += item.paidAmount;
            } else if (item.status === "booked") {
                acc[month].booked += item.paidAmount;
            }

            return acc;
        }, {});

        // Convert the grouped data into an array of sorted months
        const sortedMonths = Object.keys(revenueByMonth).sort((a, b) =>
            new Date(`1 ${a}`) - new Date(`1 ${b}`)
        );

        // Split into groups of 3 months
        const groupedData = [];
        for (let i = 0; i < sortedMonths.length; i += 3) {
            groupedData.push(sortedMonths.slice(i, i + 3));
        }

        return groupedData.map((group, groupIndex) => (
            <div key={groupIndex} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
                <h2>Group {groupIndex + 1}</h2>
                {group.map((month, index) => {
                    const { totalRevenue, credited, defaulted, booked } = revenueByMonth[month];
                    return (
                        <div key={index}>
                            <h3>{month}</h3>
                            <p>Total Revenue: ${totalRevenue.toFixed(2)}</p>
                            <p>Credited Amount (Full Paid): ${credited.toFixed(2)}</p>
                            <p>Defaulted Amount: ${defaulted.toFixed(2)}</p>
                            <p>Booked Amount: ${booked.toFixed(2)}</p>
                        </div>
                    );
                })}
            </div>
        ));
    })()}
</div>


  )
}

export default RevenueSheet

import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../API";

const BBookedPayment = () => {
 const [newStudent, setNewStudent] = useState([]);
 const fetchNewStudent = async () => {
  const bdaName = localStorage.getItem("bdaName")
  try {
    const response = await axios.get(`${API}/getnewstudentenroll`);
    setNewStudent(response.data.filter((item)=>item.counselor === bdaName && item.status === "booked"));
  } catch (error) {
    console.error("There was an error fetching new student:", error);
  }
};
  useEffect(() => {
    fetchNewStudent();
  }, []);

  return (
    <div id="AdminAddCourse">
      <div className="coursetable">
        <h1>Booked Payment</h1>
        <div></div>
        <table>
          <thead>
            <tr>
              <th>Sl</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Mode of Program</th>
              <th>Operation Name</th>
              <th>Opted Domain</th>
              <th>Program Price</th>
              <th>Paid Amount </th>
              <th>Pending </th>
              <th>Month Opted</th>
              <th>Due Date</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            {
              Array.isArray(newStudent) && newStudent?.length > 0 ? (
            newStudent?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td className="capitalize">{item.fullname}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td className="capitalize">{item.program}</td>
                <td className="capitalize">{item.operationName}</td>
                <td className="capitalize">{item.domain}</td>
                <td>{item.programPrice}</td>
                <td>{item.paidAmount}</td>
                <td>{item.programPrice - item.paidAmount}</td>
                <td className="capitalize">{item.monthOpted}</td>
                <td className="whitespace-nowrap">{item.clearPaymentMonth}</td>
                <td>
                  {item.remark[item.remark.length - 1]}
                </td>
              </tr>
            ))) : <tr><td colSpan="14">No data found</td></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BBookedPayment;

import axios from "axios";
import React, { useState, useEffect} from "react";
import API from "../API";

const FullPaymentList = () => {
  const [newStudent, setNewStudent] = useState([]);
  const fetchNewStudent = async () => {
    // const operationId = localStorage.getItem("operationId");
    try {
      const response = await axios.get(`${API}/getnewstudentenroll`);
      setNewStudent(
        response.data.filter(
          (item) => item.status === "fullPaid"
        )
      );
    } catch (error) {
      console.error("There was an error fetching new student:", error);
    }
  };
  useEffect(() => {
    fetchNewStudent();
  }, []);

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
    <div id="AdminAddCourse">
      <div className="coursetable">
      <h1>Full Payments </h1>
      <table>
        <thead>
          <tr>
            <th>Sl</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Mode of Program</th>
            <th>Counselor Name</th>
            <th>Opted Domain</th>
            <th>Program Price</th>
            <th>Paid Amount </th>
            <th>Pending </th>
            <th>Month Opted</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(newStudent) && newStudent.length > 0 ? (
            newStudent.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td className="capitalize">{item.fullname}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td className="capitalize">{item.program}</td>
                <td className="capitalize">{item.counselor}</td>
                <td className="capitalize">{item.domain}</td>
                <td>{item.programPrice}</td>
                <td>{item.paidAmount}</td>
                <td>{item.programPrice - item.paidAmount}</td>
                <td className="capitalize">{item.monthOpted}</td>
                <td className="whitespace-nowrap">{item.clearPaymentMonth}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="14">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
     
    </div>
  );
};

export default FullPaymentList;

import axios from "axios";
import React, { useState, useEffect } from "react";
import API from "../API";
const BookedList = () => {
  const [newStudent, setNewStudent] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchNewStudent = async () => {
    const operationId = localStorage.getItem("operationId");
    try {
      const response = await axios.get(`${API}/getnewstudentenroll`, {
        params: { operationId },
      });
      const studentsData = response.data.filter((item) => item.status === "booked");
      setNewStudent(studentsData);
      setFilteredStudents(studentsData);
    } catch (error) {
      console.error("There was an error fetching new student:", error);
    }
  };
  useEffect(() => {
    fetchNewStudent();
  }, []);
  const handleStatusChange = async (studentId, action) => {
    try {
      let updatedData = {};
     const isConfirmedFullPaid = window.confirm("Are you sure you want to change?")
       if(isConfirmedFullPaid){
        if (action === "fullPaid") {
          updatedData = { status: "fullPaid" };
        }
        else if (action === "default") {
          updatedData = { status: "default" };
        }   
       } 
        await axios.post(`${API}/updateStudentStatus`, {
        studentId,
        ...updatedData,
      });
      fetchNewStudent();
    } catch (error) {
      console.error("Error updating status:", error);
    }
       
   
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    const filtered = newStudent.filter((student) =>
      student.email.toLowerCase().includes(value.toLowerCase()) ||
      student.phone.toLowerCase().includes(value.toLowerCase()) ||
      student.fullname.toLowerCase().includes(value.toLowerCase()) ||
      student.counselor.toLowerCase().includes(value.toLowerCase())||
      student.operationName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  return (
    <div id="AdminAddCourse">
      <div className="coursetable">
      <div className="mb-2">
      <h2>Booked Lists </h2>
      <input
        type="type"
        placeholder="Search here "
        value={searchQuery}
        onChange={handleSearchChange}
        className="border border-black px-2 py-1 rounded-lg"
      />
    </div>
       
        <table>
          <thead>
            <tr>
              <th>Sl</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Mode of Program</th>
              <th>Counselor Name</th>
              <th>Op.Name</th>
              <th>Opted Domain</th>
              <th>Program Price</th>
              <th>Paid Amount </th>
              <th>Pending </th>
              <th>Month Opted</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredStudents) && filteredStudents.length > 0 ? (
              filteredStudents.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td className="capitalize">{item.fullname}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td className="capitalize">{item.program}</td>
                  <td className="capitalize">{item.counselor}</td>
                  <td className="capitalize">{item.operationName}</td>
                  <td>{item.domain}</td>
                  <td>{item.programPrice}</td>
                  <td>{item.paidAmount}</td>
                  <td>{item.programPrice - item.paidAmount}</td>
                  <td className="capitalize">{item.monthOpted}</td>
                  <td className="whitespace-nowrap">{item.clearPaymentMonth}</td>
                  <td>
                    <button
                      onClick={() => handleStatusChange(item._id, "fullPaid")}
                    >
                     Paid
                    </button>
                    <button
                      onClick={() => handleStatusChange(item._id, "default")}
                    >
                      Default
                    </button>
                  </td>
                  <td>
                    {<ul>
                      {item.remark.map((item, index) => (
                        <li key={index}>{index + 1}, {item}</li>
                      ))}
                     </ul>}
                     </td>
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
export default BookedList;

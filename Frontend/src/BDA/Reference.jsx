import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../API";

const Reference = () => {
   const [newStudent, setNewStudent] = useState([]);
  const fetchNewStudent = async () => {
    const bdaName = localStorage.getItem("bdaName")
    try {
      const response = await axios.get(`${API}/databybdaname`,{
        params: { bdaName },
      });
      setNewStudent(response.data);
    } catch (error) {
      console.error("There was an error fetching new student:", error);
    }
  };
  useEffect(() => {
    fetchNewStudent();
  }, []);

  return (
    <div>
         <h2 className="text-center my-2 font-bold">Reference by your Leads</h2>
      {newStudent.length === 0 ? (
        <p>No data available</p>
      ) : (
        <table className="bdarevenuetable">
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Refer Friend</th>
            </tr>
          </thead>
          <tbody>
            {newStudent.map((student, index) => {
              if (student.referFriend && student.referFriend.length > 10) {
                return (
                  <tr key={index}>
                    <td>{newStudent.filter((s) => s.referFriend && s.referFriend.length > 10).indexOf(student) + 1}</td>
                    <td>{student.fullname}</td>
                    <td>{student.phone}</td>
                    <td>{student.referFriend}</td>
                  </tr>
                );
              }return null;
              
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Reference

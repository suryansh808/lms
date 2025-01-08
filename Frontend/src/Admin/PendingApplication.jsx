import React, { useState, useEffect } from "react";
import API from "../API";
import axios from "axios";

const PendingApplication = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API}/users`);
      setUsers(response.data.filter((user) => user.status === "inactive"));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleActiveNow = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to active the user?")
    if(isConfirmed){
      try {
        await axios.put(`${API}/users/${id}`, { status: "active" });
        fetchUsers();
      }
      catch (error) {
        console.error("Error activating user:", error);
      }
    }
  }

  if(!users){
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
      <h1>Inactive Users List</h1>
      <table>
        <thead>
          <tr>
            <th>Sl</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Password</th>
            <th>Status</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {
          users.length > 0 ? (
            users?.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>{user.password}</td>
                <td>{user.status}</td>
                <td>
                  <button onClick={()=> handleActiveNow(user._id)}>Active now</button>
                </td>
              </tr>
            ))
          ):(
            <tr>
              <td colSpan="7">no inactive users</td>
            </tr>
          )
          }
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default PendingApplication;

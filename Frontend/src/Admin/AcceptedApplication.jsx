import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../API";

const AcceptedApplication = () => {
  const [users, setUsers] = useState([]);
  const [iscourseFormVisible, setiscourseFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = formData._id;
    try {
      await axios.put(`${API}/users/${id}`, formData);
      alert("User updated successfully");
      fetchUsers();
      resetForm();
    } catch (error) {
      console.error("Error creating user:", error);
      alert("User already exsist . Please try again.");
    }
  };
  const handleEdit = (user) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to edit the user details?"
    );
    if (isConfirmed) {
      const userToEdit = users.find((users) => users._id === user);
      setFormData(userToEdit);
      setiscourseFormVisible(true);
    }
  };
  const resetForm = () => {
    setiscourseFormVisible(false);
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API}/users`);
      setUsers(response.data.filter((user) => user.status === "active"));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleActiveNow = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to inactive this user?"
    );
    if (isConfirmed) {
      try {
        await axios.put(`${API}/users/${id}`, { status: "inactive" });
        fetchUsers();
      } catch (error) {
        console.error("Error activating user:", error);
      }
    }
  };

  useEffect(() => {
    if (users) {
      setLoading(false);
    }
  }, [users]);

  return (
    <div id="AdminAddCourse">
      {iscourseFormVisible && (
        <div className="form">
          <form onSubmit={handleSubmit}>
            <span onClick={resetForm}>✖</span>
            <h1>Edit user</h1>
            <input
              type="text"
              name="fullName"
              placeholder="Candidate Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Candidate Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Candidate contact no"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <input className="cursor-pointer" type="submit" value="Save" />
          </form>
        </div>
      )}
      <div className="coursetable">
        <h1>Active Users List</h1>
        {loading ? (
          <div id="loader">
            <div class="three-body">
              <div class="three-body__dot"></div>
              <div class="three-body__dot"></div>
              <div class="three-body__dot"></div>
            </div>
          </div>
        ) : (
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
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.password}</td>
                    <td>{user.status}</td>
                    <td>
                      <button onClick={() => handleActiveNow(user._id)}>
                        Inactive now
                      </button>
                      <button onClick={() => handleEdit(user._id)}>Edit</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">no active users</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AcceptedApplication;

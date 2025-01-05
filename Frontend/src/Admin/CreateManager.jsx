import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../API";

const Createmanager = () => {
  const [iscourseFormVisible, setiscourseFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
  });
  const [manager, setmanager] = useState(null);
  const [editingmanagerId, setEditingmanagerId] = useState(null);

  const toggleVisibility = () => {
    setiscourseFormVisible((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newmanager = {
      fullname: formData.fullname,
      email: formData.email,
    };
    try {
      if (editingmanagerId) {
        const response = await axios.put(
          `${API}/updatemanager/${editingmanagerId}`,
          newmanager
        );
        alert("manager updated successfully");
      } else {
        const response = await axios.post(
          `${API}/createmanager`,
          newmanager
        );
        alert("manager created successfully");
      }
      fetchmanager();
      resetForm();
    } catch (error) {
      alert("There was an error while creating or updating the manager");
      console.error("Error creating or updating manager", error);
    }
  };

  const fetchmanager = async () => {
    try {
      const response = await axios.get(`${API}/getmanager`);
      setmanager(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("There was an error fetching manager:", error);
    }
  };

  useEffect(() => {
    fetchmanager();
  }, []);

  const resetForm = () => {
    setFormData({
      fullname: "",
      email: "",
    });
    setEditingmanagerId(null);
    setiscourseFormVisible(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete the manager account?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(`${API}/deletemanager/${id}`);
        alert("manager deleted successfully");
        fetchmanager();
      } catch (error) {
        alert("There was an error deleting the manager");
        console.error("Error deleting manager", error);
      }
    }
  };

  const handleEdit = (manager) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to edit the manager details?"
    );
    if (isConfirmed) {
      setFormData({
        fullname: manager.fullname,
        email: manager.email,
      });
      setEditingmanagerId(manager._id);
      setiscourseFormVisible(true);
    }
  };

  return (
    <div id="AdminAddCourse">
      {iscourseFormVisible && (
        <div className="form">
          <form onSubmit={handleSubmit}>
            <h1>
              {editingmanagerId
                ? "Edit manager Account"
                : "Create manager Account"}
            </h1>
            <span onClick={resetForm}>✖</span>
            <input
              value={formData.fullname}
              onChange={handleChange}
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Enter full Name"
              required
            />
            <input
              value={formData.email}
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              placeholder="Enter email id"
              required
            />

            <input
              className=" cursor-pointer"
              type="submit"
              value={editingmanagerId ? "Update Account" : "Create Account"}
            />
          </form>
        </div>
      )}

      <div className="coursetable">
        <div>
        <h1>Manager Accounts List:</h1>
          <span onClick={toggleVisibility}>+ Add New manager</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Full Name</th>
              <th>Email</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {manager?.map((manager, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{manager.fullname}</td>
                <td>{manager.email}</td>

                <td>
                  <button onClick={() => handleDelete(manager._id)}>
                    Delete
                  </button>
                  <button onClick={() => handleEdit(manager)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Createmanager;

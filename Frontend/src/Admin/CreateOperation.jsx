import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../API";
import toast ,{Toaster} from 'react-hot-toast';

const CreateOperation = () => {
  const [iscourseFormVisible, setiscourseFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password:""
  });
  const [operation, setOperation] = useState(null);
  const [editingOperationId, setEditingOperationId] = useState(null);

  const toggleVisibility = () => {
    setiscourseFormVisible((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newOperation = {
      fullname: formData.fullname.trim(),
      email: formData.email.trim(),
      password: formData.password.trim()
    };
    try {
      if (editingOperationId) {
        const response = await axios.put(
          `${API}/updateoperation/${editingOperationId}`,
          newOperation
        );
        toast.success("Operation updated successfully");
      } else {
        const response = await axios.post(
          `${API}/createoperation`,
          newOperation
        );
        toast.success("Operation created successfully");
      }
      fetchOperation();
      resetForm();
    } catch (error) {
      toast.error("There was an error while creating or updating the operation");
      console.error("Error creating or updating operation", error);
    }
  };

  const fetchOperation = async () => {
    try {
      const response = await axios.get(`${API}/getoperation`);
      setOperation(response.data);
    } catch (error) {
      console.error("There was an error fetching operation:", error);
    }
  };

  useEffect(() => {
    fetchOperation();
  }, []);

  if(!operation){
    return <div id="loader">
    <div class="three-body">
  <div class="three-body__dot"></div>
  <div class="three-body__dot"></div>
  <div class="three-body__dot"></div>
  </div>
  </div>;
 }

  const resetForm = () => {
    setFormData({
      fullname: "",
      email: "",
      password: ""
    });
    setEditingOperationId(null);
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
      "Are you sure you want to delete the operation account?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(`${API}/deleteoperation/${id}`);
        alert("Operation deleted successfully");
        fetchOperation();
      } catch (error) {
        alert("There was an error deleting the operation");
        console.error("Error deleting operation", error);
      }
    }
  };

  const handleEdit = (operation) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to edit the operation details?"
    );
    if (isConfirmed) {
      setFormData({
        fullname: operation.fullname,
        email: operation.email,
        password: operation.password
      });
      setEditingOperationId(operation._id);
      setiscourseFormVisible(true);
    }
  };

 const handleSendEmail = async (value) => {
  const emailData = {
    fullname: value.fullname,
    email: value.email,
  };
  try {
    const response = await axios.post(`${API}/sendmailtooperation`, emailData);
    if (response.status === 200) {
      toast.success('Email sent successfully!');
      const operationData = {
        mailSended: true,
      };
      const updateResponse = await axios.put(`${API}/mailsendedoperation/${value._id}`, operationData);
      if (updateResponse.status === 200) {
        toast.success('Operation record updated successfully!');
      } else {
        toast.error('Failed to update student record.');
      }
    }
     else {
      toast.error('Failed to send email.');
    }
  } catch (error) {
    toast.error('An error occurred while sending the email.');
  }
  fetchOperation();
};



  return (
    <div id="AdminAddCourse">
        <Toaster position="top-center" reverseOrder={false}/>
      {iscourseFormVisible && (
        <div className="form">
          <form onSubmit={handleSubmit}>
            <h2>
              {editingOperationId
                ? "Edit Operation Account"
                : "Create Operation Account"}
            </h2>
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
            <input type="text" placeholder="Create password" name="password" id="password" value={formData.password} onChange={handleChange} required />

            <input
              className=" cursor-pointer"
              type="submit"
              value={editingOperationId ? "Update Account" : "Create Account"}
            />
          </form>
        </div>
      )}

      <div className="coursetable">
        <div>
        <h1>Operation Accounts List:</h1>
          <span onClick={toggleVisibility}>+ Add New Operation</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Full Name</th>
              <th>Email</th>
               <th>Password</th>
              <th>Action</th>
              <th>Send Login Credentials</th>
            </tr>
          </thead>
          <tbody>
            {operation?.map((operation, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{operation.fullname}</td>
                <td>{operation.email}</td>
                 <td>{operation.password}</td>
                <td>
                  <button onClick={() => handleDelete(operation._id)}>
                    Delete
                  </button>
                  <button onClick={() => handleEdit(operation)}>Edit</button>
                </td>
                <td>
                  <div
                  className=" cursor-pointer"
                    onClick={() => handleSendEmail(operation)}
                    disabled={operation.mailSended}
                  >
                    {operation.mailSended ? <i class="fa fa-send-o text-green-600"></i> : <i class="fa fa-send-o text-red-600"></i>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateOperation;

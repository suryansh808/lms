import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
const CreateBDA = () => {
  const [iscourseFormVisible, setiscourseFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [bda, setBda] = useState([]);
  const [editingBdaId, setEditingBdaId] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleVisibility = () => {
    setiscourseFormVisible((prevState) => !prevState);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    const newBda = {
      fullname: formData.fullname,
      email: formData.email,
      password: formData.password,
    };
    try {
      if (editingBdaId) {
        const response = await axios.put(
          `${API}/updatebda/${editingBdaId}`,
          newBda
        );
        toast.success("BDA updated successfully!");
      } else {
        const response = await axios.post(` ${API}/createbda`, newBda);
        toast.success("BDA created successfully!");
      }
      resetForm();
      fetchBda();
    } catch (error) {
      toast.error("There was an error while creating or updating the bda");
      console.error("There was an error submitting the bda:", error);
    }
  };
  const fetchBda = async () => {
    try {
      const response = await axios.get(`${API}/getbda`);
      setBda(response.data);
      console.log(bda);
    } catch (error) {
      console.error("There was an error fetching bda:", error);
    }
  };

  useEffect(() => {
    fetchBda();
  }, []);

  const resetForm = () => {
    setFormData({
      fullname: "",
      email: "",
      password: "",
    });
    setEditingBdaId(null);
    setiscourseFormVisible(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDelete = (_id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete the BDA account?"
    );
    if (isConfirmed) {
      axios
        .delete(`${API}/deletebda/${_id}`)
        .then((response) => {
          fetchBda();
        })
        .catch((error) => {
          console.error("There was an error deleting the bda:", error);
        });
    }
  };
  const handleEdit = (bdaId) => {
    setFormData({
      fullname: bdaId.fullname,
      email: bdaId.email,
      password: bdaId.password,
    });
    setEditingBdaId(bdaId._id);
    setiscourseFormVisible(true);
  };

  const handleSendEmail = async (value) => {
    const emailData = {
      fullname: value.fullname,
      email: value.email,
    };
    try {
      const response = await axios.post(`${API}/sendmailtobda`, emailData);
      if (response.status === 200) {
        toast.success("Email sent successfully!");
        const bdaData = {
          mailSended: true,
        };
        const updateResponse = await axios.put(
          `${API}/mailsendedbda/${value._id}`,
          bdaData
        );
        if (updateResponse.status === 200) {
          toast.success("BDA record updated successfully!");
        } else {
          toast.error("Failed to update Bda record.");
        }
      } else {
        toast.error("Failed to send email.");
      }
    } catch (error) {
      toast.error("An error occurred while sending the email.");
    }
    fetchBda();
  };

  useEffect(() => {
    if (bda) {
      setLoading(false);
    }
  }, [bda]);

  return (
    <div id="AdminAddCourse">
      <Toaster position="top-center" reverseOrder={false} />
      {iscourseFormVisible && (
        <div className="form">
          <form onSubmit={handleSumbit}>
            <span onClick={resetForm}>✖</span>
            <h2>{editingBdaId ? "Edit BDA Account" : "Create BDA Account"}</h2>
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
              type="text"
              value={formData.password}
              onChange={handleChange}
              required
              name="password"
              id="password"
              placeholder="Create password"
            />

            <input
              className="cursor-pointer"
              type="submit"
              value={editingBdaId ? "Edit Account" : "Create Account"}
            />
          </form>
        </div>
      )}
      <div className="coursetable">
        <div>
          <h1>BDA's List:</h1>
          <span onClick={toggleVisibility}>+ Add New BDA</span>
        </div>
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
                <th>Sl.No</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Action</th>
                <th>Send Login Credentials</th>
              </tr>
            </thead>
            <tbody>
              {bda.map((bda, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{bda.fullname}</td>
                  <td>{bda.email}</td>
                  <td>{bda.password}</td>
                  <td>
                    <button onClick={() => handleDelete(bda._id)}>
                      Delete
                    </button>
                    <button onClick={() => handleEdit(bda)}>Edit</button>
                  </td>
                  <td>
                    <div
                      className=" cursor-pointer"
                      onClick={() => handleSendEmail(bda)}
                      disabled={bda.mailSended}
                    >
                      {bda.mailSended ? (
                        <i class="fa fa-send-o text-green-600"></i>
                      ) : (
                        <i class="fa fa-send-o text-red-600"></i>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CreateBDA;

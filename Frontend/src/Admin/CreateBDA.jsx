import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";

const CreateBDA = () => {
  const [iscourseFormVisible, setiscourseFormVisible] = useState(false);
  const [formData, setFormData] = useState({
     fullname: "",
     email: "",
   
   });
  const [bda, setBda] = useState([]);
  const [editingBdaId, setEditingBdaId] = useState(null);

  const toggleVisibility = () => {
    setiscourseFormVisible((prevState) => !prevState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      fullname: "",
      email: "",
     
    });
    setEditingBdaId(null);
    setiscourseFormVisible(false);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    const newBda = {
      fullname: formData.fullname,
      email: formData.email,
     
    };
    try {
      if (editingBdaId) {
        const response = await axios.put(
          `${API}/updatebda/${editingBdaId}`,
          newBda
        );
        alert("BDA updated successfully!");
       
      } else {
        const response = await axios.post(` ${API}/createbda`, newBda);
        alert("BDA created successfully!");
        
      }
      resetForm();
      fetchBda();
    } catch (error) {
      console.error("There was an error submitting the bda:", error);
    }
  };
  const fetchBda = async () => {
    try {
      const response = await axios.get(`${API}/getbda`);
      setBda(response.data);
      console.log(bda)
    } catch (error) {
      console.error("There was an error fetching bda:", error);
    }
  };
  const handleDelete = (_id) => {
   const isConfirmed =  window.confirm("Are you sure you want to delete the BDA account?");
     if(isConfirmed){
      axios.delete(`${API}/deletebda/${_id}`)
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
    
    });
    setEditingBdaId(bdaId._id);
    setiscourseFormVisible(true);
  };
  useEffect(() => {
    fetchBda();
  }, []);

  return (
    <div id="AdminAddCourse">
      {iscourseFormVisible && (
        <div className="form">
          <form onSubmit={handleSumbit}>
            <span onClick={resetForm}>✖</span>
            <h1>{editingBdaId ? "Edit BDA Account" : "Create BDA Account"}</h1>
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
       
            <input className="cursor-pointer" type="submit" value={editingBdaId ? "Edit Account" : "Create Account"} />
          </form>
        </div>
      )}
      <div className="coursetable">
        <div>
        <h1>BDA's List:</h1>
          <span onClick={toggleVisibility}>+ Add New BDA</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Full Name</th>
              <th>Email</th>
            
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bda.map((bda, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{bda.fullname}</td>
                <td>{bda.email}</td>
             
                <td>
                  <button onClick={() => handleDelete(bda._id)}>
                    Delete
                  </button>
                  <button onClick={() => handleEdit(bda)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CreateBDA

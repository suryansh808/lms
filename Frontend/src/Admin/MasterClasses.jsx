
import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";

const MasterClasses = () => {
  const [isFormVisible, setisFormVisible] = useState(false);
  const [editClassId, setEditClassId] = useState(null);
  const [allMasterClass, setAllMasterClass] = useState([]);
  const [selectedMC, setSelectedMC] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    start: "",
    end: "",
    link: "",
    image: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      start: "",
      end: "",
      link: "",
      image: "",
    });
    setEditClassId(null);
    setisFormVisible(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editClassId) {
        const response = await axios.put(`${API}/masterclass/${editClassId}`, formData);
        toast.success("MasterClass updated successfully");
      } else {
        const response = await axios.post(`${API}/addmasterclass`, formData);
        toast.success("MasterClass created successfully");
      }
      fetchMasterclass();
      resetForm();
    } catch (error) {
      toast.error(
        "There was an error while creating or updating the MasterClass"
      );
      console.error("Error creating or updating MasterClass", error);
    }
  };


  const fetchMasterclass = async () => {
    try {
      const response = await axios.get(`${API}/allmasterclass`);
      setAllMasterClass(response.data);
    } catch (error) {
      console.error("There was an error fetching MasterClass:", error);
    }
  };

  const handleEdit = (masterclass) => {
    const isConfirmed = window.confirm("Are you sure you want to edit the Master Class?");
    if (isConfirmed) {
      setFormData({
        title: masterclass.title,
        start: new Date(masterclass.start).toISOString().slice(0, 16),
        end: new Date(masterclass.end).toISOString().slice(0, 16),
        link: masterclass.link,
        image: masterclass.image,
      });
      setEditClassId(masterclass._id);
      setisFormVisible(true);
    }
  };

  const handleStatusChange = async (e, id) => {
    const newStatus = e.target.value;

    try {
      const response = await axios.put(`${API}/masterclass/${id}`, { status: newStatus });
      console.log(response.data.message);
      fetchMasterclass();
    } catch (error) {
      console.error("Error updating status:", error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this MasterClass?");
    if (!isConfirmed) return;
    try {
      const response = await axios.delete(`${API}/masterclass/${id}`);
      toast.success("MasterClass deleted successfully!");
      fetchMasterclass();
    } catch (error) {
      toast.error("Error deleting MasterClass");
      console.error("Delete Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchMasterclass();
  }, []);

  return (
    <div id="AdminAddCourse">
      <Toaster position="top-center" reverseOrder={false} />
      {isFormVisible && (
        <div className="form">
          <form onSubmit={handleSubmit}>
            <h2>{editClassId ? "Edit MasterClass" : "Add New MasterClass"}</h2>
            <span onClick={resetForm}>✖</span>
            <input
              value={formData.title}
              onChange={handleChange}
              type="text"
              name="title"
              id="title"
              placeholder="Enter Masterclass title"
              required
            />
            <label htmlFor="start" className="text-gray-500">
              Select Start Date and Time
            </label>
            <input
              value={formData.start}
              onChange={handleChange}
              type="datetime-local"
              name="start"
              id="start"
              required
            />
            <label htmlFor="end" className="text-gray-500">
              Select End Date and Time
            </label>
            <input
              type="datetime-local"
              name="end"
              id="end"
              value={formData.end}
              onChange={handleChange}
              required
            />
            <input
              type="url"
              name="link"
              id="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="Enter Whatsapp group link"
              required
            />
            <input
              type="text"
              name="image"
              id="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter Image url"
              required
            />
            <input
              className="cursor-pointer"
              type="submit"
              value={editClassId ? "Update Master Class" : "Create Master Class"}
            />
          </form>
        </div>
      )}

      {selectedMC && (
        <div className="jobdetails">
          <div className="jobdetailsdiv">
            <div className="title">
              <h2>{selectedMC.title}</h2>
              < span onClick={() => setSelectedMC(null)} >✖</span>
            </div>
            <div className="title">
            <a className="text-black" href={selectedMC.link} target="_blank" rel="noopener noreferrer">{selectedMC.link}</a>
              <input type="search" name="" id="" />
            </div>
          
            
            <table>
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Student's College Email</th>
                  <th>Number</th>
                </tr>
              </thead>
              <tbody>
                {selectedMC.applications?.map((application, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{application.name}</td>
                    <td>{application.email}</td>
                    <td>{application.clgemail}</td>
                    <td>{application.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="coursetable">
        <div>
          <h2>MasterClass List</h2>
          <button className="p-2 border border-black rounded-md" onClick={() => setisFormVisible(true)}> + Add MasterClass</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Title</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Applicant</th>
              <th>Status</th>
              <th>Action</th>
              <th>Change Status</th>
            </tr>
          </thead>
          <tbody>
            {allMasterClass?.map((masterclass, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{masterclass.title}</td>
                <td>{new Date(masterclass.start).toLocaleString('en-US', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true})}</td>
                <td>{new Date(masterclass.end).toLocaleString('en-US', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true})}</td>
                <td className="applicationclick" onClick={() => setSelectedMC(masterclass)} >{masterclass.applications.length}</td>
                <td>{masterclass.status}</td>
                <td>
                  <button ><i class="fa fa-edit" onClick={() => handleEdit(masterclass)}></i></button>
                  <button onClick={() => handleDelete(masterclass._id)}><i class="fa fa-trash-o text-red-600"></i></button>
                </td>
                <td>
                  <select
                    className="border rounded-full border-black p-1"
                    onChange={(e) => handleStatusChange(e, masterclass._id)}
                    defaultValue="Select Remark"
                  >
                    <option disabled value="Select Remark"> Select Remark</option>
                    <option value="upcoming"> UPCOMING</option>
                    <option value="ongoing">ONGOING</option>
                    <option value="completed">COMPLETED</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default MasterClasses;

import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";

const AddEvent = () => {
  const [isFormVisible, setisFormVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [selectedMC, setSelectedMC] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    start: "",
    question: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      start: "",
      question: "",
    });
    setEditId(null);
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
      if (editId) {
        const response = await axios.put(
          `${API}/allevents/${editId}`,
          formData
        );
        toast.success("MasterClass updated successfully");
      } else {
        const response = await axios.post(`${API}/addevent`, formData);
        toast.success("Event Added successfully");
      }
      fetchEvent();
      resetForm();
    } catch (error) {
      toast.error(
        "There was an error while creating or updating the Event. Please try again."
      );
      console.error("Error creating or updating Event", error);
    }
  };

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`${API}/allevents`);
      setAllEvents(response.data);
    } catch (error) {
      console.error("There was an error fetching MasterClass:", error);
    }
  };

  const handleEdit = (events) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to edit the event?"
    );
    if (isConfirmed) {
      setFormData({
        title: events.title,
        start: new Date(events.start).toISOString().slice(0, 16),
        question: events.question,
      });
      setEditId(events._id);
      setisFormVisible(true);
    }
  };

//   const handleStatusChange = async (e, id) => {
//     const newStatus = e.target.value;

//     try {
//       const response = await axios.put(`${API}/masterclass/${id}`, {
//         status: newStatus,
//       });
//       console.log(response.data.message);
//       fetchMasterclass();
//     } catch (error) {
//       console.error(
//         "Error updating status:",
//         error.response?.data?.message || error.message
//       );
//     }
//   };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!isConfirmed) return;
    try {
      const response = await axios.delete(`${API}/allevents/${id}`);
      toast.success("Event deleted successfully!");
      fetchEvent();
    } catch (error) {
      toast.error("Error deleting Event");
      console.error("Delete Error:", error.response?.data || error.message);
    }
  };


  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <div id="AdminAddCourse">
      <Toaster position="top-center" reverseOrder={false} />
      {isFormVisible && (
        <div className="form">
          <form onSubmit={handleSubmit}>
            <h2>{editId ? "Edit Event" : "Add Event"}</h2>
            <span onClick={resetForm}>✖</span>
            <input
              value={formData.title}
              onChange={handleChange}
              type="text"
              name="title"
              id="title"
              placeholder="Enter Event title"
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
            <textarea
              required
              placeholder="Enter Question and Answer"
              name="question"
              id="question"
              cols="30"
              value={formData.question}
              onChange={handleChange}
              rows="10"
            ></textarea>
            <input
              className="cursor-pointer"
              type="submit"
              value={editId ? "Update Event" : "Create Event"}
            />
          </form>
        </div>
      )}

{selectedMC && (
  <div className="jobdetails">
  <div className="jobdetailsdiv">
    <div className="title">
      <h2>Question Details</h2>
      <span onClick={() => setSelectedMC(null)}>✖</span>
    </div>
    <table>
      <thead>
        <tr>
          <th>Sl</th>
          <th>Question</th>
          <th>Options</th>
          <th>Answer</th>
        </tr>
      </thead>
      <tbody>
        {selectedMC.questions.map((question, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{question.question}</td>
            <td>{question.options}</td>
            <td>{question.answer}</td>
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
          <button
            className="p-2 border border-black rounded-md"
            onClick={() => setisFormVisible(true)}
          >
            {" "}
            + Add Events
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Title</th>
              <th>Start Time</th>
              <th>Status</th>
              <th>Type</th>
              <th>Questions</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allEvents?.map((events, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{events.title}</td>
                <td>
                  {new Date(events.start).toLocaleString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td>{events.status}</td>
                <td>{events.type}</td>
                <td
                >
                  {events.question}
                </td>
                <td>
                  <button ><i class="fa fa-edit" onClick={() => handleEdit(events)}></i></button>
                  <button onClick={() => handleDelete(events._id)}><i class="fa fa-trash-o text-red-600"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AddEvent;

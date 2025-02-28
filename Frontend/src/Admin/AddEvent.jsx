import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";

const AddEvent = () => {
  const [isFormVisible, setisFormVisible] = useState(false);
  const [isQuestionFormVisible, setisQuestionFormVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [selectedEvent, setSetectedEvent] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    start: "",
    questions:[ 
      {
          question: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          answer: "",
        }
      ]  
  });

  const resetForm = () => {
    setFormData({
      title: "",
      start: "",
      questions: [
        {
          question: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          answer: "",
        }
      ]
    });
    setEditId(null);
    setisFormVisible(false);
    setisQuestionFormVisible(false);
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
      toast.error("There was an error while creating or updating the Event. Please try again.");
      console.error("Error creating or updating Event", error);
    }
  };

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`${API}/allevents`);
      setAllEvents(response.data);
      setSetectedEvent(response.data[0]);
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
      });
      setEditId(events._id);
      setisFormVisible(true);
    }
  };

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
    <div id="Event">
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
            <input
              className="cursor-pointer"
              type="submit"
              value={editId ? "Update Event" : "Create Event"}
            />
          </form>
        </div>
      )}
      
      {isQuestionFormVisible && (
        <div className="form">
          <form onSubmit={handleSubmit}>
            <h2>{editId ? "Edit Questions" : "Add Questions"}</h2>
            <span onClick={resetForm}>✖</span>
            <input
              value={formData.questions.question}
              onChange={handleChange}
              type="text"
              name="question"
              id="question"
              placeholder="Enter Question"
              required
            />
            <input
              value={formData.questions.option1}
              onChange={handleChange}
              type="text"
              name="option1"
              id="option1"
              placeholder="Enter Options 1"
              required
            />
            <input
              value={formData.questions.option2}
              onChange={handleChange}
              type="text"
              name="option2"
              id="option2"
              placeholder="Enter Options 2"
              required
            />
            <input
              value={formData.questions.option3}
              onChange={handleChange}
              type="text"
              name="option3"
              id="option3"
              placeholder="Enter Options 3"
              required
            />
            <input
              value={formData.questions.option4}
              onChange={handleChange}
              type="text"
              name="option4"
              id="option4"
              placeholder="Enter Options 4"
              required
            />
            <input
              value={formData.questions.answer}
              onChange={handleChange}
              type="text"
              name="answer"
              id="answer"
              placeholder="Enter Answer"
              required
            />
            <input
              className="cursor-pointer"
              type="submit"
              value={editId ? "Update Questions" : "Create Questions"}
            />
          </form>
        </div>
      )}

      <div className="coursetable">
        <div>
          <h2>Events List</h2>
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
              <th>Applied</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allEvents?.map((events, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td onClick={() => setSetectedEvent(events)}>{events.title}</td>
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
                <td>0</td>
                <td>
                  <button>
                    <i
                      class="fa fa-edit"
                      onClick={() => handleEdit(events)}
                    ></i>
                  </button>
                  <button onClick={() => handleDelete(events._id)}>
                    <i class="fa fa-trash-o text-red-600"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedEvent && (
      <div className="coursetable" >
        <div className="eventdetail">
          <h2>{selectedEvent.title}</h2>
          <h2>{selectedEvent.type}</h2>
          <button onClick={() => setisQuestionFormVisible(true)} className="p-1 flex items-center gap-2 border border-black rounded-md">
          <i class="fa fa-plus"></i> Add Question
          </button>
        </div>
        <div className="qanda">
          
        </div>
      </div>
      )}
    </div>
  );
};
export default AddEvent;

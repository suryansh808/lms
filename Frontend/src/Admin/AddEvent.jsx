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
  const [showAppliedDetails , setShowAppliedDetails] = useState(null)
  // const [appliedUsers , setAppliedUsers] = useState()

  const [form, setForm] = useState({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
  });

  const [formData, setFormData] = useState({
    title: "",
    start: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      start: "",
    });
    setForm({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
    })
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
  const handleChangeQuestions = (event) => {
    const { name, value } = event.target;
    setForm((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    console.log("Form Data:", formData);
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
      setSetectedEvent(response.data[0]);
    } catch (error) {
      console.error("There was an error fetching MasterClass:", error);
    }
  };

  // const fetchAppliedUsers = async () => {
  //   try {
  //     const response = await axios.get(`${API}/events-with-applications`);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("There was an error fetching MasterClass:", error);
  //   }
  // };

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
    // fetchAppliedUsers();
  }, []);
 
  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    const newQuestion = {
      question: form.question,
      option1: form.option1,
      option2: form.option2,
      option3: form.option3,
      option4: form.option4,
      answer: form.answer,
    };
    try {
      let response;
      if (editId) {
        response = await axios.put(
          `${API}/addquestions/${selectedEvent._id}/questions/${editId}`,
          newQuestion
        );
        toast.success("Question updated successfully");
      } else {
        response = await axios.put(
          `${API}/addquestions/${selectedEvent._id}`,
          newQuestion
        );
        toast.success("Question added successfully");
      }
      fetchEvent();
      resetForm();
    } catch (error) {
      toast.error(
        "There was an error while adding or updating the question. Please try again."
      );
      console.error("Error adding or updating the question", error);
    }
  };
  const handleDeleteQuestion = async (eventId, questionId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this question?");
    if (!isConfirmed) return; 
    try {
      const response = await axios.delete(`${API}/allevents/${eventId}/questions/${questionId}`);
      toast.success("Question deleted successfully!");
      fetchEvent();
    } catch (error) {
      toast.error("Error deleting question");
      console.error("Delete Error:", error.response?.data || error.message);
    }
  };
  const handleEditQuestion = (question) => {
    const isConfirmed = window.confirm("Are you sure you want to edit the event?");
    if (!isConfirmed) return;
    setForm({
        question: question.question,
        option1: question.option1,
        option2: question.option2,
        option3: question.option3,
        option4: question.option4,
        answer: question.answer,
    });
    setEditId(question._id);
    setisQuestionFormVisible(true);
  };



console.log(showAppliedDetails);
  
  
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
          <form onSubmit={handleSubmitQuestion}>
            <h2>{editId ? "Edit Questions" : "Add Questions"}</h2>
            <span onClick={resetForm}>✖</span>
            <input
              value={form.question}
              onChange={handleChangeQuestions}
              type="text"
              name="question"
              id="question"
              placeholder="Enter Question"
              required
            />
            <input
              value={form.option1}
              onChange={handleChangeQuestions}
              type="text"
              name="option1"
              id="option1"
              placeholder="Enter Options 1"
              required
            />
            <input
              value={form.option2}
              onChange={handleChangeQuestions}
              type="text"
              name="option2"
              id="option2"
              placeholder="Enter Options 2"
              required
            />
            <input
              value={form.option3}
              onChange={handleChangeQuestions}
              type="text"
              name="option3"
              id="option3"
              placeholder="Enter Options 3"
              required
            />
            <input
              value={form.option4}
              onChange={handleChangeQuestions}
              type="text"
              name="option4"
              id="option4"
              placeholder="Enter Options 4"
              required
            />
            <input
              value={form.answer}
              onChange={handleChangeQuestions}
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

     {showAppliedDetails && (
        <div className="jobdetails">
          <div className="jobdetailsdiv">
            <div className="title">
              <h2></h2>
              < span onClick={() => setShowAppliedDetails(null)} >✖</span>
            </div>  
            <span></span>
          </div>
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
        <div className="qanda">
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
          {allEvents?.map((events, index) => {
          const appliedCount = appliedUsers?.filter(user => user.eventId._id === events._id).length;
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td className=" cursor-pointer" onClick={() => setSetectedEvent(events)}>{events.title}</td>
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
          <td className=" cursor-pointer" onClick={() => setShowAppliedDetails(appliedUsers)}>{appliedCount}</td>
          <td>
            <button>
              <i
                className="fa fa-edit"
                onClick={() => handleEdit(events)}
              ></i>
            </button>
            <button onClick={() => handleDelete(events._id)}>
              <i className="fa fa-trash-o text-red-600"></i>
            </button>
          </td>
        </tr>
      );
    })}
          </tbody>
        </table>
        </div>
      </div>

      {selectedEvent && (
        <div className="coursetable">
          <div className="eventdetail">
            <h2>{selectedEvent.title}</h2>
            <h2>{selectedEvent.type}</h2>
            <button
              onClick={() => setisQuestionFormVisible(true)}
              className="p-1 flex items-center gap-2 border border-black rounded-md"
            >
              <i class="fa fa-plus"></i> Add Question
            </button>
          </div>
          <div className="qanda">
            {selectedEvent?.questions?.length ? (
              selectedEvent.questions.map((question, index) => (
                <div key={index}>
                  <p className="flex items-center gap-2">
                    {index + 1}. {question.question}
                    <div className="flex items-center gap-2">
                    <button>
                    <i
                      class="fa fa-edit"
                      onClick={() => handleEditQuestion(question)}
                    ></i>
                  </button>
                  <button onClick={() => handleDeleteQuestion(selectedEvent._id, question._id)}>
                    <i class="fa fa-trash-o text-red-600"></i>
                  </button>
                    </div>
                  </p>
                  <ul>
                    <li>Option1: {question.option1}</li>
                    <li>Option2: {question.option2}</li>
                    <li>Option3: {question.option3}</li>
                    <li>Option4: {question.option4}</li>
                  </ul>
                  <p>
                    <strong>Answer:</strong> {question.answer}
                  </p>
                </div>
              ))
            ) : (
              <p>No questions available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default AddEvent;

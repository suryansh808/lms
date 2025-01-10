import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import toast ,{Toaster} from 'react-hot-toast';

const BookedAmount = () => {
  const [iscourseFormVisible, setiscourseFormVisible] = useState(false);
  const resetForm = () => {
    setiscourseFormVisible(false);
    setFullname("");
    setEmail("");
    setPhone("");
    setProgram("");
    setCounselor("");
    setDomain("");
    setProgramPrice("");
    setPaidAmount("");
    setMonthOpted("");
    setClearPaymentMonth("");
  };
  const [course, setCourse] = useState([]);
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API}/getcourses`);
      setCourse(response.data);
    } catch (error) {
      console.error("There was an error fetching courses:", error);
    }
  };
  const [bda, setBda] = useState([]);
  const fetchBda = async () => {
    try {
      const response = await axios.get(`${API}/getbda`);
      setBda(response.data);
    } catch (error) {
      console.error("There was an error fetching courses:", error);
    }
  };
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState([]);
  const [counselor, setCounselor] = useState([]);
  const [domain, setDomain] = useState([]);
  const [programPrice, setProgramPrice] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [monthOpted, setMonthOpted] = useState("");
  const [clearPaymentMonth, setClearPaymentMonth] = useState("");
  const [newStudent, setNewStudent] = useState([]);
  const [editingStudentId, setEditingStudentId] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      fullname: fullname,
      email: email,
      phone: phone,
      program: program,
      counselor: counselor,
      domain: domain,
      programPrice: programPrice,
      paidAmount: paidAmount,
      monthOpted: monthOpted,
      clearPaymentMonth: clearPaymentMonth,
      operationName: operationData.fullname,
      operationId: operationData._id,
    };
    const minimalData = {
      fullName: fullname,
      email: email,
      phone: phone,
    };
    try {
      let response;
      let minimalResponse;
      if (editingStudentId) {
        response = await axios.put(
          `${API}/editstudentdetails/${editingStudentId}`,
          formData
        );
        minimalResponse = { status: 200 };
      } else {
         response = await axios.post(`${API}/newstudentenroll`, formData);
         minimalResponse = await axios.post(`${API}/users`, minimalData);
      }
      if ( (response.status === 200 || response.status === 201) &&
      (minimalResponse.status === 200 || minimalResponse.status === 201))
         {
          toast.success(
          editingStudentId
           ? "Student updated successfully"
          : "Form submitted successfully and minimal data saved"
        );
        fetchNewStudent();
        resetForm();
      } else {
        toast.error("Error submitting the form.");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form. or student already exists, Please try again .");
      
    }
  };

  const fetchNewStudent = async () => {
    const operationId = localStorage.getItem("operationId");
    try {
      const response = await axios.get(`${API}/getnewstudentenroll`, {
        params: { operationId },
      });
      setNewStudent(
        response.data.filter(
          (item) => item.operationId === operationId && item.status === "booked"
        )
      );
    } catch (error) {
      console.error("There was an error fetching new student:", error);
    }
  };
  const [remarks, setRemarks] = useState("");
  const handleRemark = async (event, studentId) => {
    event.preventDefault();
    const remarkData = {
      remark: remarks[studentId],
      studentId,
    };
    try {
      const response = await fetch(`${API}/updateremark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(remarkData),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success("Remark submitted successfully");
        setRemarks("");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting remark:", error);
    }
  };

  const handleEdit = (studentId) => {
    const isConfirmed = window.confirm("Are you sure you want to edit this?");
    if (isConfirmed) {
      const editStudent = newStudent.find((item) => item._id === studentId);
      setFullname(editStudent.fullname);
      setEmail(editStudent.email);
      setPhone(editStudent.phone);
      setProgram(editStudent.program);
      setCounselor(editStudent.counselor);
      setDomain(editStudent.domain);
      setProgramPrice(editStudent.programPrice);
      setPaidAmount(editStudent.paidAmount);
      setMonthOpted(editStudent.monthOpted);
      setClearPaymentMonth(editStudent.clearPaymentMonth);
      setEditingStudentId(studentId);
      setiscourseFormVisible(true);
    }
  };

  const [operationData, setOperationData] = useState(null);
  const fetchOperationData = async () => {
    const operationId = localStorage.getItem("operationId");
    try {
      const response = await axios.get(`${API}/getoperation`, {
        params: { operationId },
      });
      setOperationData(response.data);
    } catch (err) {
      console.log("Failed to fetch user data");
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchBda();
    fetchNewStudent();
    fetchOperationData();
  }, []);

  const handleSendEmail = async (value) => {
    const emailData = {
      fullname: value.fullname,
      email: value.email,
      program: value.program,
      counselor: value.counselor,
      domain: value.domain,
      clearPaymentMonth: value.clearPaymentMonth,
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
    fetchNewStudent();
  };
  
  if(!groupedData){
    return <div id="loader">
    <div class="three-body">
  <div class="three-body__dot"></div>
  <div class="three-body__dot"></div>
  <div class="three-body__dot"></div>
  </div>
  </div>;
 }

 const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

const groupedData = newStudent.reduce((acc, item) => {
  const date = formatDate(item.createdAt);
  if (!acc[date]) {
    acc[date] = [];
  }
  acc[date].push(item);
  return acc;
}, {});

  return (
    <div id="OperationEnroll">
      <Toaster position="top-center" reverseOrder={false}/>
      {iscourseFormVisible && (
        <div className="form">
          <form onSubmit={handleSubmit}>
            <span onClick={resetForm}>✖</span>
            <h1>
              {editingStudentId ? "Edit Student Details" : "Add New Student"}
            </h1>
            <input
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              type="text"
              placeholder="Candidate Full Name"
              required
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Candidate Email"
              required
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="Candidate contact no"
              required
            />
            <select
              value={program}
              onChange={(e) => setProgram(e.target.value)}
            >
              <option value="" selected disabled>
                {" "}
                Mode of Program
              </option>
              <option value="Self Placed">Self Placed</option>
              <option value="Mentor Leed">Mentor Led</option>
              <option value="Professional">Professional</option>
            </select>
            <select disabled={editingStudentId !== null}
              value={counselor}
              onChange={(e) => setCounselor(e.target.value)}
            >
              <option value="" selected disabled>
                Select Counselor name
              </option>
              {bda.map((item) => (
                <option value={item.fullname}>{item.fullname}</option>
              ))}
            </select>
            <select
            value={domain} onChange={(e) => setDomain(e.target.value)}>
              <option value="" selected disabled>
                Select Opted Domain
              </option>
              {course.map((item) => (
                <option value={item.title}>{item.title}</option>
              ))}
            </select>
            <input
              value={programPrice}
              onChange={(e) => setProgramPrice(e.target.value)}
              type="number"
              placeholder="Program Price"
              required
              disabled={editingStudentId !== null}
            />
            <input
              value={paidAmount}
              onChange={(e) => setPaidAmount(e.target.value)}
              type="number"
              placeholder="Paid Amount"
              required
            />
            <div>
              <input
                value={monthOpted}
                onChange={(e) => setMonthOpted(e.target.value)}
                type="text"
                placeholder="Month Opted"
                name=""
                id=""
                required
              />
            </div>
            <div>
              Due date for clear payment ?
              <input
                value={clearPaymentMonth}
                onChange={(e) => setClearPaymentMonth(e.target.value)}
                type="date"
                name=""
                id=""
                required
              />
            </div>
            <input
              className="cursor-pointer"
              type="submit"
              value={editingStudentId ? "Save" : "Submit"}
            />
          </form>
        </div>
      )}
      <div className="coursetable">
        <div className="mb-2">
        <h2>New Enroll Booking:  </h2>
          <span onClick={() => setiscourseFormVisible(true)}>
           + Add New Candidate 
          </span>
        </div>
        <table>
    <thead>
      <tr>
        <th>Sl No</th>
        <th>Full Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Program</th>
        <th>Counselor</th>
        <th>Domain</th>
        <th>Program Price</th>
        <th>Paid Amount</th>
        <th>Remaining Amount</th>
        <th>Month Opted</th>
        <th>Clear Payment Month</th>
        <th>Actions</th>
        <th>Remark</th>
        <th>Last Remark</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(groupedData).length > 0 ? (
        Object.keys(groupedData).map((date, groupIndex) => (
          <React.Fragment key={date}>
            {/* Render date row */}
            <tr>
              <td colSpan="16" style={{ fontWeight: "bold" }}>
             {date}
              </td>
            </tr>
            {/* Render student data rows */}
            {groupedData[date].map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td className="capitalize">{item.fullname}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td className="capitalize">{item.program}</td>
                <td className="capitalize">{item.counselor}</td>
                <td className="capitalize">{item.domain}</td>
                <td>{item.programPrice}</td>
                <td>{item.paidAmount}</td>
                <td>{item.programPrice - item.paidAmount}</td>
                <td className="capitalize">{item.monthOpted}</td>
                <td className="whitespace-nowrap">{item.clearPaymentMonth}</td>
                <td>
                  <button onClick={() => handleEdit(item._id)}>Edit</button>
                </td>
                <td>
                  <form
                    action=""
                    onSubmit={(e) => handleRemark(e, item._id)}
                  >
                    <input
                      type="text"
                      name="remark"
                      id="remark"
                      value={remarks[item._id] || ""}
                      onChange={(e) =>
                        setRemarks((prev) => ({
                          ...prev,
                          [item._id]: e.target.value,
                        }))
                      }
                      required
                      style={{ border: "1px solid" }}
                    />
                    <button>Submit</button>
                  </form>
                </td>
                <td>{item.remark[item.remark.length - 1]}</td>
                <td>
                  <div
                  className=" cursor-pointer"
                    onClick={() => handleSendEmail(item)}
                    disabled={item.mailSended}
                  >
                    {item.mailSended ? <i class="fa fa-send-o text-green-600"></i> : <i class="fa fa-send-o text-red-600"></i>}
                  </div>
                </td>
              </tr>
            ))}
          </React.Fragment>
        ))
      ) : (
        <tr>
          <td colSpan="17">No data found</td>
        </tr>
      )}
    </tbody>
  </table>
      </div>
    </div>
  );
};
export default BookedAmount;

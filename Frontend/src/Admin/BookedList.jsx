import axios from "axios";
import React, { useState, useEffect } from "react";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";

const BookedList = () => {
  const [newStudent, setNewStudent] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [iscourseFormVisible, setiscourseFormVisible] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const fetchNewStudent = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/getnewstudentenroll`);
      const studentsData = response.data.filter(
        (item) => item.status === "booked"
      );
      setNewStudent(studentsData);
      setFilteredStudents(studentsData);
    } catch (error) {
      console.error("There was an error fetching new student:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNewStudent();
  }, []);

  const handleStatusChange = async (studentId, action) => {
    try {
      let updatedData = {};
      const isConfirmedFullPaid = window.confirm(
        "Are you sure you want to change?"
      );
      if (isConfirmedFullPaid) {
        if (action === "fullPaid") {
          updatedData = { status: "fullPaid" };
        } else if (action === "default") {
          updatedData = { status: "default" };
        }
      }
      await axios.post(`${API}/updateStudentStatus`, {
        studentId,
        ...updatedData,
      });
      fetchNewStudent();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    const filtered = newStudent.filter((student) => {
      return (
        (student.email &&
          student.email.toLowerCase().includes(value.toLowerCase())) ||
        (student.phone &&
          student.phone.toLowerCase().includes(value.toLowerCase())) ||
        (student.fullname &&
          student.fullname.toLowerCase().includes(value.toLowerCase())) ||
        (student.counselor &&
          student.counselor.toLowerCase().includes(value.toLowerCase())) ||
        (student.operationName &&
          student.operationName.toLowerCase().includes(value.toLowerCase())) ||
        (student.createdAt &&
          student.createdAt.toLowerCase().includes(value.toLowerCase())) ||
        (student.clearPaymentMonth &&
          student.clearPaymentMonth.toLowerCase().includes(value.toLowerCase()))
      );
    });
    setFilteredStudents(filtered);
    setCurrentPage(1);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");
  const groupedData = paginatedStudents.reduce((acc, item) => {
    const date = formatDate(item.createdAt);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const handleDialogOpen = (item) => {
    setDialogData(item);
    setDialogVisible(true);
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
    setDialogData(null);
  };

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState([]);
  const [counselor, setCounselor] = useState([]);
  const [operationName, setOperationName] = useState("");
  const [operationId , setOperationId] = useState("");
  const [domain, setDomain] = useState([]);
  const [programPrice, setProgramPrice] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [monthOpted, setMonthOpted] = useState("");
  const [monthsToShow, setMonthsToShow] = useState([]);
  const [clearPaymentMonth, setClearPaymentMonth] = useState("");

  const handleEdit = (studentId) => {
    const isConfirmed = window.confirm("Are you sure you want to edit this?");
    if (isConfirmed) {
      const editStudent = newStudent.find((item) => item._id === studentId);
      setFullname(editStudent.fullname);
      setEmail(editStudent.email);
      setPhone(editStudent.phone);
      setProgram(editStudent.program);
      setCounselor(editStudent.counselor);
      setOperationName(editStudent.operationName);
      setDomain(editStudent.domain);
      setProgramPrice(editStudent.programPrice);
      setPaidAmount(editStudent.paidAmount);
      setMonthOpted(editStudent.monthOpted);
      setClearPaymentMonth(editStudent.clearPaymentMonth);
      setEditingStudentId(studentId);
      setiscourseFormVisible(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      fullname: fullname,
      email: email.trim(),
      phone: phone,
      program: program,
      counselor: counselor.trim(),
      domain: domain.trim(),
      programPrice: programPrice,
      paidAmount: paidAmount,
      monthOpted: monthOpted,
      clearPaymentMonth: clearPaymentMonth,
      operationName: operationName,
      operationId: operationId,
    };

    try {
      let response;
      if (editingStudentId) {
        response = await axios.put(
          `${API}/editstudentdetails/${editingStudentId}`,
          formData
        );
      }
      if (response && (response.status === 200 || response.status === 201)) {
        toast.success("Student updated successfully");
        fetchNewStudent();
        resetForm();
      } else {
        toast.error("Error submitting the form.");
      }
    } catch (error) {
      toast.error(
        "An error occurred while submitting the form. Please try again."
      );
    }
  };

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
    setEditingStudentId(null);
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
  const [operation, setOperation] = useState(null);
  const fetchOperation = async () => {
    try {
      const response = await axios.get(`${API}/getoperation`);
      setOperation(response.data);
    } catch (error) {
      console.error("There was an error fetching operation:", error);
    }
  };

  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const minDate = today.toISOString().split("T")[0];
    const maxDate = new Date(today.setDate(today.getDate() + 5))
      .toISOString()
      .split("T")[0];
    setMinDate(minDate);
    setMaxDate(maxDate);
  }, []);
  useEffect(() => {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let months = [];
    if (currentMonthIndex === 1 && currentDay <= 7) {
      months = [monthNames[1], monthNames[2], monthNames[3]];
    } else {
      months = [monthNames[2], monthNames[3], monthNames[4]];
    }
    setMonthsToShow(months);
  }, []);

  useEffect(() => {
    fetchCourses();
    fetchBda();
    fetchOperation();
  }, []);


  








  return (
    <div id="AdminAddCourse">
      <Toaster position="top-center" reverseOrder={false} />
      {iscourseFormVisible && (
        <div className="form">
          <form onSubmit={handleSubmit} className="space-y-5">
            <span onClick={resetForm}>✖</span>
            <h2>
              {editingStudentId
                ? "Edit Enrolled Details"
                : "Add New Enrollment"}
            </h2>
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
              type="number"
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
              <option value="Self-guided">Self-guided</option>
              <option value="Instructor Led">Instructor Led</option>
              <option value="Career Advancement">Career Advancement</option>
            </select>
            <select
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
              value={operationName}
              onChange={(e) => {
                const selectedOperation = operation.find(item => item.fullname === e.target.value);
                setOperationName(selectedOperation.fullname);
                setOperationId(selectedOperation._id);
              }}
            >
              <option value="" selected disabled>
                Select Operation name
              </option>
              {operation.map((item) => (
                <option value={item.fullname}>{item.fullname}</option>
              ))}
            </select>

            <select value={domain} onChange={(e) => setDomain(e.target.value)}>
              <option value="" selected disabled>
                Select Opted Domain
              </option>
              {course.map((item) => (
                <option value={item.title}>{item.title}</option>
              ))}
            </select>
            <select
              value={monthOpted}
              onChange={(e) => setMonthOpted(e.target.value)}
              required
            >
              <option value="" selected disabled>
                Select Opted Month
              </option>
              {monthsToShow.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <input
              value={programPrice}
              onChange={(e) => setProgramPrice(e.target.value)}
              type="number"
              placeholder="Program Price"
              required
            />
            <input
              value={paidAmount}
              onChange={(e) => setPaidAmount(e.target.value)}
              type="number"
              placeholder="Paid Amount"
              required
            />
            Due date for clear payment ?
            <input
              value={clearPaymentMonth}
              onChange={(e) => setClearPaymentMonth(e.target.value)}
              type="date"
              name=""
              id=""
              required
              min={minDate}
              max={maxDate}
            />
            <input
              className="cursor-pointer"
              type="submit"
              value={editingStudentId ? "Save" : "Submit"}
            />
          </form>
        </div>
      )}
      {loading ? (
        <div id="loader">
          <div class="three-body">
            <div class="three-body__dot"></div>
            <div class="three-body__dot"></div>
            <div class="three-body__dot"></div>
          </div>
        </div>
      ) : (
        <div className="coursetable">
          <div className="mb-2">
            <h2>Booked Lists </h2>
            <section className="flex items-center  gap-1">
              <div className="relative group inline-block">
                <i class="fa fa-info-circle text-lg cursor-pointer text-gray-500"></i>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full z-[9999] mb-2 hidden w-max bg-gray-800 text-white text-sm rounded-md py-2 px-3 group-hover:block">
                  Name, Email, Contact ,Counselor, Operation and Due date
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-t-8 border-gray-800 border-x-8 border-x-transparent"></div>
                </div>
              </div>
              <input
                type="text"
                placeholder="Search here by"
                value={searchQuery}
                onChange={handleSearchChange}
                className="border border-black px-2 py-1 rounded-lg"
              />
            </section>
          </div>

          <table>
            <thead>
              <tr>
                <th>Sl</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Domain</th>
                {/* <th>Program</th> */}
                <th>Month Opted</th>
                <th>Program Price</th>
                <th>Paid Amount </th>
                {/* <th>Pending </th> */}
                <th>BDA</th>
                <th>Operation</th>
                {/* <th>Due Date</th> */}
                <th>Status</th>
                <th>Remark</th>
                <th>More Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedData).length > 0 ? (
                Object.keys(groupedData).map((date) => (
                  <React.Fragment key={date}>
                    <tr>
                      <td colSpan="16" style={{ fontWeight: "bold" }}>
                        {date}
                      </td>
                    </tr>
                    {groupedData[date].map((item, index) => (
                      <tr
                        key={item._id}
                        className={`${item.remark[item.remark.length - 1]}`}
                      >
                        <td>{index + 1}</td>
                        <td className="capitalize">{item.fullname}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>{item.domain}</td>
                        {/* <td>{item.program}</td> */}
                        <td className="capitalize">{item.monthOpted}</td>
                        <td className="text-green-600 font-bold">
                          {item.programPrice}
                        </td>
                        <td>{item.paidAmount}</td>
                        {/* <td className="text-red-600 font-bold">{item.programPrice - item.paidAmount}</td> */}
                        <td>{item.counselor}</td>
                        <td>{item.operationName}</td>
                        {/* <td className="whitespace-nowrap">
                          {item.clearPaymentMonth}
                        </td> */}
                        <td>
                          <button
                            className="button"
                            onClick={() =>
                              handleStatusChange(item._id, "fullPaid")
                            }
                          >
                            <div className="relative group inline-block">
                              <i class="fa fa-money" aria-hidden="true"></i>
                              <div className="absolute left-1/2 -translate-x-1/2 bottom-full z-[9999] mb-2 hidden w-max bg-gray-800 text-white text-sm rounded-md py-2 px-3 group-hover:block">
                                FullPaid
                                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-t-8 border-gray-800 border-x-8 border-x-transparent"></div>
                              </div>
                            </div>
                          </button>
                          <button
                            className="button"
                            onClick={() =>
                              handleStatusChange(item._id, "default")
                            }
                          >
                            <div className="relative group inline-block">
                              <i class="fa fa-ban"></i>
                              <div className="absolute left-1/2 -translate-x-1/2 bottom-full z-[9999] mb-2 hidden w-max bg-gray-800 text-white text-sm rounded-md py-2 px-3 group-hover:block">
                                Default
                                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-t-8 border-gray-800 border-x-8 border-x-transparent"></div>
                              </div>
                            </div>
                          </button>
                        </td>
                        <td>
                          {
                            <ul>
                              {item.remark.map((item, index) => (
                                <li key={index}>
                                  {index + 1}, {item}
                                </li>
                              ))}
                            </ul>
                          }
                        </td>
                        <td>
                          <i
                            class="fa fa-info-circle text-2xl cursor-pointer"
                            onClick={() => handleDialogOpen(item)}
                          ></i>
                        </td>
                        <td>
                          <button onClick={() => handleEdit(item._id)}>
                            <i class="fa fa-edit"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="14">No data found</td>
                </tr>
              )}
            </tbody>
          </table>

           {/* Pagination */}
           {filteredStudents.length > itemsPerPage && (
            <section className="flex items-center justify-center gap-5 mt-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="border border-gray-700 px-2 py-1 rounded-lg active:bg-[#f15b29]"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < Math.ceil(filteredStudents.length / itemsPerPage)
                      ? prev + 1
                      : prev
                  )
                }
                disabled={
                  currentPage >=
                  Math.ceil(filteredStudents.length / itemsPerPage)
                }
                className="border border-gray-700 px-2 py-1 rounded-lg active:bg-[#f15b29]"
              >
                Next
              </button>
            </section>
          )}

          {dialogVisible && dialogData && (
            <div className="fixed flex flex-col rounded-md top-[30%] left-[50%] shadow-black shadow-sm transform translate-x-[-50%] transalate-y-[-50%] bg-white p-[20px] z-[1000]">
              <h2>Details</h2>
              <div className="space-y-2">
                {/* <p>
                <strong>Email:</strong> {dialogData.email}
              </p> */}
              <p>
                <strong>Due Date:</strong> {dialogData.clearPaymentMonth}
              </p>
                <p>
                  <strong>Program:</strong> {dialogData.program}
                </p>
                <p className="text-red-600 font-bold">
                  <strong>Pending:</strong>{" "}
                  {dialogData.programPrice - dialogData.paidAmount}
                </p>
                <p>
                  <strong> Alternative Email:</strong>{" "}
                  {dialogData.alternativeEmail}
                </p>
              </div>
              <button
                className="bg-black px-4 py-1 text-white rounded-md mt-2"
                onClick={handleDialogClose}
              >
                Close
              </button>
            </div>
          )}
          {dialogVisible && (
            <div
              onClick={handleDialogClose}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 999,
              }}
            ></div>
          )}
        </div>
      )}
    </div>
  );
};
export default BookedList;

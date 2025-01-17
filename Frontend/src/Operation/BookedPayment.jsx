import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import { PiLockKeyOpenFill , PiLockKeyFill } from "react-icons/pi";
import { SlEnvolopeLetter } from "react-icons/sl";
import { RiMailSendFill } from "react-icons/ri";


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
      email: email.trim(),
      phone: phone,
      program: program,
      counselor: counselor,
      domain: domain.trim(),
      programPrice: programPrice,
      paidAmount: paidAmount,
      monthOpted: monthOpted,
      clearPaymentMonth: clearPaymentMonth,
      operationName: operationData.fullname,
      operationId: operationData._id,
    };
    const minimalData = {
      fullName: fullname,
      email: email.trim(),
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
      if (
        (response.status === 200 || response.status === 201) &&
        (minimalResponse.status === 200 || minimalResponse.status === 201)
      ) {
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
      toast.error(
        "An error occurred while submitting the form. or student already exists, Please try again ."
      );
    }
  };

  const fetchNewStudent = async () => {
    const operationName = localStorage.getItem("operationName");
    try {
      const response = await axios.get(`${API}/getnewstudentenroll`);
      const bookedStudents = response.data.filter(
        (item) => item.status === "booked" && item.operationName === operationName
      );
      setNewStudent(bookedStudents);
      setFilteredStudents(bookedStudents);
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
    } finally {
      fetchNewStudent();
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
    const isConfirmed = window.confirm("Are you sure you want to send login credentials?");
    if(isConfirmed){
      if (value.isSending) return;
    value.isSending = true;
    const emailData = {
      fullname: value.fullname,
      email: value.email,
      program: value.program,
      counselor: value.counselor,
      domain: value.domain,
      clearPaymentMonth: value.clearPaymentMonth,
      monthOpted: value.monthOpted,
    };
    try {
      const response = await axios.post(`${API}/send-email`, emailData);
      if (response.status === 200) {
        toast.success("Email sent successfully!");
        const studentData = {
          mailSended: true,
        };
        const updateResponse = await axios.put(
          `${API}/mailsendedchange/${value._id}`,
          studentData
        );
        if (updateResponse.status === 200) {
          toast.success("Operation record updated successfully!");
        } else {
          toast.error("Failed to update student record.");
        }
      } else {
        toast.error("Failed to send email.");
      }
    } catch (error) {
      toast.error("An error occurred while sending the email.");
    } finally {
      fetchNewStudent();
      value.isSending = false;
    }
    }
  };

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

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    const filtered = newStudent.filter(
      (student) =>
        student.email.toLowerCase().includes(value.toLowerCase()) ||
        student.phone.toLowerCase().includes(value.toLowerCase()) ||
        student.fullname.toLowerCase().includes(value.toLowerCase()) ||
        student.counselor.toLowerCase().includes(value.toLowerCase()) ||
        student.operationName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

  const groupedData = filteredStudents.reduce((acc, item) => {
    const date = formatDate(item.createdAt);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  if (!groupedData) {
    return (
      <div id="loader">
        <div class="three-body">
          <div class="three-body__dot"></div>
          <div class="three-body__dot"></div>
          <div class="three-body__dot"></div>
        </div>
      </div>
    );
  }

  const handleAddNewCandidate = () => {
    resetForm();
    setEditingStudentId(null); 
    setiscourseFormVisible(true); 
  };


  //send onboarding mail
   const handleSendOnboardingDetails = async(value) =>{
    const isConfirmed = window.confirm("Are you sure you want to send onboading email?");
      if(isConfirmed){
        if (value.isSending) return;
        value.isSending = true;
        const emailData = {
          fullname: value.fullname,
          email: value.email,
          domain: value.domain,
          monthOpted: value.monthOpted,
          programPrice: value.programPrice,
          paidAmount: value.paidAmount,
        };
        try {
          const response = await axios.post(`${API}/sendedOnboardingMail`, emailData);
          if (response.status === 200) {
            toast.success("Onboarding email sent successfully!!");
            const onboardingData = {
              onboardingSended: true,
            };
            const updateResponse = await axios.put(
              `${API}/mailsendedchange/${value._id}`,
              onboardingData
            );
            if (updateResponse.status === 200) {
              toast.success("Onboarding Updated");
            } else {
              toast.error("Failed to update onboarding.");
            }
          } else {
            toast.error("Failed to send onboading email.");
          }
        } catch (error) {
          toast.error("An error occurred while sending the email.");
        } finally {
          fetchNewStudent();
          value.isSending = false;
        }
      }
   }

    //send offer letter
   const [file, setFile] = useState(null);
   const handleFileChange = (event) => {
     setFile(event.target.files[0]);
   };
   const handleSendOfferLetter = async (value)=>{
    const isConfirmed = window.confirm("Are you sure you want to send offer letter?");
    if(isConfirmed){
      if (value.isSending) return;
      value.isSending = true;

      if(!file){
        toast.error("Please select a file");
        return;
      }
      const formData = new FormData();
      formData.append('fullname', value.fullname);
      formData.append('email', value.email);
      formData.append('domain', value.domain);
      formData.append('monthOpted', value.monthOpted);
      formData.append('programPrice', value.programPrice);
      formData.append('paidAmount', value.paidAmount);
      formData.append('offerLetter', file);
         
      try {
        const response = await axios.post(`${API}/sendedOfferLetterMail`, formData);
        if (response.status === 200) {
          toast.success(" Offer Letter sent successfully!!");
          const offerLetterData = {
            offerLetterSended: true,
          };
          const updateResponse = await axios.put(
            `${API}/mailsendedchange/${value._id}`,
            offerLetterData
          );
          if (updateResponse.status === 200) {
            toast.success("Onboarding Updated");
          } else {
            toast.error("Failed to update offer letter.");
          }
          setFile(null);
        } else {
          toast.error("Failed to send  email.");
        }
      } catch (error) {
        toast.error("An error occurred while sending the email.");
      } finally {
        fetchNewStudent();
        value.isSending = false;
      }
    }

   }


  return (
    <div id="OperationEnroll">
      <Toaster position="top-center" reverseOrder={false} />
      {iscourseFormVisible && (
        <div className="form">
          <form onSubmit={handleSubmit} className="space-y-5">
            <span onClick={resetForm}>✖</span>
            <h2>
              {editingStudentId ? "Edit Enrolled Details" : "Add New Enrollment"}
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
            <select
              disabled={editingStudentId !== null}
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
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
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
          <h2>New Enroll Booking: </h2>
          <span onClick={handleAddNewCandidate}>
            + Add New Candidate
          </span>
        </div>
        <section className="flex items-center gap-1">
          <input
            type="type"
            placeholder="Search here by "
            value={searchQuery}
            onChange={handleSearchChange}
            className="border border-black px-2 py-1 rounded-lg"
          />

          <div className="relative group inline-block">
            <i class="fa fa-info-circle text-lg cursor-pointer"></i>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden w-max bg-gray-800 text-white text-sm rounded-md py-2 px-3 group-hover:block">
              Name, Email, Contact ,Counselor Name, Operation Name
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-t-8 border-gray-800 border-x-8 border-x-transparent"></div>
            </div>
          </div>
        </section>
        <table>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Full Name</th>
              <th>Program Price</th>
              <th>Paid Amount</th>
              <th>Remaining Amount</th>
              <th>Month Opted</th>
              <th>Clear Month</th>
              <th>Actions</th>
              <th>Remark</th>
              <th>Last Remark</th>
              <th>Login Credentials</th>
              <th>Send Onboarding Details</th>
              <th>Send Offer Letter</th>
              <th>More Details</th>
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
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td className="capitalize">{item.fullname}</td>
                      <td>{item.programPrice}</td>
                      <td>{item.paidAmount}</td>
                      <td>{item.programPrice - item.paidAmount}</td>
                      <td className="capitalize">{item.monthOpted}</td>
                      <td className="whitespace-nowrap">
                        {item.clearPaymentMonth}
                      </td>
                      <td>
                        <button onClick={() => handleEdit(item._id)}>
                          Edit
                        </button>
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
                          className="cursor-pointer flex items-center justify-center"
                          onClick={ () => handleSendEmail(item)}>
                          {item.mailSended ? (
                            <div className="flex items-center justify-center w-full"><PiLockKeyOpenFill /><i class="fa fa-send-o text-green-600"></i></div>
                            
                          ) : (
                            <div className="flex items-center justify-center w-full"><PiLockKeyFill /> <i class="fa fa-send-o text-red-600"></i></div>
                           
                          )}
                         
                        </div>
                      </td>
                      <td><div className="flex item-center justify-center cursor-pointer" onClick={() => handleSendOnboardingDetails(item)}>
                        {item.onboardingSended ? (
                            <div className="flex items-center justify-center w-full"> <RiMailSendFill /><i class="fa fa-send-o text-green-600"></i></div>
                            
                          ) : (
                            <div className="flex items-center justify-center w-full"><RiMailSendFill /> <i class="fa fa-send-o text-red-600"></i></div>
                           
                          )}
                        
                        </div>
                        </td>
                        <td>
                         <div>
                          <input className="bg-black cursor-pointer text-white rounded-md mb-2" type="file" accept="application/pdf" onChange={handleFileChange} required />
                          <form onClick={()=> handleSendOfferLetter(item)}>
                         <div className="flex item-center justify-center cursor-pointer">
                         {item.offerLetterSended ? (
                            <div className="flex items-center justify-center w-full"> <SlEnvolopeLetter /><i class="fa fa-send-o text-green-600"></i></div>  
                          ) : (
                            <div className="flex items-center justify-center w-full"><SlEnvolopeLetter /> <i class="fa fa-send-o text-red-600"></i></div> 
                          )}
                         </div>
                          </form>
                        
                         </div>
                        </td>
                      <td>
                        <i
                          class="fa fa-info-circle text-2xl cursor-pointer"
                          onClick={() => handleDialogOpen(item)}
                        ></i>
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
        {dialogVisible && dialogData && (
          <div className="fixed flex flex-col rounded-md top-[30%] left-[50%] shadow-black shadow-sm transform translate-x-[-50%] transalate-y-[-50%] bg-white p-[20px] z-[1000]">
            <h2>Details</h2>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> {dialogData.email}
              </p>
              <p>
                <strong>Phone:</strong> {dialogData.phone}
              </p>
              <p>
                <strong>Program:</strong> {dialogData.program}
              </p>
              <p>
                <strong>Domian Opted:</strong> {dialogData.domain}
              </p>

              <p>
                <strong>Counselor:</strong> {dialogData.counselor}
              </p>
            </div>
            <button onClick={handleDialogClose}>Close</button>
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
    </div>
  );
};
export default BookedAmount;

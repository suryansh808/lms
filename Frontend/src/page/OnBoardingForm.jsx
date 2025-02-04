import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import ShuffleHero from "../Components/ShuffleHero";
import Wavefull from "../Components/wave_full";
import toast, { Toaster } from "react-hot-toast";

const OnBoardingForm = () => {
  const [iscourseFormVisible, setiscourseFormVisible] = useState(true);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState([]);
  const [counselor, setCounselor] = useState([]);
  const [domain, setDomain] = useState([]);
  const [programPrice, setProgramPrice] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [monthOpted, setMonthOpted] = useState("");
  const [monthsToShow, setMonthsToShow] = useState([]);
   const [transactionId, setTransactionId] = useState("");
  const [clearPaymentMonth, setClearPaymentMonth] = useState("");
  const [modeofpayment, setModeOfPayment] = useState("");
  const [course, setCourse] = useState([]);
  useEffect(() => {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 
      'September', 'October', 'November', 'December'
    ];

    let months = [];
    if (currentMonthIndex === 1 && currentDay <= 7) {
      months = [monthNames[1], monthNames[2], monthNames[3]];
    } else {
      months = [monthNames[2], monthNames[3], monthNames[4]];
    }

    setMonthsToShow(months);
  }, []);
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API}/getcourses`);
      setCourse(response.data);
    } catch (error) {
      console.error("There was an error fetching courses:", error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  const navigate = useNavigate();
  const resetForm = () => {
    navigate("/")
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
    setTransactionId("");
    setClearPaymentMonth("");
    setModeOfPayment("");

    // setClearPaymentMonth("");
    // setEditingStudentId(null);
  };

  const [getTransactionId, setGetTransactionId] = useState([]);

  const getTransactionIdList = async () => {
    try {
        const response = await axios.get(`${API}/gettransactionid`);
        setGetTransactionId(response.data);
        console.log(response.data);
        }
    catch (error) {
        console.error(error);
    }
    };

   useEffect(() => {
    getTransactionIdList();
    }, []);

    const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const minDate = today.toISOString().split('T')[0]; // Today's date in yyyy-mm-dd format
    const maxDate = new Date(today.setDate(today.getDate() + 5)).toISOString().split('T')[0]; // 5 days from today

    setMinDate(minDate);
    setMaxDate(maxDate);
  }, []);

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
      transactionId: transactionId,
      clearPaymentMonth: clearPaymentMonth,
      modeofpayment: modeofpayment,
      operationName: null,
      operationId: null,
    };
    const minimalData = {
      fullName: fullname,
      email: email.trim(),
      phone: phone,
    };
    if (getTransactionId.some(item => item.transactionId === transactionId)) {

    try {
      let response;
      let minimalResponse;
       {
        response = await axios.post(`${API}/newstudentenroll`, formData);
        minimalResponse = await axios.post(`${API}/users`, minimalData);
      }
      if (
        (response.status === 200 || response.status === 201) 
        &&
        (minimalResponse.status === 200 || minimalResponse.status === 201)
      ) {
        toast.success("Onboarding Form submitted successfully.");
        // fetchNewStudent();
        resetForm();
        navigate("/login")
      } else {
        toast.error("Error submitting the form.");
      }
    } catch (error) {
      toast.error(
        "An error occurred while submitting the form. or student already exists, Please try again ."
      );
    }
  }
  else{
    toast.error("Transaction ID not found, Please try again .");
  }
  };


  return (
    <div id="OperationEnroll">
          <Toaster position="top-center" reverseOrder={false} />
        <div className="hero bg-black">
        <ShuffleHero />
      </div>
      <Wavefull/>
      {iscourseFormVisible && (
        <div className="form z-[999] absolute overflow-scroll top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#ffffff] p-10 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="">
            <span onClick={resetForm}>✖</span>
            <h2>OnBoarding Form</h2>
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
              placeholder="Candidate Contact No"
              required
            />
            <input
              type="text"
              value={counselor}
              placeholder="Counselor Name"
              onChange={(e) => setCounselor(e.target.value)}
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
              value={modeofpayment}
              onChange={(e) => setModeOfPayment(e.target.value)}
            >
              <option value="" selected disabled>
                {" "}
                Mode of Payment
              </option>
              <option value="RazorPay">RazorPay</option>
              <option value="QR Code">QR Code</option>
              <option value="EaseBuZZ">EaseBuZZ</option>
              <option value="PayPal">PayPal</option>
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
            <input type="text" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} placeholder="Enter Transaction ID" required />

            <div>
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
            </div>
            <input className="cursor-pointer" type="submit" value="Submit" />
          </form>
        </div>
      )}
    </div>
  );
};

export default OnBoardingForm;

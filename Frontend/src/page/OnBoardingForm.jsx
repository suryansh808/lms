import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import Operation from "../../../Backend/models/CreateOperation";

const OnBoardingForm = () => {

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [alternativeEmail, setAlternativeEmail] = useState("");
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
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const [remainingAmount, setRemainingAmount] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [branch, setBranch] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [referFriend, setReferFriend] = useState("");

  const [course, setCourse] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const currentYear = currentDate.getFullYear();
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

    // Logic for determining which months to show
    if (currentMonthIndex === 1 && currentDay <= 7) {
      months = [
        `${monthNames[1]} ${currentYear}`,
        `${monthNames[2]} ${currentYear}`,
        `${monthNames[3]} ${currentYear}`,
      ];
    } else {
      months = [
        `${monthNames[2]} ${currentYear}`,
        `${monthNames[3]} ${currentYear}`,
        `${monthNames[4]} ${currentYear}`,
      ];
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
    navigate("/");
    setiscourseFormVisible(false);
    setFullname("");
    setEmail("");
    setPhone("");
    setAlternativeEmail("");
    setProgram("");
    setCounselor("");
    setDomain("");
    setProgramPrice("");
    setPaidAmount("");
    setMonthOpted("");
    setTransactionId("");
    setClearPaymentMonth("");
    setModeOfPayment("");
  };

  const [getTransactionId, setGetTransactionId] = useState([]);
  const getTransactionIdList = async () => {
    try {
      const response = await axios.get(`${API}/gettransactionwithname`);
      setGetTransactionId(response.data);
    } catch (error) {
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
    const minDate = today.toISOString().split("T")[0];
    const maxDate = new Date(today.setDate(today.getDate() + 5))
      .toISOString()
      .split("T")[0];

    setMinDate(minDate);
    setMaxDate(maxDate);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    setIsSubmitting(true);
    event.preventDefault();
  
    const formData = {
      fullname: fullname,
      email: email.trim(),
      alternativeEmail: alternativeEmail.trim(),
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
      whatsAppNumber: whatsAppNumber,
      remainingAmount: remainingAmount,
      collegeName: collegeName,
      branch: branch,
      aadharNumber: aadharNumber,
      referFriend: referFriend,
      OperationName: null,
      OperationId: null
    };
  
    if (
      getTransactionId.transaction.includes(email) &&
      getTransactionId.counselor.includes(counselor)
    ) {
      try {
        let response = await axios.post(`${API}/newstudentenroll`, formData);
  
        if (response.status === 200 || response.status === 201) {
          toast.success("Onboarding Form submitted successfully.");
          resetForm();
          navigate("/");
        } else {
          toast.error("Error submitting the form.");
          resetForm();
        }
      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data?.message || "An error occurred.";
          toast.error(`Error from backend: ${errorMessage}`);
          resetForm();
          navigate("/");
        } else if (error.request) {
          toast.error("No response from the server. Please try again later.");
        } else {
          toast.error("An unknown error occurred.");
        }
      } 
    } else {
      toast.error("Enter valid email and counselor name.");
      setIsSubmitting(false);
    }
  };
  

  return (
    <div id="onboardingform">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container m-auto">
      <h2 className="mt-2">OnBoarding Form</h2>
        <form onSubmit={handleSubmit} className="">
          <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[10px]">
          <div className="input-field">
            <input
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              type="text"
              required
            />
            <label htmlFor="fullname">Full Name</label>
          </div>

          <div className="input-field">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="input-field">
            <input
              value={alternativeEmail}
              onChange={(e) => setAlternativeEmail(e.target.value)}
              type="email"
              required
            />
            <label htmlFor="College Email">College Email</label>
          </div>

          <div className="input-field">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              required
            />
            <label htmlFor=" Contact No">Contact No</label>
          </div>

          <div className="input-field">
            <input
              value={whatsAppNumber}
              onChange={(e) => setWhatsAppNumber(e.target.value)}
              type="number"
              required
            />
            <label htmlFor=" Whatsapp Number">Whatsapp Number</label>
          </div>

          <div className="input-field">
            <input
              type="text"
              value={counselor}
              onChange={(e) => setCounselor(e.target.value)}
              required
            />
            <label htmlFor="Counselor Name">Counselor Name</label>
          </div>

          <select
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            required
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
            value={modeofpayment}
            onChange={(e) => setModeOfPayment(e.target.value)}
            required
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
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
          >
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

          <div className="input-field">
            <input
              value={programPrice}
              onChange={(e) => setProgramPrice(e.target.value)}
              type="number"
              required
            />
            <label htmlFor="Program Price">Program Price</label>
          </div>

          <div className="input-field">
            <input
              value={paidAmount}
              onChange={(e) => setPaidAmount(e.target.value)}
              type="number"
              required
            />
            <label htmlFor="Paid Amount">Paid Amount</label>
          </div>

          <div className="input-field">
            <input
              value={remainingAmount}
              onChange={(e) => setRemainingAmount(e.target.value)}
              type="number"
              required
            />
            <label htmlFor="Remaining Amount">Remaining Amount</label>
          </div>

          <div className="input-field">
            <input
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              type="text"
              required
            />
            <label htmlFor=" College Name"> College Name</label>
          </div>

          <div className="input-field">
          <input
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            type="text"
            required
          />
          <label htmlFor="Branch/Department Name">Branch/Department</label>
          </div>

          <div className="input-field">
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            required
          />
           <label htmlFor="Transaction ID">Transaction ID</label>
          </div>

          <div className="input-field">
          <input
            type="number"
            value={aadharNumber}
            onChange={(e) => setAadharNumber(e.target.value)}
            required
          />
           <label htmlFor="Aadhar Number">Aadhar Number</label>
           </div>

          <div style={{display:'flex'}}>
            <label htmlFor="">Due date for clear payment ?</label>
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
          </div>

          <div> 
            Refer your friends to earn cashback.
            <textarea
              value={referFriend}
              onChange={(e) => setReferFriend(e.target.value)}
              name="refer"
              id="refer"
              placeholder="Name and Contact Number"
              cols={60}
              rows={3}
              className="resize-none"
            ></textarea>
          </div>

          {!isSubmitting ? (
  <input
    className="cursor-pointer"
    disabled={isSubmitting}
    type="submit"
    value="Submit"
  />
) : (
  <div id="loader">
  <div class="three-body">
    <div class="three-body__dot"></div>
    <div class="three-body__dot"></div>
    <div class="three-body__dot"></div>
  </div>
</div>
)}

        </form>
      </div>
    </div>
  );
};

export default OnBoardingForm;

import axios from "axios";
import React, { useState, useEffect} from "react";
import API from "../API";

const FullPaymentList = () => {
  const [newStudent, setNewStudent] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
     const [filteredStudents, setFilteredStudents] = useState([]);
  const fetchNewStudent = async () => {
    try {
      const response = await axios.get(`${API}/getnewstudentenroll`);
      const bookedStudents = response.data.filter(
        (item) => item.status === "fullPaid"
      );
      setNewStudent(bookedStudents);
      setFilteredStudents(bookedStudents);
    } catch (error) {
      console.error("There was an error fetching new student:", error);
    }
  };
  useEffect(() => {
    fetchNewStudent();
  }, []);

  if(!newStudent){
    return <div id="loader">
    <div class="three-body">
  <div class="three-body__dot"></div>
  <div class="three-body__dot"></div>
  <div class="three-body__dot"></div>
  </div>
  </div>;
  }
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

  return (
    <div id="AdminAddCourse">
      <div className="coursetable">
      <h1>Full Payments </h1>
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
            <th>Sl</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Mode of Program</th>
            <th>Counselor Name</th>
            <th>Opted Domain</th>
            <th>Program Price</th>
            <th>Paid Amount </th>
            <th>Pending </th>
            <th>Month Opted</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredStudents) && filteredStudents.length > 0 ? (
            filteredStudents.map((item, index) => (
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="14">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
     
    </div>
  );
};

export default FullPaymentList;

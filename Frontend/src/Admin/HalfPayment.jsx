import axios from "axios";
import React, { useState, useEffect } from "react";
import API from "../API";

const HalfPayment = () => {
  const [newStudent, setNewStudent] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  const fetchNewStudent = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/getnewstudentenroll`);
      const studentsData = response.data.filter(
        (item) => item.remark[item.remark.length - 1] === "Half_Cleared"
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

//   const handleChangeStatus = async (studentId, action) => {
//     const isConfirmed = window.confirm("Are you sure you want to undo?");
//     if (isConfirmed) {
//       try {
//         await axios.post(`${API}/updateStudentStatus`, {
//           studentId,
//           status: action,
//         });
//         fetchNewStudent();
//       } catch (error) {
//         console.error("There was an error changing status:", error);
//       }
//     }
//   };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    const filtered = newStudent.filter(
      (student) =>
        student.email.toLowerCase().includes(value.toLowerCase()) ||
        student.phone.toLowerCase().includes(value.toLowerCase()) ||
        student.fullname.toLowerCase().includes(value.toLowerCase()) ||
        student.counselor.toLowerCase().includes(value.toLowerCase()) ||
        student.operationName.toLowerCase().includes(value.toLowerCase()) ||
        student.createdAt.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStudents(filtered);
    setCurrentPage(1);
  };

  const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const groupedData = paginatedStudents.reduce((acc, item) => {
    const date = formatDate(item.createdAt);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <div id="AdminAddCourse">
      {loading ? (
        <div id="loader">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      ) : (
        <div className="coursetable">
          <div className="mb-2">
            <h2>Half Payments</h2>
            <section className="flex items-center gap-1">
              <input
                type="text"
                placeholder="Search here"
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
                <th>Email</th>
                <th>Contact</th>
                <th>Mode of Program</th>
                <th>Counselor Name</th>
                <th>Op Name</th>
                <th>Opted Domain</th>
                <th>Program Price</th>
                <th>Paid Amount</th>
                <th>Pending</th>
                <th>Month Opted</th>
                <th>Due Date</th>
                {/* <th>Action</th> */}
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
                        <td>{startIndex + index + 1}</td>
                        <td className="capitalize">{item.fullname}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td className="capitalize">{item.program}</td>
                        <td>{item.counselor}</td>
                        <td>{item.operationName}</td>
                        <td className="capitalize">{item.domain}</td>
                        <td>{item.programPrice}</td>
                        <td>{item.paidAmount}</td>
                        <td>{item.programPrice - item.paidAmount}</td>
                        <td className="capitalize">{item.monthOpted}</td>
                        <td className="whitespace-nowrap">
                          {item.clearPaymentMonth}
                        </td>
                        {/* <td>
                          <button
                            onClick={() =>
                              handleChangeStatus(item._id, "booked")
                            }
                          >
                            <div className="relative group inline-block">
                            <i className="fa fa-undo"></i>
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full z-[9999] mb-2 hidden w-max bg-gray-800 text-white text-sm rounded-md py-2 px-3 group-hover:block">
                            Undo
                            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-t-8 border-gray-800 border-x-8 border-x-transparent"></div>
                          </div>
                        </div>
                          </button>
                        </td> */}
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
        </div>
      )}
    </div>
  );
};

export default HalfPayment;

import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../API";

const AcceptedApplication = () => {
  const [users, setUsers] = useState([]);
  const [iscourseFormVisible, setiscourseFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = formData._id;
    try {
      await axios.put(`${API}/users/${id}`, formData);
      alert("User updated successfully");
      fetchUsers();
      resetForm();
    } catch (error) {
      console.error("Error creating user:", error);
      alert("User already exsist . Please try again.");
    }
  };
  const handleEdit = (user) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to edit the user details?"
    );
    if (isConfirmed) {
      const userToEdit = users.find((users) => users._id === user);
      setFormData(userToEdit);
      setiscourseFormVisible(true);
    }
  };
  const resetForm = () => {
    setiscourseFormVisible(false);
  };
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/users`);
      const activeUsers = response.data.filter(
        (user) => user.status === "active"
      );
      setUsers(activeUsers);
      setFilteredStudents(activeUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleActiveNow = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to inactive this user?"
    );
    if (isConfirmed) {
      try {
        await axios.put(`${API}/users/${id}`, { status: "inactive" });
        fetchUsers();
      } catch (error) {
        console.error("Error activating user:", error);
      }
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    const filtered = users.filter(
      (student) =>
        student.fullname.toLowerCase().includes(value.toLowerCase()) ||
        student.email.toLowerCase().includes(value.toLowerCase()) ||
        student.phone.toLowerCase().includes(value.toLowerCase())
    );
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
  

  return (
    <div id="AdminAddCourse">
      {iscourseFormVisible && (
        <div className="form">
          <form onSubmit={handleSubmit}>
            <span onClick={resetForm}>✖</span>
            <h1>Edit user</h1>
            <input
              type="text"
              name="fullName"
              placeholder="Candidate Full Name"
              value={formData.fullname}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Candidate Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Candidate contact no"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <input className="cursor-pointer" type="submit" value="Save" />
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
          <h2>Active Users List</h2>
          <section className="flex items-center  gap-1">
            <input
              type="type"
              placeholder="Search here by "
              value={searchQuery}
              onChange={handleSearchChange}
              className="border border-black px-2 py-1 rounded-lg"
            />
            <div className="relative group inline-block">
              <i class="fa fa-info-circle text-lg cursor-pointer text-gray-500"></i>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full z-[9999] mb-2 hidden w-max bg-gray-800 text-white text-sm rounded-md py-2 px-3 group-hover:block">
                Name, Email, and Contact no
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
                <th>Password</th>
                <th>Status</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.fullname}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.password}</td>
                    <td>{user.status}</td>
                    <td>
                      <button onClick={() => handleActiveNow(user._id)}>
                        <div className="relative group inline-block">
                          <i class="fa fa-eye-slash"></i>
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full z-[9999] mb-2 hidden w-max bg-gray-800 text-white text-sm rounded-md py-2 px-3 group-hover:block">
                            Inactive
                            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-t-8 border-gray-800 border-x-8 border-x-transparent"></div>
                          </div>
                        </div>
                      </button>
                      <button onClick={() => handleEdit(user._id)}>
                        <div className="relative group inline-block">
                          <i class="fa fa-edit"></i>
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full z-[9999] mb-2 hidden w-max bg-gray-800 text-white text-sm rounded-md py-2 px-3 group-hover:block">
                            Edit
                            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-t-8 border-gray-800 border-x-8 border-x-transparent"></div>
                          </div>
                        </div>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No Active Users</td>
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

export default AcceptedApplication;

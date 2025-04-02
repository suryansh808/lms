import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import API from "../API";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AcceptedApplication = () => {
  const [users, setUsers] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const itemsPerPage = 10;
  const [formData, setFormData] = useState({
    _id: "",
    fullname: "",
    email: "",
    phone: "",
    password: "",
  });

  const fetchComponentsForUsers = useCallback(async (usersToFetch, startIndex) => {
    const endIndex = Math.min(startIndex + itemsPerPage, usersToFetch.length);
    const visibleUsers = usersToFetch.slice(startIndex, endIndex);
    const usersWithComponents = await Promise.all(
      visibleUsers.map(async (user) => {
        if (user.components !== null) return user;
        try {
          const componentResponse = await axios.get(`${API}/user-components`, {
            params: { userId: user._id },
          });
          return { ...user, components: componentResponse.data.components };
        } catch (error) {
          console.error(`Error fetching components for user ${user._id}:`, error);
          return { ...user, components: {} };
        }
      })
    );
    return usersWithComponents;
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/users`);
      const activeUsers = response.data.filter(
        (user) => user.status === "active"
      );
      const usersWithNullComponents = activeUsers.map((user) => ({ 
        ...user, 
        components: null,
        isLoadingComponent: false 
      }));
      setUsers(usersWithNullComponents);
      setFilteredStudents(usersWithNullComponents);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const usersWithComponents = await fetchComponentsForUsers(usersWithNullComponents, startIndex);
      setUsers((prevUsers) => {
        const updatedUsers = [...prevUsers];
        usersWithComponents.forEach((userWithComponents, index) => {
          updatedUsers[startIndex + index] = userWithComponents;
        });
        return updatedUsers;
      });
      setFilteredStudents((prevFiltered) => {
        const updatedFiltered = [...prevFiltered];
        usersWithComponents.forEach((userWithComponents, index) => {
          updatedFiltered[startIndex + index] = userWithComponents;
        });
        return updatedFiltered;
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      setErrorMessage("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, fetchComponentsForUsers]);

  const handleToggleComponent = useCallback(
    async (userId, component, status) => {
      const toastId = toast.info(
        <div>
          <p>Are you sure you want to {status ? "enable" : "disable"} the {component} component?</p>
          <div className="flex gap-2">
            <button 
              className="bg-blue-500 text-white px-2 py-1 rounded"
              onClick={async () => {
                toast.dismiss(toastId);
                try {
                  setUsers(prevUsers => 
                    prevUsers.map(user => 
                      user._id === userId 
                        ? { ...user, isLoadingComponent: true }
                        : user
                    )
                  );

                  await axios.put(`${API}/user-components/${userId}`, {
                    component,
                    status,
                  });

                  const response = await axios.get(`${API}/user-components`, {
                    params: { userId: userId },
                  });

                  setUsers(prevUsers =>
                    prevUsers.map(user =>
                      user._id === userId
                        ? { ...user, components: response.data.components, isLoadingComponent: false }
                        : user
                    )
                  );
                  
                  setFilteredStudents(prevFiltered =>
                    prevFiltered.map(user =>
                      user._id === userId
                        ? { ...user, components: response.data.components, isLoadingComponent: false }
                        : user
                    )
                  );

                  toast.success(`${component} component ${status ? 'enabled' : 'disabled'} successfully`, {
                    position: "top-center",
                    autoClose: 3000,
                  });
                } catch (error) {
                  console.error(`Error ${status ? "enabling" : "disabling"} component:`, error);
                  setUsers(prevUsers => 
                    prevUsers.map(user => 
                      user._id === userId 
                        ? { ...user, isLoadingComponent: false }
                        : user
                    )
                  );
                  toast.error(`Failed to update ${component} component`, {
                    position: "top-center",
                    autoClose: 3000,
                  });
                }
              }}
            >
              Yes
            </button>
            <button 
              className="bg-gray-500 text-white px-2 py-1 rounded"
              onClick={() => toast.dismiss(toastId)}
            >
              No
            </button>
          </div>
        </div>,
        {
          position: "top-center",
          autoClose: false,
          closeOnClick: false,
          closeButton: false,
        }
      );
    },
    []
  );

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({ _id: "", fullname: "", email: "", phone: "", password: "" });
    setIsFormVisible(false);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!formData._id) {
        toast.error("No user ID found. Cannot update user.");
        return;
      }
      try {
        await axios.put(`${API}/users/${formData._id}`, formData);
        toast.success("User updated successfully");
        fetchUsers();
        resetForm();
      } catch (error) {
        console.error("Error updating user:", error);
        toast.error("Failed to update user. Please try again.");
      }
    },
    [formData, fetchUsers, resetForm]
  );

  const handleEdit = useCallback(
    (userId) => {
      const isConfirmed = window.confirm(
        "Are you sure you want to edit the user details?"
      );
      if (isConfirmed) {
        const userToEdit = users.find((user) => user._id === userId);
        setFormData(userToEdit);
        setIsFormVisible(true);
      }
    },
    [users]
  );

  const handleActiveNow = useCallback(
    async (id) => {
      const isConfirmed = window.confirm(
        "Are you sure you want to inactivate this user?"
      );
      if (isConfirmed) {
        try {
          await axios.put(`${API}/users/${id}`, { status: "inactive" });
          fetchUsers();
        } catch (error) {
          console.error("Error inactivating user:", error);
          setErrorMessage("Failed to update user status. Please try again.");
        }
      }
    },
    [fetchUsers]
  );

  const handleSearchChange = useCallback(
    async (event) => {
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
      const startIndex = 0;
      const usersWithComponents = await fetchComponentsForUsers(filtered, startIndex);
      setFilteredStudents((prevFiltered) => {
        const updatedFiltered = [...prevFiltered];
        usersWithComponents.forEach((userWithComponents, index) => {
          updatedFiltered[startIndex + index] = userWithComponents;
        });
        return updatedFiltered;
      });
      setUsers((prevUsers) => {
        const updatedUsers = [...prevUsers];
        usersWithComponents.forEach((userWithComponents) => {
          const userIndex = updatedUsers.findIndex((u) => u._id === userWithComponents._id);
          if (userIndex !== -1) {
            updatedUsers[userIndex] = userWithComponents;
          }
        });
        return updatedUsers;
      });
    },
    [users, fetchComponentsForUsers]
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = useMemo(() => {
    const sliced = filteredStudents.slice(
      startIndex,
      startIndex + itemsPerPage
    );
    return sliced;
  }, [filteredStudents, currentPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const RenderRow = React.memo(({ user, index }) => (
    <tr key={user._id}>
      <td>{startIndex + index + 1}</td>
      <td>{user.fullname}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{user.status}</td>
      <td>
        {user.components ? (
          <>
            <button
              className={`px-2 py-1 rounded mr-1 ${
                user.components?.atschecker
                  ? "bg-green-500 text-white"
                  : "bg-gray-300"
              } ${user.isLoadingComponent ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleToggleComponent(user._id, "atschecker", true)}
              disabled={user.isLoadingComponent}
            >
              {user.isLoadingComponent ? 'Loading...' : 'Enable'}
            </button>
            <button
              className={`px-2 py-1 rounded ${
                !user.components?.atschecker
                  ? "bg-red-500 text-white"
                  : "bg-gray-300"
              } ${user.isLoadingComponent ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleToggleComponent(user._id, "atschecker", false)}
              disabled={user.isLoadingComponent}
            >
              {user.isLoadingComponent ? 'Loading...' : 'Disable'}
            </button>
          </>
        ) : (
          "Loading..."
        )}
      </td>
      <td>
        {user.components ? (
          <>
            <button
              className={`px-2 py-1 rounded mr-1 ${
                user.components?.jobboard
                  ? "bg-green-500 text-white"
                  : "bg-gray-300"
              } ${user.isLoadingComponent ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleToggleComponent(user._id, "jobboard", true)}
              disabled={user.isLoadingComponent}
            >
              {user.isLoadingComponent ? 'Loading...' : 'Enable'}
            </button>
            <button
              className={`px-2 py-1 rounded ${
                !user.components?.jobboard
                  ? "bg-red-500 text-white"
                  : "bg-gray-300"
              } ${user.isLoadingComponent ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleToggleComponent(user._id, "jobboard", false)}
              disabled={user.isLoadingComponent}
            >
              {user.isLoadingComponent ? 'Loading...' : 'Disable'}
            </button>
          </>
        ) : (
          "Loading..."
        )}
      </td>
      <td>
        {user.components ? (
          <>
            <button
              className={`px-2 py-1 rounded mr-1 ${
                user.components?.myjob
                  ? "bg-green-500 text-white"
                  : "bg-gray-300"
              } ${user.isLoadingComponent ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleToggleComponent(user._id, "myjob", true)}
              disabled={user.isLoadingComponent}
            >
              {user.isLoadingComponent ? 'Loading...' : 'Enable'}
            </button>
            <button
              className={`px-2 py-1 rounded ${
                !user.components?.myjob
                  ? "bg-red-500 text-white"
                  : "bg-gray-300"
              } ${user.isLoadingComponent ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleToggleComponent(user._id, "myjob", false)}
              disabled={user.isLoadingComponent}
            >
              {user.isLoadingComponent ? 'Loading...' : 'Disable'}
            </button>
          </>
        ) : (
          "Loading..."
        )}
      </td>
      <td>
        {user.components ? (
          <>
            <button
              className={`px-2 py-1 rounded mr-1 ${
                user.components?.mockinterview
                  ? "bg-green-500 text-white"
                  : "bg-gray-300"
              } ${user.isLoadingComponent ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleToggleComponent(user._id, "mockinterview", true)}
              disabled={user.isLoadingComponent}
            >
              {user.isLoadingComponent ? 'Loading...' : 'Enable'}
            </button>
            <button
              className={`px-2 py-1 rounded ${
                !user.components?.mockinterview
                  ? "bg-red-500 text-white"
                  : "bg-gray-300"
              } ${user.isLoadingComponent ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleToggleComponent(user._id, "mockinterview", false)}
              disabled={user.isLoadingComponent}
            >
              {user.isLoadingComponent ? 'Loading...' : 'Disable'}
            </button>
          </>
        ) : (
          "Loading..."
        )}
      </td>
      <td>
        {user.components ? (
          <>
            <button
              className={`px-2 py-1 rounded mr-1 ${
                user.components?.exercise
                  ? "bg-green-500 text-white"
                  : "bg-gray-300"
              } ${user.isLoadingComponent ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleToggleComponent(user._id, "exercise", true)}
              disabled={user.isLoadingComponent}
            >
              {user.isLoadingComponent ? 'Loading...' : 'Enable'}
            </button>
            <button
              className={`px-2 py-1 rounded ${
                !user.components?.exercise
                  ? "bg-red-500 text-white"
                  : "bg-gray-300"
              } ${user.isLoadingComponent ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleToggleComponent(user._id, "exercise", false)}
              disabled={user.isLoadingComponent}
            >
              {user.isLoadingComponent ? 'Loading...' : 'Disable'}
            </button>
          </>
        ) : (
          "Loading..."
        )}
      </td>
      <td>
        <button onClick={() => handleActiveNow(user._id)}>
          <div className="relative group inline-block">
            <i className="fa fa-eye-slash"></i>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full z-[9999] mb-2 hidden w-max bg-gray-800 text-white text-sm rounded-md py-2 px-3 group-hover:block">
              Inactive
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-t-8 border-gray-800 border-x-8 border-x-transparent"></div>
            </div>
          </div>
        </button>
        <button onClick={() => handleEdit(user._id)}>
          <div className="relative group inline-block">
            <i className="fa fa-edit"></i>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full z-[9999] mb-2 hidden w-max bg-gray-800 text-white text-sm rounded-md py-2 px-3 group-hover:block">
              Edit
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-t-8 border-gray-800 border-x-8 border-x-transparent"></div>
            </div>
          </div>
        </button>
      </td>
    </tr>
  ));

  return (
    <div id="AdminAddCourse">
      <ToastContainer />
      {isFormVisible && (
        <div className="form">
          <form onSubmit={handleSubmit}>
            <span onClick={resetForm}>✖</span>
            <h1>Edit User</h1>
            <input
              type="text"
              name="fullname"
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
              placeholder="Candidate Contact No"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
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
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      ) : (
        <div className="coursetable">
          <h2>Active Users List</h2>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <section className="flex items-center gap-1">
            <input
              type="text"
              placeholder="Search by name, email, or contact"
              value={searchQuery}
              onChange={handleSearchChange}
              className="border border-black px-2 py-1 rounded-lg"
            />
            <div className="relative group inline-block"> 
              <i className="fa fa-info-circle text-lg cursor-pointer text-gray-500"></i>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full z-[9999] mb-2 hidden w-max bg-gray-800 text-white text-sm rounded-md py-2 px-3 group-hover:block">
                Search by Name, Email, or Contact No
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
                <th>Status</th>
                <th>ATS Checker</th>
                <th>Job Board</th>
                <th>My Job</th>
                <th>Mock Interview</th>
                <th>Exercise</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((user, index) => (
                  <RenderRow key={user._id} user={user} index={index} />
                ))
              ) : (
                <tr>
                  <td colSpan="11">No Active Users</td>
                </tr>
              )}
            </tbody>
          </table>
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
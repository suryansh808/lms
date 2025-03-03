// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import API from "../API";

// const MyJob = () => {
//   const [applications, setApplications] = useState([]);
//   const userId = localStorage.getItem("userId");
//   const fetchApplications = async () => {
//     try {
//       const response = await axios.get(`${API}/jobapplications/${userId}`);
//       setApplications(response.data);
//     } catch (error) {
//       console.error("Failed to fetch applications:", error);
//     }
//   };
//   const convertToIST = (utcDate) => {
//     const date = new Date(utcDate);
//     return date.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
//   };
//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   return (
//     <div id="PostedJob">
//       {applications?.length > 0 ? (
//         <div className="alljob">
//           {applications.map((job, index) => (
//             <div className="item" key={index}>
//               <h1>{job.title}</h1>
//               <h2>
//                 <i className="fa fa-building"></i> {job.company}
//               </h2>
//               <h3>
//                 <i className="fa fa-calendar"></i> Applied On{" "}
//                 {convertToIST(job.createdAt)}
//               </h3>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="no-jobs">
//           <h2 className="text-2xl text-center justify-center font-semibold"> No Job Application till now</h2>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyJob; 

import axios from "axios";
import React, { useState, useEffect } from "react";
import API from "../API";

const MyJob = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/jobapplications/${userId}`);
      setApplications(response.data);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const convertToIST = (utcDate) => {
    const date = new Date(utcDate);
    return date.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
   <div className="bg-gradient-to-br from-indigo-100 to-gray-200">
     <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          My Job Applications
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <svg
              className="animate-spin h-8 w-8 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
              />
            </svg>
          </div>
        ) : applications.length > 0 ? (
          <div className="grid gap-6">
            {applications.map((job, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-black">
                  {job.title}
                </h2>
                <div className="mt-2 text-gray-600">
                  <span className="flex items-center">
                    <i className="fa fa-building mr-2 text-orange-500"></i>
                    {job.company}
                  </span>
                </div>
                <div className="mt-1 text-gray-500">
                  <span className="flex items-center">
                    <i className="fa fa-calendar mr-2 text-orange-500"></i>
                    Applied on {convertToIST(job.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              No Job Applications Yet
            </h2>
            <p className="mt-2 text-gray-500">
              Start applying to jobs to see them listed here!
            </p>
          </div>
        )}
      </div>
    </div>
   </div>
  );
};

export default MyJob;
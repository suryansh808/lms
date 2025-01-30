import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};
const groupByDate = (queries) => {
  return queries.reduce((acc, query) => {
    const date = formatDate(query.createdAt);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(query);
    return acc;
  }, {});
};

const MentorQueries = () => {
  const [queries, setQueries] = useState([]);
  const getQueries = async () => {
    try {
      const response = await axios.get(`${API}/mentorqueries`);
      console.log("advance queries", response.data);
      setQueries(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getQueries();
  }, []);

  const groupedQueries = groupByDate(queries);

  if (!groupedQueries) {
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

  const getBackgroundColor = (value) => {
    switch (value) {
      case 'Shared':
        return 'bg-blue-800';
      case 'Not Interested':
        return 'bg-red-800';
      case 'Already Paid':
        return 'bg-green-800';
      default:
        return 'bg-black';
    }
  };
  const handleSelectChange = async (event, id) => {
    const updatedAction = event.target.value;
    try {
      await axios.put(`${API}/queriesaction/${id}`, { action: updatedAction });
      toast.success("Query updated successfully");
      getQueries();
    } catch (error) {
      console.error("Error updating query:", error);
    }
  };



  return (
    <div id="AdminAddCourse">
         <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-center my-5">Mentorship Course Queries</h2>
      <div className="coursetable">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>College Name</th>
              <th>Interested Domain</th>
              <th>Study Year</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedQueries).length > 0 ? (
              Object.keys(groupedQueries).map((date, dateIndex) => (
                <React.Fragment key={dateIndex}>
                  <tr>
                    <td
                      colSpan="8"
                      style={{
                        fontWeight: "bold",
                        backgroundColor: "#f0f0f0",
                        textAlign: "center",
                      }}
                    >
                      {date}
                    </td>
                  </tr>
                  {groupedQueries[date].map((query, index) => {
                    const dateObject = new Date(query.createdAt);
                    const time = dateObject.toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    });

                    return (
                      <tr key={index}>
                        <td className="capitalize">{query.name}</td>
                        <td>{query.email}</td>
                        <td>{query.phone}</td>
                        <td className="capitalize">{query.collegeName}</td>
                        <td className="capitalize">{query.domain}</td>
                        <td>{query.passingyear}</td>
                        <td className="uppercase">{time}</td>
                        <td>
                        <select
                            value={query.action}
                            onChange={(event) => handleSelectChange(event, query._id)}
                            className={`text-white ${getBackgroundColor(query.action || 'Unseen')}`}
                          >
                            <option value="Unseen">Unseen</option>
                            <option className="bg-blue-600" value="Shared">Shared</option>
                            <option className="bg-red-600" value="Not Interested">Not Interested</option>
                            <option className="bg-green-600" value="Already Paid">Already Paid</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="8">No Queries Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MentorQueries;

import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../API";

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

const AdvanceQueries = () => {
  const [queries, setQueries] = useState([]);

  const getQueries = async () => {
    try {
      const response = await axios.get(`${API}/advancequeries`);
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

  return (
    <div id="AdminAddCourse">
      <h2 className="text-center my-5">Advance Course Queries</h2>
      <div className="coursetable">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Current Role</th>
              <th>Experiece</th>
              <th>Interested Domain</th>
              <th>Goal</th>
              <th>Domain</th>
              <th>Reason</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedQueries).length > 0 ? (
              Object.keys(groupedQueries).map((date, dateIndex) => (
                <React.Fragment key={dateIndex}>
                  <tr>
                    <td
                      colSpan="10"
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
                        <td className=" capitalize">{query.name}</td>
                        <td>{query.email}</td>
                        <td>{query.phone}</td>
                        <td className=" capitalize">{query.currentRole}</td>
                        <td>{query.experience}</td>
                        <td className=" capitalize">{query.interestedDomain}</td>
                        <td className=" capitalize">
                          {query.goal === "Other"
                            ? query.goalOther
                            : query.goal}
                        </td>
                        <td className=" capitalize">
                          {query.domain === "Other"
                            ? query.domainOther
                            : query.domain}
                        </td>
                        <td>{query.reason}</td>
                        <td className=" uppercase">{time}</td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="10">No Queries Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvanceQueries;

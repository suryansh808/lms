import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../API";

const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
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
      console.log("advance queries",response.data);
      setQueries(response.data);
    } catch (error) {
      console.error(error);
    }
    
  };
  useEffect(() => {
    getQueries();
  }, []);
 
  const groupedQueries = groupByDate(queries);
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
          </tr>
        </thead>
        <tbody>
         {Object.keys(groupedQueries).length > 0 ? (
                       Object.keys(groupedQueries).map((date, dateIndex) => (
                         <React.Fragment key={dateIndex}>
                           <tr>
                             <td colSpan="3" style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' , textAlign: 'left'}}>
                               {date}
                             </td>
                           </tr>
                           {groupedQueries[date].map((query, index) => (
                             <tr key={index}>
                               <td>{query.name}</td>
                               <td>{query.email}</td>
                               <td>{query.phone}</td>
                             </tr>
                           ))}
                         </React.Fragment>
                       ))
                     ) : (
                       <tr>
                         <td colSpan="3">No Queries Found</td>
                       </tr>
                     )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default AdvanceQueries;

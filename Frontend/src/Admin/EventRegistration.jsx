import axios from 'axios';
import React, { useEffect, useState } from 'react';
import API from '../API';

const EventRegistration = () => {

    const [eventRegistration, setEventRegistration] = useState([]);
   const [loading, setLoading] = useState(true);
    const fetchEventRegistration = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${API}/alleventregistrationnts`);
          setEventRegistration(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("There was an error fetching event registration data:", error);
        } finally{
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchEventRegistration();
      }, []);

  return (
    <div id="AdminAddCourse">
      <div className="coursetable">
        <div>
          <h2>Event Registration Lists</h2>
        </div>
        {loading ? (
          <div id="loader">
            <div class="three-body">
              <div class="three-body__dot"></div>
              <div class="three-body__dot"></div>
              <div class="three-body__dot"></div>
            </div>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email Id</th>
                <th>Student College Mail Id</th>
                <th>College Name</th>
              </tr>
            </thead>
            <tbody>
              {eventRegistration.map((register, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{register.name}</td>
                  <td>{register.phone}</td>
                  <td>{register.email}</td>
                  <td>{register.collegeEmailId}</td>
                  <td>{register.collegeName}</td>              
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default EventRegistration

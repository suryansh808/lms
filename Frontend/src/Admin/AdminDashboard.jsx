import React, { useState, useEffect} from "react";
import axios from "axios";
import API from "../API";


const AdminDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [Operation, setOperation] = useState([]);
    const [bda, setBda] = useState([]);
    const [payment, setPayment] = useState([]);
    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${API}/getcourses`);
            setCourses(response.data);
        } catch (error) {
            console.error("There was an error fetching courses:", error);
        }
    };
    const fetchOperation = async () => {
        try {
            const response = await axios.get(`${API}/getoperation`);
            setOperation(response.data);
        } catch (error) {
            console.error("There was an error fetching operation:", error);
        }
    };
    const fetchBda = async () => {
        try {
            const response = await axios.get(`${API}/getbda`);
            setBda(response.data);
        } catch (error) {
            console.error("There was an error fetching bda:", error);
        }
    };

    const fetchNewStudent = async () => {
      try {
        const response = await axios.get(`${API}/getnewstudentenroll`);
        setPayment(response.data);
      } catch (error) {
        console.error("There was an error fetching new student:", error);
      }
    };
    
    useEffect(() => {
        fetchCourses();

    }, []);
    useEffect(() => {
        fetchOperation();

    }, []);
    useEffect(() => {
        fetchBda();
    }, []);
    useEffect(() => {
        fetchNewStudent();
    }, []);

    if(!courses || !Operation || !bda || !payment){
        return <div id="loader">
        <div class="three-body">
      <div class="three-body__dot"></div>
      <div class="three-body__dot"></div>
      <div class="three-body__dot"></div>
      </div>
      </div>;
     }

    return (
        <div id="AdminDashboard">
            <div className="numberdiv">
                <div>
                    <i className="text-blue-700	fa fa-book"></i>
                    <h2>COURSE</h2>
                    <span>{courses.length}</span>
                </div>
                <div>
                    <i className="fa fa-user-secret"></i>
                    <h2>OPERATION</h2>
                    <span>{Operation.length}</span>
                </div>
                <div>
                    <i className="fa fa-users"></i>
                    <h2>BDA</h2>
                    <span>{bda.length}</span>
                </div>
                <div>
                    <i className="text-yellow-500 fa fa-calendar"></i>
                    <h2>Booked</h2>
                    <span>{(payment.filter((item) => item.status === "booked")).length}</span>
                </div>
                <div>
                    <i className="text-green-700	fa fa-money"></i>
                    <h2>Full PAID</h2>
                    <span>{(payment.filter((item) => item.status === "fullPaid")).length}</span>
                </div>
                <div>
                    <i className="text-red-700 fa fa-times-circle"></i>
                    <h2>Default</h2>
                    <span>{(payment.filter((item) => item.status === "default")).length}</span>
                </div>

            </div>
            <br />
            
            <br />
            <h2>Added Courses :</h2>
            <div className="courselist">
                <table>
                    <tr>
                        <th>Sl</th>
                        <th>Course</th>
                        <th>Session</th>
                    </tr>
                    {courses.map((course, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{course.title}</td>
                            <td>{Object.keys(course.session).length}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;

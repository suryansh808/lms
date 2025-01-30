import axios from "axios";
import React, { useState, useEffect } from "react";
import API from "../API";

const MyJob = () => {
    const [applications, setApplications] = useState([]);
    const userId = localStorage.getItem("userId");

    const fetchApplications = async () => {
        try {
            const response = await axios.get(`${API}/jobapplications/${userId}`);
            setApplications(response.data);
            console.log("data", response.data);
        } catch (error) {
            console.error("Failed to fetch applications:", error);
        }
    };

    const convertToIST = (utcDate) => {
        const date = new Date(utcDate);
        return date.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
    };
    
    useEffect(() => {
        fetchApplications();
    }, []);

    return (
        <div id="PostedJob">
            <div className="alljob ">
                {applications?.map((job) => (
                    <div className="item">
                        <h1>{job.title} </h1>
                        <h2><i class="fa fa-building"></i> {job.company} </h2>
                        <h3><i class="fa fa-calendar"></i> Applied On {convertToIST(job.createdAt)}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyJob;

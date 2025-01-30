import axios from "axios";
import React, { useState, useEffect } from "react";
import API from "../API";

const PostedJob = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);

    const userId = localStorage.getItem("userId");

    const fetchJobs = async () => {
        try {
            const response = await axios.get(`${API}/jobs-with-users`);
            setJobs(response.data);
            console.log("data", response.data);
        } catch (error) {
            console.error("There was an error fetching Jobs:", error);
        }
    };

    const convertToIST = (utcDate) => {
        const date = new Date(utcDate);
        return date.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
    };

    const handleApply = async () => {
        try {
            if (!userId || !selectedJob) {
                alert("User ID or Job is missing.");
                return;
            }

            const response = await axios.post(`${API}/jobapplications`, {
                userId,
                jobId: selectedJob._id,
                title: selectedJob.title,
                company: selectedJob.company,
            });
            alert("Job application submitted successfully!");
            setSelectedJob(null);
            fetchJobs();
            console.log("Application response:", response.data);

        } catch (error) {
            console.error("Error submitting job application:", error);
            alert("Failed to apply for the job. Please try again.");
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div id="PostedJob">
            {selectedJob && (
                <div className="selectjob">
                    <div>
                        <h1>{selectedJob.title} <span onClick={() => setSelectedJob(null)} >✖</span></h1>
                        <h2><i class="fa fa-building text-blue-800"></i> {selectedJob.company}</h2>
                        <h3>
                            <span> <i class="fa fa-calendar-check-o text-green-800"></i> {convertToIST(selectedJob.createdAt)}</span>
                            <span> <i class="fa fa-calendar-times-o text-red-600"></i> {convertToIST(selectedJob.expiryDate)}</span>
                        </h3>

                        <pre>{selectedJob.description}</pre>
                        {selectedJob.applications.includes(userId) ? (
                           <button style={{ backgroundColor: 'red' }}>Already Apply</button>
                        ) : (
                            <button onClick={handleApply} >Apply</button>
                        )}
                        
                    </div>
                </div>
            )}
            <div className="alljob ">
                {jobs?.map((job) => (
                    <div className="item" onClick={() => setSelectedJob(job)}>
                        <h1>{job.title} </h1>
                        <h2><i class="fa fa-building"></i> {job.company} </h2>
                        <h3><i class="fa fa-calendar"></i> {convertToIST(job.createdAt)}</h3>
                        {job.applications.includes(userId) ? (
                           <button style={{ backgroundColor: 'red' }}>Already Apply</button>
                        ) : (
                            <button>Apply Now</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostedJob;

import React from "react";
import { Link } from "react-router-dom";

// import ds from '../assets/Advanced Course Images/Data science/DS 3.jpg'
// import dm from '../assets/Advanced Course Images/Digital Markting/DM 1.jpg'
// import ib from '../assets/Advanced Course Images/Investment banking/IB 6.jpg'
// import mern from '../assets/Advanced Course Images/Mern Stack Development/MSD 1.jpg'
// import pm from '../assets/Advanced Course Images/Product management/PM 4.jpg'
// import pfm from '../assets/Advanced Course Images/Performance marketing/PM 3.jpg'

const AdvanceCounses = () => {
  const courses = [
    {
      title: "MERN Stack Devlopment",
      description:
        "Building web apps using MongoDB, Express.js, React, and Node.js",
      icon: <i class="fa fa-code" aria-hidden="true"></i>,
      level: "Advanced",
      duration: "6 Months",
    },
    {
      title: "Data Science",
      description:
        "Analyzing data to find insights that guide business decisions.",
      icon: <i class="fa fa-database" aria-hidden="true"></i>,
      level: "Advanced",
      duration: "6 Months",
    },
    {
      title: "Digital Marketing",
      description:
        "Promoting products online through channels like social media to drive business goals.",
      icon: <i class="fa fa-bullhorn" aria-hidden="true"></i>,
      level: "Advanced",
      duration: "6 Months",
    },
  ];

  return (
    <section>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-[#ffffff11] shadow-[#ffffff5b] drop-shadow-md text-white rounded-lg shadow-md p-4 m-4"
            >
              <h2 className=" text-lg font-bold mb-2">
                <span className="text-3xl mr-3">{course.icon}</span>
                {course.title}
              </h2>
              <p className=" text-sm mb-4">{course.description}</p>
              <p className=" text-sm mb-4">Duration: {course.duration}</p>
              <p className=" text-sm mb-4">Level: {course.level}</p>
              <button className=" bg-[#f15b29] text-white font-bold py-2 px-4 rounded">
                Know more
              </button>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="border group px-3 py-1.5 rounded-full">
            <Link to="/advance"> View All Advanced Courses <i class="fa fa-arrow-right ml-2 border rounded-full p-2 group-hover:translate-x-1 ease-linear duration-300 " aria-hidden="true"></i></Link>
            
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-2xl font-bold my-6">
         | Why choose our advanced courses
        </h1>
        <ul className="space-y-3">
          <li className="flex items-center gap-2">
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
            Expert-led instruction from industry professionals
          </li>
          <li className="flex items-center gap-2">
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
            Hands-on projects and real-world applications
          </li>
          <li className="flex items-center gap-2">
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
            Flexible learning schedules to fit your lifestyle
          </li>
          <li className="flex items-center gap-2">
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
            Cutting-edge curriculum updated regularly
          </li>
        </ul>
      </div>
    </section>
  );
};

export default AdvanceCounses;

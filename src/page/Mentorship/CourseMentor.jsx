import React, { useState, useEffect, useRef } from "react";

import fullStack from "../../assets/mentorshipcourses/full stack.png";
import android from "../../assets/mentorshipcourses/android.png";
import artificial from "../../assets/mentorshipcourses/AI.png";
import machine from "../../assets/mentorshipcourses/Machine learning.png";
import cyber from "../../assets/mentorshipcourses/cyber.png";
import datascience from "../../assets/mentorshipcourses/Data science.png";
import cloudcomputing from "../../assets/mentorshipcourses/cloud computing.png";
import embeddedsystem from "../../assets/mentorshipcourses/embedded.png";
import iotandrobotics from "../../assets/mentorshipcourses/robotics.png";
import autocad from "../../assets/mentorshipcourses/Autocad.png";
import uiux from "../../assets/mentorshipcourses/ui & ux.png";
import graphicdesign from "../../assets/mentorshipcourses/graphic.png";
import bussinessanalytics from "../../assets/mentorshipcourses/buis.. analytics.png";
import digitalmarketing from "../../assets/mentorshipcourses/digital marketing.png";
import finance from "../../assets/mentorshipcourses/finance.png";
import hr from "../../assets/mentorshipcourses/HR.png";
import stockmarketing from "../../assets/mentorshipcourses/stock market.png";
import supplychainmanagement from "../../assets/mentorshipcourses/supply.png";
import psycho from "../../assets/mentorshipcourses/psyc.png";
import fintech from "../../assets/mentorshipcourses/fintech.png";
import nano from "../../assets/mentorshipcourses/genetic.png";
import dataanalytics from "../../assets/mentorshipcourses/DA.jpg";
import devops from "../../assets/mentorshipcourses/DEVOPS.jpg";
import { Link } from "react-router-dom";



const CourseMentor = () => {
    const [selectedCategory, setSelectedCategory] = useState("Computer science");
    




  const categories = [
    "Computer science",
    "Management",
    "Electronics/Electrical",
    "Medical",
    "Mechanical/Civil",
  ];



  const coursesData = {
    "Computer science": [
      {
        id: 1,
        title: "Full Stack Web Development",
        image: `${fullStack}`,
        pdf: `/src/assets/coursespdf/Full Stack Development-min.pdf`,
        description:
          "Building and managing both the front-end and back-end of websites.",
        rating: 4.7,
        studentsTaken: 2500,
      },
      {
        id: 2,
        title: "Android App Development",
        image: `${android}`,
        pdf: `/src/assets/coursespdf/Android Development-min.pdf`,
        description:
          "Designing and developing mobile apps for Android devices.",
        rating: 4.9,
        studentsTaken: 2200,
      },
      {
        id: 3,
        title: "Artificial Intelligence",
        image: `${artificial}`,
        pdf: `/src/assets/coursespdf/Artificial Intelligence-min.pdf`,
        description:
          "Creating systems that simulate human intelligence for tasks like decision-making.",
        rating: 4.8,
        studentsTaken: 2100,
      },
      {
        id: 4,
        title: "Machine Learning",
        image: `${machine}`,
        pdf: `/src/assets/coursespdf/Machine Learning-min.pdf`,
        description:
          "Teaching machines to recognize patterns and make predictions from data.",
        rating: 4.7,
        studentsTaken: 2800,
      },
      {
        id: 5,
        title: "Cyber Security",
        image: `${cyber}`,
        pdf: `/src/assets/coursespdf/Cyber Security-min.pdf`,
        description:
          "Protecting networks, systems, and data from cyber attacks.",
        rating: 4.9,
        studentsTaken: 2400,
      },
      {
        id: 6,
        title: "Data Science",
        image: `${datascience}`,
        pdf: `/src/assets/coursespdf/Data Science-min.pdf`,
        description:
          "Analyzing large data sets to extract insights and inform decisions.",
        rating: 4.8,
        studentsTaken: 2600,
      },
      {
        id: 7,
        title: "Data Analytics",
        image: `${dataanalytics}`,
        pdf: `/src/assets/coursespdf/Data Analytics-min.pdf`,
        description:
          "Interpreting data to help businesses improve performance and make decisions.",
        rating: 4.7,
        studentsTaken: 2300,
      },
      {
        id: 8,
        title: "UI/UX Design",
        image: `${uiux}`,
        pdf: `/src/assets/coursespdf/UI  UX-min.pdf`,
        description:
          "Designing intuitive user interfaces and ensuring a positive experience.",
        rating: 4.9,
        studentsTaken: 2500,
      },
      {
        id: 9,
        title: "DevOps",
        image: `${devops}`,
        pdf: `/src/assets/coursespdf/Dev ops-min.pdf`,
        description: "Implement DevOps practices for software development.",
        rating: 4.8,
        studentsTaken: 2100,
      },
    ],
    Management: [
      {
        id: 10,
        title: "Business Analytics",
        image: `${bussinessanalytics}`,
        pdf: `/src/assets/coursespdf/Business Analytics-min.pdf`,
        description: "Using data to optimize business decisions and strategies",
        rating: 4.7,
        studentsTaken: 2700,
      },
      {
        id: 11,
        title: "Finance",
        image: `${finance}`,
        pdf: `/src/assets/coursespdf/Finance-min.pdf`,
        description:
          "Managing money, investments, and financial planning for individuals or companies.",
        rating: 4.8,
        studentsTaken: 2500,
      },
      {
        id: 12,
        title: "Human Resource",
        image: `${hr}`,
        pdf: `/src/assets/coursespdf/Human Resource-min.pdf`,
        description:
          "Overseeing recruitment, employee development, and organizational culture.",
        rating: 4.9,
        studentsTaken: 2300,
      },
      {
        id: 13,
        title: "Digital Marketing",
        image: `${digitalmarketing}`,
        pdf: `/src/assets/coursespdf/Digital Marketing-min.pdf`,
        description:
          " Promoting products and services through digital channels like social media and search engines.",
        rating: 4.7,
        studentsTaken: 2000,
      },
      {
        id: 14,
        title: "Stock Marketing",
        image: `${stockmarketing}`,
        pdf: `/src/assets/coursespdf/Stock Market-min.pdf`,
        description:
          "Trading stocks, bonds, and other securities in financial markets.",
        rating: 4.8,
        studentsTaken: 2400,
      },
      {
        id: 15,
        title: "Supply Chain Management",
        image: `${supplychainmanagement}`,
        pdf: `/src/assets/coursespdf/Supply Chain Management-min.pdf`,
        description:
          "Managing the production, distribution, and delivery of products.",
        rating: 4.7,
        studentsTaken: 2200,
      },
      {
        id: 16,
        title: "Graphics Design",
        image: `${graphicdesign}`,
        pdf: `/src/assets/coursespdf/Graphic Design-min.pdf`,
        description: "Creating visual content for digital and print media.",
        rating: 4.9,
        studentsTaken: 2100,
      },
      {
        id: 17,
        title: "Fintech",
        image: `${fintech}`,
        pdf: `/src/assets/coursespdf/FinTech-min.pdf`,
        description:
          "Technology to improve financial services like banking, payments, and investments.",
        rating: 4.8,
        studentsTaken: 2500,
      },
    ],
    "Electronics/Electrical": [
      {
        id: 18,
        title: "Embedded System",
        image: `${embeddedsystem}`,
        pdf: `/src/assets/coursespdf/Embedded System-min.pdf`,
        description:
          "Designing computer systems integrated into devices for specific functions.",
        rating: 4.9,
        studentsTaken: 2600,
      },
      {
        id: 19,
        title: "Cloud Computing",
        image: `${cloudcomputing}`,
        pdf: `/src/assets/coursespdf/Cloud Computing-min.pdf`,
        description:
          "Providing scalable computing resources and storage via the internet.",
        rating: 4.8,
        studentsTaken: 2400,
      },
      {
        id: 20,
        title: "IOT & Robotics",
        image: `${iotandrobotics}`,
        pdf: `/src/assets/coursespdf/IOT and Robotics-min.pdf`,
        description:
          "Developing robots and devices that communicate over the internet to perform tasks.",
        rating: 4.7,
        studentsTaken: 2500,
      },
    ],
    Medical: [
      {
        id: 21,
        title: "Nano Technology & Genetic Engineering",
        image: `${nano}`,
        pdf: `/src/assets/coursespdf/Nano Technology and Genetic-min.pdf`,
        description:
          " Modifying organisms’ genes or manipulating matter at a microscopic level for innovation.",
        rating: 4.9,
        studentsTaken: 2200,
      },
      {
        id: 22,
        title: "Psychology",
        image: `${psycho}`,
        pdf: `/src/assets/coursespdf/Psychology-min.pdf`,
        description:
          "Studying mental processes and behavior to understand and address human conditions.",
        rating: 4.8,
        studentsTaken: 2100,
      },
    ],
    "Mechanical/Civil": [
      {
        id: 23,
        title: "Auto Cad",
        image: `${autocad}`,
        pdf: `/src/assets/coursespdf/AutoCad Brochure-min.pdf`,
        description:
          "Using software to create detailed 2D and 3D designs for engineering and architecture.",
        rating: 4.7,
        studentsTaken: 2000,
      },
    ],
  };

  return (
    <div>
      <div className="container mx-auto">
        <h2
          data-aos="fade-up"
          className="text-3xl font-bold text-center text-[#f15b29] mb-10"
        >
          | Our Mentorship Courses
        </h2>
        <div
          data-aos="fade-up"
          className="flex  justify-center flex-wrap mb-8 gap-3 "
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md border-b transition ${
                category === selectedCategory
                  ? "bg-[#f15b29] text-white"
                  : "bg-[#080810] text-white hover:bg-orange-700"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:px-24">
          {coursesData[selectedCategory].map((course) => (
            <div
              data-aos="fade-in"
              key={course.id}
              className="border rounded-lg overflow-hidden "
            >
              <img
                src={course.image}
                alt={course.title}
                className="h-[220px] w-full object-cover"
                loading="lazy"
              />
              <div className="px-2 py-2">
                <h3 className="font-bold text-md mb-2">{course.title}</h3>
                <p className="mb-2">{course.description}</p>
                <p className="mb-2">
                  {course.rating} <span className="text-[#f15b29]">★★★★</span>★
                  ({course.studentsTaken}){" "}
                </p>
                <div className="flex  space-x-2">
                  <button
                    className="px-4 py-2 border text-[#f15b29] font-semibold rounded"
                   
                  >
                    <Link to='https://prettyform.addxt.com/a/form/vf/1FAIpQLScOi3ahP2fNfccTBbgkmJEdACAJbsVMcJ0fSHOrJcdUQ494XQ' target="_blank"> Apply Now</Link>
                  </button>
                  <button className="px-4 py-2 border text-[#eee] flex items-center justify-center font-semibold rounded transition">
                    <a href={course.pdf} target="_blank">
                      Brochure
                    </a>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      
      </div>
    </div>
  );
};

export default CourseMentor;

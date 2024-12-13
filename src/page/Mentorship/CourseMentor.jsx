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

import pdf1 from '../../../krutanic/Android Development.pdf' ;
import pdf2 from '../../../krutanic/Artificial Intelligence.pdf' ;
import pdf3 from '../../../krutanic/AutoCad Brochure.pdf' ;
import pdf4 from '../../../krutanic/Business Analytics.pdf' ;
import pdf5 from '../../../krutanic/Cloud Computing.pdf' ;
import pdf6 from '../../../krutanic/Cyber Security.pdf' ;
import pdf7 from '../../../krutanic/Data Analytics.pdf' ;
import pdf8 from '../../../krutanic/Data Science.pdf' ;
import pdf9 from '../../../krutanic/Dev ops.pdf' ;
import pdf10 from '../../../krutanic/Digital Marketing.pdf' ;
import pdf11 from '../../../krutanic/Embedded System.pdf' ;
import pdf12 from '../../../krutanic/Finance.pdf' ;
import pdf13 from '../../../krutanic/FinTech.pdf' ;
import pdf14 from '../../../krutanic/Full Stack Development.pdf' ;
import pdf15 from '../../../krutanic/Graphic Design.pdf' ;
import pdf16 from '../../../krutanic/Human Resource.pdf' ;
import pdf17 from '../../../krutanic/IOT and Robotics.pdf' ;
import pdf18 from '../../../krutanic/Machine Learning.pdf' ;
import pdf19 from '../../../krutanic/Nano Technology and Genetic.pdf' ;
import pdf20 from '../../../krutanic/Psychology.pdf' ;
import pdf21 from '../../../krutanic/Stock Market.pdf' ;
import pdf22 from '../../../krutanic/Supply Chain Management.pdf' ;
import pdf23 from '../../../krutanic/UI  UX-min.pdf' ;



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
        pdf: `${pdf14}`,
        description:
          "Building and managing both the front-end and back-end of websites.",
        rating: 4.7,
        studentsTaken: 2298,
      },
      {
        id: 2,
        title: "Android App Development",
        image: `${android}`,
        pdf: `${pdf1}`,
        description:
          "Designing and developing mobile apps for Android devices.",
        rating: 4.9,
        studentsTaken: 1980,
      },
      {
        id: 3,
        title: "Artificial Intelligence",
        image: `${artificial}`,
        pdf: `${pdf2}`,
        description:
          "Creating systems that simulate human intelligence for tasks like decision-making.",
        rating: 4.8,
        studentsTaken: 2340,
      },
      {
        id: 4,
        title: "Machine Learning",
        image: `${machine}`,
        pdf: `${pdf18}`,
        description:
          "Teaching machines to recognize patterns and make predictions from data.",
        rating: 4.7,
        studentsTaken: 2456,
      },
      {
        id: 5,
        title: "Cyber Security",
        image: `${cyber}`,
        pdf: `${pdf6}`,
        description:
          "Protecting networks, systems, and data from cyber attacks.",
        rating: 4.9,
        studentsTaken: 2409,
      },
      {
        id: 6,
        title: "Data Science",
        image: `${datascience}`,
        pdf: `${pdf8}`,
        description:
          "Analyzing large data sets to extract insights and inform decisions.",
        rating: 4.8,
        studentsTaken: 2699,
      },
      {
        id: 7,
        title: "Data Analytics",
        image: `${dataanalytics}`,
        pdf: `${pdf7}`,
        description:
          "Interpreting data to help businesses improve performance and make decisions.",
        rating: 4.7,
        studentsTaken: 2690,
      },
      {
        id: 8,
        title: "UI/UX Design",
        image: `${uiux}`,
        pdf: `${pdf23}`,
        description:
          "Designing intuitive user interfaces and ensuring a positive experience.",
        rating: 4.9,
        studentsTaken: 2590,
      },
      {
        id: 9,
        title: "DevOps",
        image: `${devops}`,
        pdf: `${pdf9}`,
        description: "Implement DevOps practices for software development.",
        rating: 4.8,
        studentsTaken: 1899,
      },
    ],
    Management: [
      {
        id: 10,
        title: "Business Analytics",
        image: `${bussinessanalytics}`,
        pdf: `${pdf4}`,
        description: "Using data to optimize business decisions and strategies",
        rating: 4.7,
        studentsTaken: 2102,
      },
      {
        id: 11,
        title: "Finance",
        image: `${finance}`,
        pdf: `${pdf12}`,
        description:
          "Managing money, investments, and financial planning for individuals or companies.",
        rating: 4.8,
        studentsTaken: 2076,
      },
      {
        id: 12,
        title: "Human Resource",
        image: `${hr}`,
        pdf: `${pdf16}`,
        description:
          "Overseeing recruitment, employee development, and organizational culture.",
        rating: 4.9,
        studentsTaken: 2087,
      },
      {
        id: 13,
        title: "Digital Marketing",
        image: `${digitalmarketing}`,
        pdf: `${pdf10}`,
        description:
          " Promoting products and services through digital channels like social media and search engines.",
        rating: 4.7,
        studentsTaken: 2257,
      },
      {
        id: 14,
        title: "Stock Marketing",
        image: `${stockmarketing}`,
        pdf: `${pdf21}`,
        description:
          "Trading stocks, bonds, and other securities in financial markets.",
        rating: 4.8,
        studentsTaken: 980,
      },
      {
        id: 15,
        title: "Supply Chain Management",
        image: `${supplychainmanagement}`,
        pdf: `${pdf22}`,
        description:
          "Managing the production, distribution, and delivery of products.",
        rating: 4.7,
        studentsTaken: 1069,
      },
      {
        id: 16,
        title: "Graphics Design",
        image: `${graphicdesign}`,
        pdf: `${pdf15}`,
        description: "Creating visual content for digital and print media.",
        rating: 4.9,
        studentsTaken: 2669,
      },
      {
        id: 17,
        title: "Fintech",
        image: `${fintech}`,
        pdf: `${pdf13}`,
        description:
          "Technology to improve financial services like banking, payments, and investments.",
        rating: 4.8,
        studentsTaken: 1250,
      },
    ],
    "Electronics/Electrical": [
      {
        id: 18,
        title: "Embedded System",
        image: `${embeddedsystem}`,
        pdf: `${pdf11}`,
        description:
          "Designing computer systems integrated into devices for specific functions.",
        rating: 4.9,
        studentsTaken: 1645,
      },
      {
        id: 19,
        title: "Cloud Computing",
        image: `${cloudcomputing}`,
        pdf: `${pdf5}`,
        description:
          "Providing scalable computing resources and storage via the internet.",
        rating: 4.8,
        studentsTaken: 2156,
      },
      {
        id: 20,
        title: "IOT & Robotics",
        image: `${iotandrobotics}`,
        pdf: `${pdf17}`,
        description:
          "Developing robots and devices that communicate over the internet to perform tasks.",
        rating: 4.7,
        studentsTaken: 1260,
      },
    ],
    Medical: [
      {
        id: 21,
        title: "Nano Technology & Genetic Engineering",
        image: `${nano}`,
        pdf: `${pdf19}`,
        description:
          " Modifying organisms’ genes or manipulating matter at a microscopic level for innovation.",
        rating: 4.9,
        studentsTaken: 890,
      },
      {
        id: 22,
        title: "Psychology",
        image: `${psycho}`,
        pdf: `${pdf20}`,
        description:
          "Studying mental processes and behavior to understand and address human conditions.",
        rating: 4.8,
        studentsTaken: 709,
      },
    ],
    "Mechanical/Civil": [
      {
        id: 23,
        title: "Auto Cad",
        image: `${autocad}`,
        pdf: `${pdf3}`,
        description:
          "Using software to create detailed 2D and 3D designs for engineering and architecture.",
        rating: 4.7,
        studentsTaken: 999,
      },
    ],
  };

  return (
    <div>
      <div className="container mx-auto">
        <h1
          data-aos="fade-up"
          className=" font-bold text-center text-[#f15b29] mb-10"
        >
          | Our Mentorship Courses
        </h1>
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

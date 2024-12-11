import React, { useState } from "react";
import fullStack from "../../assets/mentorshipcourses/full stack.png";
import artificial from "../../assets/mentorshipcourses/AI.png";
import dataanalytics from "../../assets/mentorshipcourses/DA.jpg";
import cloudcomputing from "../../assets/mentorshipcourses/cloud computing.png";
import datascience from "../../assets/mentorshipcourses/Data science.png";
import digitalmarketing from "../../assets/mentorshipcourses/digital marketing.png";


const PopularCourse = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const popularCourses = [
    {
      id: 1,
      title: "Full Stack Web Developer",
      description: "Building and managing both the front-end and back-end of websites",
      rating: 4.7,
      studentsTaken: 2500,
      image: `${fullStack}`,
      },
    {
      id: 2,
      title: "Artificial Intelligence",
      description: "Creating systems that simulate human intelligence for tasks like decision-making.",
        rating: 4.8,
        studentsTaken: 2100,
      image: `${artificial}`,
      },
    {
      id: 3,
      title: "Data Analytics",
      description: "Interpreting data to help businesses improve performance and make decisions.",
        rating: 4.7,
        studentsTaken: 2300,
      image: `${dataanalytics}`,
      },
    {
      id: 4,
      title: "Cloud Computing",
      description: "Providing scalable computing resources and storage via the internet.",
        rating: 4.8,
        studentsTaken: 2400,
      image: `${cloudcomputing}`,
      },
    {
      id: 5,
      title: "Data Science",
      description: "Analyzing large data sets to extract insights and inform decisions.",
      rating: 4.8,
      studentsTaken: 2600,
      image: `${datascience}`,
      },
    {
      id: 6,
      title: "Digital Marketing",
      description: "Promoting products and services through digital channels like social media and search engines.",
        rating: 4.7,
        studentsTaken: 2000,
      image: `${digitalmarketing}`,
      },
  ];


  return (
    <section className="py-[60px] px-[10px]">
      <div className="container mx-auto">
        <h2
          data-aos="fade-up"
          className="text-3xl font-bold text-center text-[#f15b29] mb-10"
        >
          | Our Popular Courses
        </h2>
        <div
          data-aos="fade-up"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:px-24"
        >
          {popularCourses.map((course) => (
            <div
              key={course.id}
              className={`border rounded-lg overflow-hidden shadow-lg group transition duration-300 ${
                hoveredId && hoveredId !== course.id
                  ? "lg:filter lg:blur-sm"
                  : ""
              }`}
              onMouseEnter={() => setHoveredId(course.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={course.image}
                alt={course.title}
                loading="lazy"
                className="w-full h-48 object-cover"
              />
              <div className="px-2 py-3">
                <h3 className="text-xl font-semibold mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-300">{course.description}</p>
                <p className="mb-2">{course.rating} <span className="text-[#f15b29]">★★★★</span>★ ({course.studentsTaken}) </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourse;

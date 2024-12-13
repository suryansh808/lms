import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// certificate starts
import certificate1 from "../assets/certificates/Certificate  of internship.png";
import certificate2 from "../assets/certificates/Certificate of Excellence.png";
import certificate3 from "../assets/certificates/Certificate Of Training Completion.png";
import wiprologo from "../assets/certificates/wipro.svg";
import aicte from "../assets/poplogo/aicte.png";
import iso from "../assets/poplogo/iso.png";
import mca from "../assets/poplogo/mca.png";
import msme from "../assets/poplogo/msme.png";
//certificate ends

import Testimonial from "../Components/testimonial";
import FAQMentor from "./Mentorship/FAQMentor";
import EnrollMentor from "./Mentorship/EnrollMentor";
import PopularCourse from "./Mentorship/PopularCourse"; 
import CourseMentor from "./Mentorship/CourseMentor";
import Getintouch from "../Components/Getintouch";
import { useNavigate } from "react-router-dom";
import MentorShipMentors from "../Components/MentorShipMentors";

const Mentorship = () => {


  const courseSectionRef = useRef(null);
  const scrollToCourse = () => {
    courseSectionRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    AOS.init({ duration: 2000, once: false });
  }, []);

  const settings = {
    slidesToShow: 3,
    dots: false,
    arrow: false,
    responsive: [
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/FeeStructure");
  };

  return (
    <div id="mentorship" className="text-white bg-black">
      {/* Hero Section */}
      <section id="mentorshipbg" className="h-[650px] shadow-lg shadow-[#f15b29]  flex  items-center justify-center py-[60px] px-[10px] overflow-hidden">
        <div className="container mx-auto">
        <div data-aos="fade-up" className="rounded-lg backdrop-blur-xl text-center bg-[#ffffff46]">      
            <div className="flex flex-col  items-center justify-center lg:py-[20px]">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-black mb-6">
                Discover a new way of learning with our{" "}
                <span className="text-[#f15b29]">MENTORSHIP PROGRAM.</span>
              </h1>
              <p className="text-lg text-black mb-6">
                Get personalized guidance from experienced mentors to help you
                reach your career and personal goals. Whether you're building
                new skills, advancing in your field, or exploring new
                opportunities, our Mentorship Program offers expert advice and
                support to help you succeed.
              </p>
              <button
                onClick={scrollToCourse}
                className=" border border-[#f15b29] text-black px-6 py-3 rounded-md font-semibold"
              >
                Explore Courses Catolog
              </button>
            </div>
        </div>
        </div>
      
      </section>
      
      <hr className=" opacity-10"/>

      <section ref={courseSectionRef} className="py-[60px] px-[10px]">
        <CourseMentor />
      </section>
       <hr className=" opacity-10"/>

      <section className="py-[60px] px-[10px]">
        <PopularCourse />
      </section>
       <hr className=" opacity-10"/>

      {/* certification section */}
      <section className="py-[60px] px-[10px]"> 
        <div className="container mx-auto">
          <h1
            data-aos="fade-up"
            className=" font-bold text-[#f15b29] mb-2 text-center justify-center"
          >
            | Certification Overview
          </h1>
          <div className="p-6">
            <div data-aos="fade-up">
              <div className="flex items-center flex-col lg:flex-row px-3 gap-5 py-2">
                {/* Left Section */}
                <div className="lg:w-1/2 w-full">
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-white">
                      Program Highlight
                    </h2>
                    <p className="text-gray-300"></p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#f15b29] p-2 rounded-lg">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <p className="text-white">
                        Tailored for business leaders, advisors, and innovators.
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="bg-[#f15b29] p-2 rounded-lg">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          />
                        </svg>
                      </div>
                      <p className="text-white">
                        Promotes skill development and creativity for career
                        advancement.
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="bg-[#f15b29] p-2 rounded-lg">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <p className="text-white">100+ Internship Partners</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="bg-[#f15b29] p-2 rounded-lg">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <div className="text-white flex items-center gap-2 w-full">
                        <p> Accreditation from</p>
                        <img
                          src={wiprologo}
                          alt="logo"
                          className="lg:h-10 h-9 hover:scale-110 duration-500 ease-linear"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="lg:w-1/2 w-full">
                  <div className="">
                    <div className="">
                      <Slider {...settings}>
                        <div className="px-2">
                          <img
                            src={certificate1}
                            alt="Program Image 1"
                            className="w-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="px-2">
                          <img
                            src={certificate2}
                            alt="Program Image 2"
                            className="w-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="px-2">
                          <img
                            src={certificate3}
                            alt="Program Image 3"
                            className="w-full object-cover rounded-lg"
                          />
                        </div>
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
              <div className="brandlogo">
                <img
                  className="hover:scale-110 ease-linear duration-300"
                  src={aicte}
                  alt=""
                />
                <img
                  className="hover:scale-110 ease-linear duration-300"
                  src={iso}
                  alt=""
                />
                <img
                  className="hover:scale-110 ease-linear duration-300"
                  src={mca}
                  alt=""
                  style={{ filter: "invert(1) contrast(100%)" }}
                />
                <img
                  className="hover:scale-110 ease-linear duration-300"
                  src={msme}
                  alt=""
                  style={{ filter: "invert(1)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
       <hr className=" opacity-10"/>

      {/* Testimonials Section */}
      <section id="advancesection" className="py-[60px] px-[10px]">

         <h1 data-aos='fade-up' className="text-center text-[#f15b29]"> | What Our Mentees Are Saying</h1>
       
        <div data-aos='fade-up' className="testimonial">
          <Testimonial />
        </div>
      </section>

      {/* fee structure reference  */}
      <section className="py-[60px] px-[10px]">
        <div className="container mx-auto flex items-center justify-center">
          <div className="text-center">
            <h1 className=" font-bold text-[#f15b29] mb-4">
              Want to Know the Fee Structure?
            </h1>
            <p className="text-white mb-6">
            Find detailed information about our mentorship program and fees on the subsequent page.
            </p>
            <button
              onClick={handleNavigate}
              className="bg-[#f15b29] hover:bg-[#f15b29] text-white font-semibold py-2 px-4 rounded"
            >
              View Pricing Information
            </button>
          </div>
        </div>
      </section>
       <hr className=" opacity-10"/>


        {/* mentors section */}
      <section className="py-[60px] px-[10px]">
        <div>
          <MentorShipMentors/>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-[60px] px-[10px]">
        <FAQMentor />
      </section>

      {/* enrollement section */}
      <section className="py-[60px] px-[10px]">
        <EnrollMentor />
      </section>
 
       <section>
        <Getintouch/>
       </section>
         
    </div>
  );
};

export default Mentorship;

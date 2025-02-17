import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";

import axios from "axios";
import { RiCustomerService2Fill } from "react-icons/ri";
import pdfpmm from "../../../krutanic/Product management Advanced program.pdf";

import BenefitsofLearning from "./Components/BenefitsofLearning";
import Certification from "./Components/Certification";
import StoreSection from "./Components/StoreSection";

import PM from "../../assets/Advanced Course Images/Product management/prdtman.png";
import curriculumimage from "../../assets/Advanced Course Images/Product management/pm.jpg";
import API from '../../API';
import toast ,{Toaster} from 'react-hot-toast';
import ApplyNowButton from "./Components/ApplyNowButton";
import ApplyForm from "./Components/ApplyForm";
const ProductManagement = () => {
  const [activeCategory, setActiveCategory] = useState("Program");
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    currentRole: "",
    experience: "",
    goal: "",
    goalOther: "",
    domain: "",
    domainOther: "",
    interestedDomain: "",
  });

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const courseTopics = [
    { title: "Product Development and Roadmap Creation", icon: "🌐" },
    { title: "Agile and Lean Product Management", icon: "🎣" },
    { title: "User-Centered Design and UX/UI Principles", icon: "⚡" },
    { title: "Market Research and Competitive Analysis", icon: "🛣️" },
    { title: "Product Marketing and Launch Strategies", icon: "🗃️" },
    { title: "Data-Driven Decision Making", icon: "🗃️" },
  ];

  const modules = [
    {
      title: "Product Development and Roadmap Creation",
      objectives:
        "Learn how to create effective product roadmaps and develop products from concept to delivery.",
      topics: [
        "Product Vision and Strategy",
        "Roadmap Planning and Prioritization",
        "Cross-functional Collaboration",
        "User Stories and Requirements Gathering",
        "Product Lifecycle Management",
      ],
    },
    {
      title: "Agile and Lean Product Management",
      objectives:
        "Master Agile and Lean methodologies to streamline product development and create value-driven products.",
      topics: [
        "Agile and Scrum Frameworks",
        "Product Backlogs and Sprint Planning",
        "Iterative Development Process",
        "Lean Product Development",
        "Continuous Improvement",
      ],
    },
    {
      title: "User-Centered Design and UX/UI Principles",
      objectives:
        "Focus on creating products that meet user needs by applying UX/UI principles and user-centered design methods.",
      topics: [
        "UX Research and User Testing",
        "Wireframing and Prototyping",
        "Usability Testing",
        "Designing for User Experience",
        "UI Design Fundamentals",
      ],
    },
    {
      title: "Market Research and Competitive Analysis",
      objectives:
        "Learn how to conduct thorough market research and analyze competitors to shape product strategies.",
      topics: [
        "Market Research Methods",
        "Identifying Customer Needs and Pain Points",
        "Competitor Analysis",
        "topiProduct Positioning and Differentiationcs",
        "SWOT Analysis",
      ],
    },
    {
      title: "Product Marketing and Launch Strategies",
      objectives:
        "Gain the skills to market and launch products effectively, ensuring they meet market demands and drive user engagement.",
      topics: [
        "Go-to-Market Strategies",
        "Product Launch Planning",
        "Marketing Channels and Campaigns",
        "Customer Acquisition and Retention",
        "Metrics and KPIs for Product Success",
      ],
    },
  ];

  const jobRoles = [
    {
      title: "Product Manager",
      description: "Oversees product development, strategy, and launch.",
    },
    {
      title: "Product Marketing Manager",
      description:
        "Focuses on market research, positioning, and go-to-market strategies.",
    },
    {
      title: "UX/UI Designer",
      description: "Designs intuitive user experiences and interfaces.",
    },
    {
      title: "Product Owner",
      description:
        "Prioritizes product backlog and ensures the product meets user needs.",
    },
    {
      title: "Product Analyst",
      description:
        "Analyzes product performance and user feedback to recommend improvements.",
    },
    {
      title: "Growth Product Manager",
      description:
        "Leads the team through the development process, from ideation to delivery.",
    },
    {
      title: "Product Development Lead",
      description:
        "Oversees product design, development, and delivery to meet market needs",
    },
    {
      title: "VP of Product Management",
      description:
        "Leads product strategy, development, and team alignment with business goals.",
    },
    {
      title: "Chief Product Officer (CPO)",
      description:
        "Shapes vision, innovation, and execution of company-wide product strategy.",
    },
  ];

  const Difference = [
    {
      title: "High Demand",
      description:
        "Product managers are in high demand as companies focus on developing and optimizing products that meet market needs.",
      icon: "👥",
    },
    {
      title: " Competitive Salaries",
      description:
        "Product management roles offer lucrative pay, reflecting the critical nature of the position in driving product success.",
      icon: "📘",
    },
    {
      title: "Diverse Roles",
      description:
        "Product managers work in various industries and can specialize in different aspects like product strategy, user experience, or growth.",
      icon: "📦",
    },
    {
      title: "Impactful Work",
      description:
        "Product managers play a key role in shaping products that directly impact customers and the company’s bottom line.",
      icon: "💼",
    },
    {
      title: "Cross-Functional Collaboration",
      description:
        "Product management requires working closely with teams across marketing, design, engineering, and sales, offering a dynamic work environment.",
      icon: "💻",
    },
    {
      title: "Growth Opportunities",
      description:
        "Explore growth opportunities in product management: develop leadership skills, embrace innovation, drive user-focused strategies, and expand market impact.",
      icon: "🔗",
    },
  ];

  const faqData = {
    Program: [
      {
        question: "What topics are covered in the Product Management program?",
        answer:
          "The program covers product development, Agile and Lean methodologies, market research, product marketing, and data-driven decision-making.",
      },
      {
        question: "How is the course delivered?",
        answer:
          "The course is delivered online with live sessions, recorded lectures, hands-on workshops, and real-world projects.",
      },
      {
        question: "Will I get hands-on experience?",
        answer:
          "Yes, the program includes real-world case studies, product development simulations, and project-based learning.",
      },
      {
        question: "How long is the program?",
        answer:
          "The program is 6 months long, with flexible learning options designed for professionals.",
      },
    ],
    Eligibility: [
      {
        question: "What are the prerequisites for the program?",
        answer:
          "Basic knowledge of business management or a background in product development is recommended.",
      },
      {
        question: "Do I need prior experience in product management?",
        answer:
          "No, this course is suitable for both beginners and those looking to enhance their product management skills.",
      },
      {
        question: "Can beginners apply?",
        answer:
          "Yes, the program is designed for beginners with an interest in learning product management.",
      },
      {
        question: "Is there an age restriction?",
        answer:
          "No, the program is open to individuals of all ages who meet the basic eligibility criteria.",
      },
    ],
    Community: [
      {
        question: "How can I interact with other participants?",
        answer:
          "You can engage with peers through discussion forums, group projects, and networking events.",
      },
      {
        question: "Is mentorship available?",
        answer:
          "Yes, personalized mentoring from industry professionals will guide you throughout the course.",
      },
      {
        question: "Can I access support after the course ends?",
        answer:
          "Yes, you’ll have continued access to community forums, alumni events, and ongoing support.",
      },
      {
        question: "How diverse is the community?",
        answer:
          "Our community is global, with professionals from various industries and backgrounds.",
      },
    ],
    Lectures: [
      {
        question: "Are the lectures pre-recorded or live?",
        answer:
          "The program includes both live sessions and pre-recorded lectures for flexibility.",
      },
      {
        question: "How interactive are the sessions?",
        answer:
          "The live sessions are highly interactive, with Q&A sessions, hands-on exercises, and real-time feedback from instructors.",
      },
      {
        question: "Can I replay the lectures if I miss one?",
        answer:
          "Yes, all recorded lectures are available on-demand for you to catch up at your convenience.",
      },
      {
        question: "How often are live sessions held?",
        answer:
          "Live sessions are scheduled weekly and designed to accommodate multiple time zones.",
      },
    ],
    Certification: [
      {
        question: "Will I receive a certificate upon completion?",
        answer:
          "Yes, you will receive an official Product Management Certification from Krutanic Solutions upon completing the program.",
      },
      {
        question: "Is the certification recognized by employers?",
        answer:
          "Yes, the certification is recognized in the industry and demonstrates your proficiency in product management.",
      },
      {
        question:
          "Can I add this certification to my resume or LinkedIn profile?",
        answer:
          "Yes, you can showcase your certification on your resume and LinkedIn profile.",
      },
      {
        question: "Is the certification free?",
        answer: "Yes, the certification is included in the course fee.",
      },
    ],
    Opportunities: [
      {
        question: "What career opportunities will this course open for me?",
        answer:
          "The program prepares you for roles like Product Manager, Product Marketing Manager, UX/UI Specialist, and more.",
      },
      {
        question: "Will I receive job placement assistance?",
        answer:
          "Yes, we offer job placement assistance, including resume reviews, interview coaching, and job search support.",
      },
      {
        question: "Are internships available through this program?",
        answer:
          "Yes, internships with partner companies are available to provide real-world experience.",
      },
      {
        question: "How will this course help in advancing my career?",
        answer:
          "By mastering product management skills, you will be equipped to take on leadership roles in product development and strategy.",
      },
    ],
  };
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos > lastScrollPos) {
        setIsVisible(true); // Show on scroll down
      } else {
        setIsVisible(false); // Hide on scroll up
      }
      setLastScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollPos]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);
  const handleBrochureClick = () => {
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e , actionType , interestedDomain ) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/advance/register`, {
        name: formData.name,
        email: formData.email,
        phone: formData.number,
        currentRole: formData.currentRole,
        experience: formData.experience,
        goal: formData.goal,
        goalOther: formData.goal === "Other" ? formData.goalOther : undefined,
        domain: formData.domain,
        domainOther: formData.domain === "Other" ? formData.domainOther : undefined,
        interestedDomain: interestedDomain,
        reason: actionType,
      });
      toast.success("Registration successful! Opening the brochure...");
      setTimeout(() => {
        window.open(pdfpmm, "_blank");
        setShowForm(false);
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Something went wrong. Please try again."
      );
    }
    setFormData({
      name: "",
      email: "",
      number: "",
      currentRole: "",
      experience: "",
      goal: "",
      goalOther: "",
      domain: "",
      domainOther: "",
      interestedDomain: "",
    });
  };
  const OffForm = () =>{
    setShowForm(false);
    setFormData({
      name: "",
      email: "",
      number: "",
      currentRole: "",
      experience: "",
      goal: "",
      goalOther: "",
      domain: "",
      domainOther: "",
    });
  }


   const [activeModule, setActiveModule] = useState(null);
  
    const toggleModule = (index) => {
      setActiveModule(activeModule === index ? null : index);
    };
  
  return (
    <div>
      <div className="bg-black text-white">
          <Toaster position="top-center" reverseOrder={false}/>
        {/*1  hero part */}
        <section
          id="advanceproductbg"
          className="py-[60px] px-[10px] shadow-lg shadow-[#f15b29] min-h-screen flex items-center justify-center"
        >
          <div className="container mx-auto">
            <div className="">
              <h1
                data-aos="fade-up"
                className="text-4xl text-center font-bold mb-3"
              >
                <span class="before:block m-2 p-1 before:absolute before:-inset-1 before:-skew-y-2 before:bg-[#f15b29] relative inline-block">
                  <i class="relative text-white ">
                    {" "}
                    Take Your Career to the Next Level with{" "}
                  </i>
                </span>

                <span class="before:block m-2 p-1 before:absolute before:-inset-1 before:-skew-y-2 before:bg-[#000] relative inline-block">
                  <i class="relative text-white ">Product Management</i>
                </span>
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div
                  data-aos="fade-up"
                  className="flex flex-col backdrop-blur-md bg-[#ffffff59] text-black items-center p-6 border border-gray-700 rounded-md"
                >
                  <div className="bg-[#f15b29] p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                      viewBox="0 0 24 24"
                      className="h-8 w-8"
                    >
                      <path d="M16 10V7a4 4 0 10-8 0v3H5v10h14V10h-3zm-6 0V7a2 2 0 114 0v3H10z" />
                    </svg>
                  </div>

                  <p className="mt-4 font-semibold text-lg">Batch Starting</p>
                  <p>15th Febraury 2025</p>
                  <p className="mt-2 text-md border border-[#f15b29] rounded-lg px-2 py-1">
                    {" "}
                    Available Cohort{" "}
                  </p>
                  <p className="mt-2 text-md"> 15/60 </p>
                </div>

                <div
                  data-aos="fade-up"
                  className="flex flex-col backdrop-blur-md bg-[#ffffff59] text-black items-center p-6 border  border-gray-700 rounded-md"
                >
                  <div className="bg-[#f15b29] p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                      viewBox="0 0 24 24"
                      className="h-8 w-8"
                    >
                      <path d="M5 3v18l7-3 7 3V3H5zm12 13l-5-2.18L7 16V5h10v11z" />
                    </svg>
                  </div>
                  <p className="mt-4 font-semibold text-lg">Duration</p>
                  <p> 6 Months </p>
                </div>

                <div
                  data-aos="fade-up"
                  className="flex flex-col backdrop-blur-md bg-[#ffffff59] text-black items-center p-6 border border-gray-700 rounded-md"
                >
                  <div className="bg-[#f15b29] p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                      viewBox="0 0 24 24"
                      className="h-8 w-8"
                    >
                      <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8zm1-13h-2v5h5v-2h-3z" />
                    </svg>
                  </div>
                  <p className="mt-4 font-semibold text-lg">Program Rating</p>
                  <p>
                    <span className="text-[#f15b29]">★★★★</span>☆ (4.7/5)
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center mt-3">
              <ApplyNowButton courseValue="Product Management"/>
            </div>
            </div>
          </div>
        </section>
        <hr className=" opacity-10" />


          {/* 4 Curriculum Section */}
          <section className="py-[60px] px-[10px]">
          <div className="container mx-auto">
            <h1
              data-aos="fade-up"
              className=" font-bold text-center mb-5 text-[#f15b29]"
            >
              | Curriculum
            </h1>
            <div className="lg:flex lg:gap-8">
             
            <div className="lg:w-1/2 w-full">
                <div className="space-y-4">
                  {modules.map((module, index) => (
                    <div key={index} className="pb-5">
                      <button
                        className="w-full text-left hover:text-[#f15b29] transition-colors duration-300 focus:outline-none"
                        onClick={() => toggleModule(index)}
                      >
                        <h3 className="text-xl font-semibold">
                          Module {index + 1}: {module.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {module.objectives}
                        </p>
                      </button>
                      {activeModule === index && (
                        <div className="mt-4">
                          <ul className="list-disc pl-9 text-gray-300">
                            {module.topics.map((topic, topicIndex) => (
                              <li key={topicIndex} className="mb-2">
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 w-full lg:h-[450px] rounded-lg overflow-hidden mb-5 lg:mb-0 ">
                 <div className="">
              <ApplyForm courseValue="Data Science"/>
            </div>
              </div>
            </div>
          </div>
        </section>
        <hr className=" opacity-10" />

        {/* 14 why choose us */}
        <section className="py-[60px] px-[10px]">
          <div className="container mx-auto text-center">
            <h1 data-aos="fade-up" className="text-[#f15b29]  font-bold mb-6">
              | Why Choose{" "}
              <span className="text-white">Product Management ? </span>
            </h1>
            <p data-aos="fade-up" className="text-gray-400 mb-12">
              Learn how to lead teams, develop innovative solutions, and bring
              exceptional products to market by mastering the principles of
              product management
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Difference.map((Difference, index) => (
                <div
                  data-aos="fade-up"
                  key={index}
                  className="bg-[#080810] p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition"
                >
                  <div className="text-[#f15b29] text-4xl mb-4">
                    {Difference.icon}
                  </div>
                  <h3 className="text-lg text-[#f15b29] font-bold  mb-3">
                    {Difference.title}
                  </h3>
                  <p className="text-white  ">{Difference.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div data-aos="fade-up" className="mt-[20px] text-center">
            And more
          </div>
        </section>
        <hr className=" opacity-10" />

        {/* 15 why learn with us */}
        <section className="py-[60px] px-[10px]">
          <BenefitsofLearning />
        </section>
        <hr className=" opacity-10" />

        {/* 2 Course Overview Section */}
        <section className="py-[60px] px-[10px]">
          <div className="container mx-auto">
            <h1
              data-aos="fade-up"
              className=" font-bold text-center mb-12 text-[#f15b29]"
            >
              |Program Overview
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {courseTopics.map((topic, index) => (
                <div
                  data-aos="fade-up"
                  key={index}
                  className="bg-[#080810] p-6 rounded-lg text-center transition-transform duration-300 hover:scale-105"
                >
                  <div className="text-4xl mb-4">{topic.icon}</div>
                  <h3 className="text-xl font-bold uppercase text-white hover:text-[#f15b29] transition-colors duration-300">
                    {topic.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
        <hr className=" opacity-10" />

        {/* 3 key outcome section  */}
        <section className="py-[60px] px-[10px]">
          <div className="container mx-auto lg:flex flex-col lg:flex-row">
            <div className=" w-full mb-3 lg:mb-0">
              <h1 data-aos="fade-up" className=" font-bold mb-4 text-[#f15b29]">
                | Key Takeaways
              </h1>
              <ul data-aos="fade-up" className="space-y-4">
                <li>
                  <span className="font-semibold text-[#f15b29]">
                    Master Product Management Frameworks{"  "}
                  </span>
                  Learn to design, develop, and launch successful products using
                  frameworks like Agile, Scrum, and Lean methodologies.
                </li>
                <li>
                  <span className="font-semibold text-[#f15b29]">
                    Develop Expertise in Product Development{"  "}
                  </span>

                  {isExpanded && (
                    <span>
                      &nbsp;Gain hands-on experience in product lifecycle
                      management, from ideation to market launch, focusing on
                      user-centric product design.
                    </span>
                  )}
                </li>
                <li>
                  <span className="font-semibold text-[#f15b29]">
                    Leverage Data for Product Strategy{"  "}
                  </span>
                  Use data analytics tools to drive product decisions, measure
                  success, and improve customer experience.
                </li>
                <span className="font-semibold text-[#f15b29]">
                  Launch and Scale Products Effectively{"  "}
                </span>
                Learn to market, launch, and scale products using strategies
                that ensure adoption and long-term success. Learn to apply A/B
                testing methodologies to refine campaigns, improve performance,
                and increase conversion rates.
                <li>
                  <span className="font-semibold text-[#f15b29]">
                    Agile Development Process.
                  </span>
                </li>
                {/* Hidden additional content */}
                {isExpanded && (
                  <>
                    <li>
                      <span className="font-semibold text-[#f15b29]">
                        Measure and Optimize Product Performance.
                      </span>
                    </li>
                    <li>
                      <span className="font-semibold text-[#f15b29]">
                        Product Performance Optimization.
                      </span>
                    </li>
                  </>
                )}
              </ul>
              <button
                data-aos="fade-up"
                onClick={toggleExpand}
                className="mt-4 px-4 py-2 text-white font-medium border  rounded"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </div>

            {/* Right side: Image */}
            <div
              data-aos="fade-up"
              className="lg:w-1/2 w-full h-[300px] rounded-lg shadow-lg shadow-[#f15b29] overflow-hidden"
            >
              <img
                src={PM}
                alt="Curriculum"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
        <hr className=" opacity-10" />

      

        {/* 5 download curriculum section */}

        <section className="py-[60px] px-[10px]">
          <div
            data-aos="fade-up"
            className="container mx-auto p-5 flex flex-col md:flex-row justify-between items-center flex-wrap gap-5 rounded-lg shadow-lg border-2 border-[#f15b29]"
          >
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold mb-2 text-[#f15b29]">
                | Get the Full Course Breakdown
              </h2>
              <p className="text-gray-400 text-sm">
                Access the detailed curriculum with key modules and learning
                outcomes of the Product Management program.
              </p>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-3">
              <button
                className="bg-[#f15b29] hover:bg-[#f15b29] text-white font-semibold py-2 px-6 rounded flex items-center gap-2"
                onClick={handleBrochureClick} // Open the form when clicked
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 8a1 1 0 011-1h12a1 1 0 011 1v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm9 4a1 1 0 10-2 0V9.707l-.293.293a1 1 0 11-1.414-1.414l2-2a1 1 0 011.414 0l2 2a1 1 0 11-1.414 1.414L12 9.707V12z"
                    clipRule="evenodd"
                  />
                </svg>
                Download
              </button>
            </div>
          </div>

          {/* Dialog Box for Form */}
          {showForm && (
                     <div className="fixed top-8 inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-[999]">
                       <div className="bg-white text-black p-3 rounded-lg shadow-lg w-96">
                         <span className="text-md float-end mb-2 font-bold border rounded-full px-2 cursor-pointer"  onClick={OffForm}>X</span>
                         <h3 className="text-md text-center font-semibold mb-2">
                           Register to Download Brochure
                         </h3>
                         <form className="space-y-2">
                           <input
                             type="text"
                             id="name"
                             name="name"
                             placeholder="Enter your name"
                             value={formData.name}
                             onChange={handleInputChange}
                             className="w-full border border-gray-300 p-1.5 rounded-md"
                             required
                           />
                           <input
                             type="email"
                             id="email"
                             name="email"
                             placeholder="Enter your email"
                             value={formData.email}
                             onChange={handleInputChange}
                             className="w-full border border-gray-300 p-1.5 rounded-md"
                             required
                           />
                           <input
                             type="text"
                             id="number"
                             name="number"
                             placeholder="Enter your phone number"
                             value={formData.number}
                             onChange={handleInputChange}
                             className="w-full border border-gray-300 p-1.5 rounded-md"
                             required
                           />
                           <select
                             id="currentRole"
                             name="currentRole"
                             value={formData.currentRole}
                             onChange={handleInputChange}
                             className="w-full border border-gray-300 p-1.5 rounded-md"
                             required
                           >
                             <option disabled value="">What do you currently do?</option>
                             <option value="Founder">Founder</option>
                             <option value="Student">Student</option>
                             <option value="Working Professional">
                               Working Professional
                             </option>
                             <option value="Self Employed">Self Employed</option>
                           </select>
                           <select
                             id="experience"
                             name="experience"
                             value={formData.experience}
                             onChange={handleInputChange}
                             className="w-full border border-gray-300 p-1.5 rounded-md"
                             required
                           >
                             <option disabled value="">Select Experience</option>
                             <option value="0 year">0 year (Fresher)</option>
                             <option value="1-2 years">1-2 years</option>
                             <option value="3-5 years">3-5 years</option>
                             <option value="5+ years">5+ years</option>
                           </select>
                           <select
                             id="goal"
                             name="goal"
                             value={formData.goal}
                             onChange={handleInputChange}
                             className="w-full border border-gray-300 p-1.5 rounded-md"
                             required
                           >
                             <option disabled value="">Goal of taking this program</option>
                             <option value="Career Transition">Career Transition</option>
                             <option value="Kickstart Career">Kickstart Career</option>
                             <option value="Upskilling">Upskilling</option>
                             <option value="Other">Other</option>
                           </select>
                           {formData.goal === "Other" && (
                             <input
                               type="text"
                               name="goalOther"
                               value={formData.goalOther}
                               onChange={handleInputChange}
                               placeholder="Please specify your goal"
                               className="w-full border border-gray-300 p-1.5 rounded-md mt-2"
                               required
                             />
                           )}
                           <select
                             id="domain"
                             name="domain"
                             value={formData.domain}
                             onChange={handleInputChange}
                             className="w-full border border-gray-300 p-1.5 rounded-md"
                             required
                           >
                             <option disabled value="">Domain currently working in</option>
                             <option value="Digital Marketing/Performance marketing">
                               Digital Marketing/Performance Marketing
                             </option>
                             <option value="Marketing/Sales">Marketing/Sales</option>
                             <option value="Management/Operations">
                               Management/Operations
                             </option>
                             <option value="IT/Tech/Product">IT/Tech/Product</option>
                             <option value="Other">Other</option>
                           </select>
                           {formData.domain === "Other" && (
                             <input
                               type="text"
                               name="domainOther"
                               value={formData.domainOther}
                               onChange={handleInputChange}
                               placeholder="Please specify your domain"
                               className="w-full border border-gray-300 p-1.5 rounded-md mt-2"
                               required
                             />
                           )}
                           <div className="flex justify-center gap-2">
                             <button
                               type="submit"
                               onSubmit={(e) => handleFormSubmit(e, 'Only Download Brochure' , 'Product Management')}
                               className="px-4 py-2 w-full bg-[#f15b29] text-white rounded-md"
                             >
                              <i class="fa fa-download"></i>
                             </button>
                             <button
                               type="submit"
                               onSubmit={(e) => handleFormSubmit(e, 'Requested To Call Back' , 'Product Management')}
                               className="px-4 py-2 w-full bg-[#f15b29] flex items-center justify-center gap-1 text-white rounded-md"
                             >
                            <i class="fa fa-download"></i> + <RiCustomerService2Fill />
                             </button>
                           </div>
                         </form>
                       </div>
                     </div>
                   )}
        </section>

        {/* 7 alumni section  */}
        <hr className=" opacity-10" />

        {/* 13 job roles section  */}
        <section className="py-[60px] px-[10px]">
          <div className="container mx-auto">
            <h1
              data-aos="fade-up"
              className="text-[#f15b29] text-center  font-bold mb-8"
            >
              | Career Opportunities in{" "}
              <span className="text-white font-bold">Data Science</span>
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobRoles.map((role, index) => (
                <div
                  data-aos="fade-up"
                  key={index}
                  className="border-l-4 border-[#f15b29] bg-[#080810] rounded-md p-4 text-white shadow-lg"
                >
                  <h3 className="text-xl font-semibold mb-4">{role.title}</h3>
                  <p>{role.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div data-aos="fade-up" className="mt-[20px] text-center">
            And more
          </div>
        </section>
        <hr className=" opacity-10" />

        {/* 12 key highlight section */}
        <section className="py-[60px] px-[10px]">
          <div className="container mx-auto">
            <div className=" gap-5">
              <div className=" w-full mb-8 lg:mb-0">
                <h1
                  data-aos="fade-up"
                  className=" text-center font-bold mb-6 text-[#f15b29]"
                >
                  | Course Benefits at a Glance
                </h1>
                <p data-aos="fade-up" className="text-lg text-center mb-8">
                  Master advanced{" "}
                  <span className="text-[#f15b29] font-bold">
                    Product Management
                  </span>{" "}
                  techniques with hands-on projects, expert-led sessions, and
                  real-world applications.
                </p>
                <div
                  data-aos="fade-up"
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  <div className=" p-6 rounded-lg text-center">
                    <h3 className="text-3xl font-bold text-[#f15b29]">200+</h3>
                    <p className="mt-2 text-gray-300">Mentees Placed</p>
                  </div>
                  <div className=" p-6 rounded-lg text-center">
                    <h3 className="text-3xl font-bold text-[#f15b29]">
                      10+ LPA
                    </h3>
                    <p className="mt-2 text-gray-300">Average CTC</p>
                  </div>
                  <div className=" p-6 rounded-lg text-center">
                    <h3 className="text-3xl font-bold text-[#f15b29]">93%</h3>
                    <p className="mt-2 text-gray-300">Placement Rate</p>
                  </div>
                  <div className=" p-6 rounded-lg text-center">
                    <h3 className="text-3xl font-bold text-[#f15b29]">450+</h3>
                    <p className="mt-2 text-gray-300">Hiring Partners</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr className=" opacity-10" />

        {/* 8 Certification section */}
        <section className="py-[60px] px-[10px]">
          <div data-aos="fade-up">
            <Certification />
          </div>
        </section>
        <hr className=" opacity-10" />

        {/* 9 mentors section  */}
        {/* <section className="py-[60px] px-[10px]">
          <div data-aos="fade-up" className="container mx-auto">
            <MentorSection />
          </div>
        </section>
        <hr className=" opacity-10" /> */}

        {/* 16 store section  */}
        <section className="py-[60px] px-[10px] bg-white">
          <StoreSection />
        </section>

        {/* 17 new FAQ section */}
        <section className="py-[60px] px-[10px] bg-white">
          <div data-aos="fade-up" className="container mx-auto">
            <h1 className="text-center mb-2  font-bold text-black">
              | Ask Us Anything
            </h1>
            <div className="flex justify-center   flex-col md:flex-row">
              {/* Sidebar */}
              <div className="md:w-1/6 w-full p-3 border-r border-b md:border-b-0 text-black border-[#f15b29]">
                <ul className="space-y-2">
                  {Object.keys(faqData).map((category) => (
                    <li
                      key={category}
                      onClick={() => {
                        setActiveCategory(category);
                        setOpenFAQ(null); // Reset any open question
                      }}
                      className={`cursor-pointer border font-bold text-black py-2 px-4 rounded-lg ${
                        activeCategory === category ? " text-[#f15b29]" : ""
                      }`}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQ Content */}
              <div className="md:w-3/4 w-full p-3">
                <h2 className="text-2xl font-bold mb-4 text-[#f15b29]">
                  {activeCategory} :
                </h2>
                <ul className="space-y-4 ">
                  {faqData[activeCategory].map((faq, index) => (
                    <li
                      className="border  overflow-hidden rounded-lg "
                      key={index}
                    >
                      <button
                        onClick={() =>
                          setOpenFAQ(openFAQ === index ? null : index)
                        }
                        className="w-full text-left text-black py-3 px-5  flex justify-between items-center"
                      >
                        {faq.question}
                        <span className="text-[#f15b29] font-bold text-2xl">
                          {openFAQ === index ? "-" : "+"}
                        </span>
                      </button>
                      {openFAQ === index && (
                        <div className="p-4 border-t bg-slate-100 text-black">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 11 scrolling section */}
        <section className="">
          <div
            className={`fixed bottom-0 left-0 w-full bg-white z-10 shadow-md flex justify-between items-center p-4   transition-transform duration-300 ${
              isVisible ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <p className="text-lg font-semibold text-black">
              Program fees 84,958/- Inculding GST
            </p>
            <div className="flex space-x-4">
              <button className="flex items-center px-3 py-2 border rounded-md text-white bg-black  hover:text-[#f15b29]">
                <a
                  href="https://rzp.io/rzp/advanced-training-program"
                  target="blank"
                  className="text-[#f15b29] whitespace-nowrap"
                >
                  Enroll Now
                </a>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductManagement;

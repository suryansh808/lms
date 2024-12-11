import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";
import MentorSection from "../../Components/MentorSection";
import Testimonial from "../../Components/testimonial";
import Alumni from "../../Components/Alumni";
import BenefitsofLearning from "./Components/BenefitsofLearning";
import Skills from "./Components/Skills";
import Certification from "./Components/Certification";
import StoreSection from "./Components/StoreSection";
import ApplyNowButton from "./Components/ApplyNowButton";

const Proformancemarket = () => {
  const [activeCategory, setActiveCategory] = useState("Program");
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollPos, setLastScrollPos] = useState(0);


  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const courseTopics = [
    { title: "Advanced Paid Media Campaign Strategiescs", icon: "🌐" },
    { title: "Conversion Rate Optimization (CRO)", icon: "🎣" },
    { title: "Data-Driven Marketing Analytics", icon: "⚡" },
    { title: "Social Media Ads and PPC Management", icon: "🛣️" },
    { title: "A/B Testing and Campaign Optimization", icon: "🗃️" },
    { title: "Attribution Models and ROI Measurement", icon: "🗃️" },
  ];

  const modules = [
    {
      title: "Advanced Paid Media Campaign Strategies",
      objectives:
        "Learn advanced techniques for running highly targeted paid media campaigns on platforms like Google Ads and Facebook.",
      topics: [
        "Google Ads Campaigns",
        "Facebook and Instagram Ads",
        "Bing Ads and Retargeting",
        "toBudget Allocation and Bidding Strategies",
        "Campaign Reporting and Analytics",
      ],
    },
    {
      title: "Conversion Rate Optimization (CRO)",
      objectives:
        "Master the strategies and tools for optimizing landing pages and websites to increase conversions.",
      topics: [
        "Landing Page Optimization",
        "Heatmaps and User Behavior Analysis",
        "A/B Testing and Multivariate Testing",
        "Funnel Analysis and Optimization",
        "Tools for CRO (Optimizely, Unbounce)",
      ],
    },
    {
      title: "Data-Driven Marketing Analytics",
      objectives:
        "Understand how to leverage data to optimize campaigns and measure ROI effectively.",
      topics: [
        "Google Analytics for Campaigns",
        "Metrics and KPIs for Performance Marketing",
        "Attribution Models",
        "Audience Segmentation and Targeting",
        "Data Visualization and Reporting",
      ],
    },
    {
      title: "Social Media Ads and PPC Management",
      objectives:
        "Learn to design and manage successful PPC and social media ad campaigns to boost traffic and engagement.",
      topics: [
        "Facebook Ads Manager",
        "Instagram and LinkedIn Ads",
        "Google Display Network",
        "Paid Search Campaigns",
        "Social Media Strategy and Budgeting",
      ],
    },
    {
      title: "A/B Testing and Campaign Optimization",
      objectives:
        "Apply A/B testing strategies to optimize ad creatives, landing pages, and campaigns for better performance.",
      topics: [
        "Testing Ad Copy and Creatives",
        "Measuring and Analyzing Test Results",
        "Continuous Campaign Optimization",
        "Best Practices for A/B Testing",
        "Tools for A/B Testing (VWO, Google Optimize)",
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos > lastScrollPos) {
        setIsVisible(true); 
      } else {
        setIsVisible(false); 
      }
      setLastScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollPos]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
 

  const jobRoles = [
    {
      title: "Performance Marketing Manager",
      description:
        "Leads paid campaigns and optimizes performance across platforms.",
    },
    {
      title: "PPC Specialist",
      description:
        "Manages paid search and display advertising campaigns to maximize conversions.",
    },
    {
      title: "Social Media Ads Specialist",
      description:
        "Creates and optimizes paid ad campaigns on social media platforms like Facebook, Instagram, and LinkedIn.",
    },
    {
      title: "Conversion Rate Optimization (CRO) Specialist",
      description:
        "Focuses on improving the conversion rates of landing pages and websites.",
    },
    {
      title: "Marketing Analyst",
      description:
        "Analyzes data and campaign performance to optimize marketing strategies.",
    },
    {
      title: "Campaign Manager",
      description:
        "Oversees digital marketing campaigns, including strategy development, execution, and optimization.",
    },
  ];

  const Difference = [
    {
      title: "Data-Driven Results",
      description:
        "Focuses on measurable outcomes, using metrics like CTR, CPC, and ROAS to optimize campaigns.",
      icon: "👥",
    },
    {
      title: "High Earnings",
      description:
        "Performance-based pay leads to lucrative compensation tied to campaign success.",
      icon: "📘",
    },
    {
      title: "Constant Optimization",
      description:
        "The role is dynamic, requiring ongoing adjustments to campaigns for improved performance.",
      icon: "📦",
    },
    {
      title: "Cross-Channel Expertise",
      description:
        "Involves working with multiple channels like PPC and social media to drive conversions.",
      icon: "💼",
    },
    {
      title: "Impactful Outcomes",
      description:
        "Directly contributes to a company’s revenue growth through optimized campaigns.",
      icon: "💻",
    },
    {
      title: "Fast-Paced Growth",
      description:
        "The need for constant analysis and refinement ensures you’re always learning and improving.",
      icon: "🔗",
    },
  ];

  const faqData = {
    Program: [
      {
        question:
          "What topics are covered in the Performance Marketing program?",
        answer:
          "The program covers advanced paid media campaigns, conversion rate optimization (CRO), A/B testing, social media ads, and performance marketing analytics.",
      },
      {
        question: "How is the course delivered?",
        answer:
          "The course is delivered online with a mix of live sessions, recorded lectures, hands-on workshops, and real-world projects.",
      },
      {
        question: "Will I get hands-on experience?",
        answer:
          "Yes, the course includes live projects, case studies, and campaign management, providing real-world experience in performance marketing.",
      },
      {
        question: "How long is the program?",
        answer:
          "The program runs for 6 months, with flexible schedules suitable for working professionals.",
      },
    ],
    Eligibility: [
      {
        question: "What are the prerequisites for the program?",
        answer:
          "Basic knowledge of digital marketing or familiarity with online platforms is recommended but not mandatory.",
      },
      {
        question: "Do I need a background in performance marketing?",
        answer:
          "No, this course is suitable for both beginners and individuals looking to expand their marketing skills.",
      },
      {
        question: "Can beginners apply?",
        answer:
          "Yes, the program is designed for beginners who want to master performance marketing strategies.",
      },
      {
        question: "Is there any age restriction?",
        answer:
          "No, the course is open to learners of all ages who meet the basic eligibility criteria.",
      },
    ],
    Community: [
      {
        question: "How can I interact with other participants?",
        answer:
          "Engage with peers through discussion forums, group projects, and networking opportunities designed to foster collaboration and learning.",
      },
      {
        question: "Is mentorship available?",
        answer:
          "Yes, personalized mentoring from industry professionals will guide you through the course and provide valuable insights.",
      },
      {
        question: "Can I access support after the course ends?",
        answer:
          "Absolutely! Graduates have continued access to community forums, alumni events, and ongoing learning resources.",
      },
      {
        question: "How diverse is the community?",
        answer:
          "Our community is global, consisting of learners and professionals from various industries and countries.",
      },
    ],
    Lectures: [
      {
        question: "Are the lectures pre-recorded or live?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
      },
      {
        question: "How interactive are the sessions?",
        answer:
          "The live sessions are highly interactive, with opportunities for Q&A, hands-on exercises, and real-time feedback.",
      },
      {
        question: "Can I replay the lectures if I miss one?",
        answer:
          "Yes, all recorded lectures are available for on-demand viewing, so you can catch up at your convenience.",
      },
      {
        question: "How often are live sessions held?",
        answer:
          "Live sessions are scheduled weekly and are designed to accommodate learners in multiple time zones.",
      },
    ],
    Certification: [
      {
        question: "Will I receive a certificate upon completion?",
        answer:
          "Yes, you will receive an official Performance Marketing Certification from Krutanic Solutions after completing the program.",
      },
      {
        question: "Is the certification recognized by employers?",
        answer:
          "Yes, the certification is recognized within the industry and validates your expertise in performance marketing.",
      },
      {
        question:
          "Can I add this certification to my resume or LinkedIn profile?",
        answer:
          "Yes, you can add the certification to your resume and LinkedIn profile to showcase your new skills.",
      },
      {
        question: "Is the certification free?",
        answer:
          "The certification is awarded after successful completion of the course and is included in the program fee.",
      },
    ],
    Opportunities: [
      {
        question: "What career opportunities will this course open for me?",
        answer:
          "The program prepares you for roles such as Performance Marketing Manager, PPC Specialist, Social Media Ads Manager, and Campaign Manager.",
      },
      {
        question: "Will I receive job placement assistance?",
        answer:
          "Yes, we provide career support, including job placement assistance, resume reviews, and interview coaching.",
      },
      {
        question: "Are internships available through this program?",
        answer:
          "Yes, we offer internship opportunities with top companies to help you gain hands-on experience.",
      },
      {
        question: "How will this course help in advancing my career?",
        answer:
          "By mastering advanced performance marketing techniques, you’ll become a competitive candidate for senior-level roles in the digital marketing field.",
      },
    ],
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);
  return (
    <div>
      <div className="bg-black text-white">
        {/* 1 hero part */}
        <section className=" py-[50px] px-[10px] min-h-screen">
          <div className="container mx-auto">
            <div className="">
              <h1 className="text-4xl text-center font-bold mb-6">
                <span className="text-orange-700">
                  Take Your Career to the Next Level with{" "}
                  <span className="text-white font-bold ">
                    {" "}
                    Performance Marketing
                  </span>
                </span>
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                <div className="flex flex-col items-center p-6 border border-gray-700 rounded-md mt-6">
                  <div className="bg-orange-500 p-3 rounded-full">
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
                  <p className="text-orange-500">January 2024</p>
                  {/* <p className="mt-2 text-sm">5 seats left</p> */}
                </div>

                <div className="flex flex-col items-center p-6 border  border-gray-700 rounded-md mt-6">
                  <div className="bg-orange-500 p-3 rounded-full">
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
                  <p className="text-orange-500">6 Months </p>
                </div>

                <div className="flex flex-col items-center p-6 border border-gray-700 rounded-md mt-6">
                  <div className="bg-orange-500 p-3 rounded-full">
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
                  <p className="text-orange-500">★★★★☆ (4.9/5)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 14 why choose us */}
        <section className="py-[50px] px-[10px]">
          <div className="container mx-auto  text-center">
            <h2
              data-aos="fade-down"
              className="text-orange-700 text-3xl font-bold mb-6"
            >
              | Why Choose{" "}
              <span className="text-white">Performance Marketing</span>
            </h2>
            <p data-aos="fade-down" className="text-gray-400 mb-12">
              Develop the skills to create and optimize marketing campaigns that
              deliver measurable results and maximize return on investment for
              businesses
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Difference.map((Difference, index) => (
                <div
                  data-aos="fade-down"
                  key={index}
                  className="bg-[#080810] p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition"
                >
                  <div className="text-orange-500 text-4xl mb-4">
                    {Difference.icon}
                  </div>
                  <h3 className="text-lg text-orange-500 font-bold  mb-3">
                    {Difference.title}
                  </h3>
                  <p className="text-white  ">{Difference.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 15 why learn with us */}
        <section className="py-[50px] px-[10px]">
        <BenefitsofLearning/>
        </section>

        {/* 2 Course Overview Section */}
        <section className="py-[50px] px-[10px]">
          <div className="container mx-auto">
            <h2
              data-aos="fade-down"
              className="text-3xl font-bold text-center mb-12 text-orange-700"
            >
              | Program Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {courseTopics.map((topic, index) => (
                <div
                  data-aos="fade-down"
                  key={index}
                  className="bg-[#080810] p-6 rounded-lg text-center transition-transform duration-300 hover:scale-105"
                >
                  <div className="text-4xl mb-4">{topic.icon}</div>
                  <h3 className="text-xl font-bold uppercase text-white hover:text-orange-700 transition-colors duration-300">
                    {topic.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 key outcome section  */}
        <section className="py-[50px] px-[10px]">
          <div className="container mx-auto lg:flex flex-col lg:flex-row">
            {/* Left side: Key Outcomes */}
            <div className="lg:w-1/2 w-full mb-3 lg:mb-0">
              <h2  data-aos="fade-down" className="text-2xl font-bold mb-4 text-orange-700">
                | Key Takeaways
              </h2>
              <ul className="space-y-4">
                <li>
                  <span className="font-semibold text-orange-300">
                    Master Performance Marketing Campaigns
                  </span>
                  Learn to plan, execute, and optimize paid campaigns across
                  platforms like Google Ads, Facebook, and more to maximize ROI.
                </li>
                <li>
                  <span className="font-semibold text-orange-300">
                    Develop Expertise in Conversion Rate Optimization
                  </span>

                  {isExpanded && (
                    <span>
                      &nbsp;Gain hands-on experience with CRO techniques to
                      increase conversions and improve campaign performance.
                    </span>
                  )}
                </li>
                <li>
                  <span className="font-semibold text-orange-300">
                    Leverage Data-Driven Marketing Analytics
                  </span>
                  Use data analytics tools to track campaign performance,
                  optimize results, and drive targeted traffic.
                </li>
                <span className="font-semibold text-orange-300">
                  Enhance Campaigns with A/B Testing and Optimization
                </span>
                Learn to apply A/B testing methodologies to refine campaigns,
                improve performance, and increase conversion rates.
                <li>
                  <span className="font-semibold text-orange-300">
                    -- : Optimize Campaign Performance
                  </span>
                  Continuously monitor and tweak campaigns to improve key
                  metrics such as CPC, CPA, and ROI.
                </li>
                {/* Hidden additional content */}
                {isExpanded && (
                  <>
                    {/* Paragraphs */}
                    {/* <p className="mt-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fuga libero velit autem deleniti dignissimos hic, labore
                    esse iusto earum repellat?
                  </p> */}

                    <li>
                      <span className="font-semibold text-orange-300">
                        -- : Leverage Data Analytics for Insights
                      </span>
                    </li>
                    <li>
                      <span className="font-semibold text-orange-300">
                        -- : Focus on Conversion Rate Optimization (CRO)
                      </span>
                      Implement strategies to enhance user experience and
                      increase conversion rates on websites and landing pages.
                    </li>
                  </>
                )}
              </ul>
              <button
                onClick={toggleExpand}
                className="mt-4 px-4 py-2 text-white font-medium border  rounded"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </div>

            {/* Right side: Image */}
            <div data-aos="fade-down" className="lg:w-1/2 w-full rounded-xl overflow-hidden" >
              <img
                src="https://plus.unsplash.com/premium_photo-1661344287754-5b54e8feb18b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Curriculum"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* 4 Curriculum Section */}
        <section className="py-[50px] px-[10px]">
          <div className="container mx-auto">
            <h2
              data-aos="fade-down"
              className="text-3xl font-bold text-center mb-5 text-orange-700"
            >
              | Curriculum
            </h2>
            <div className="">
              {/* Modules Section */}
              <div className="space-y-4">
                {modules.map((module, index) => (
                  <div key={index} className="border-b border-gray-700 pb-4">
                    <button
                      className="w-full text-left hover:text-orange-400 transition-colors duration-300 focus:outline-none"
                      onClick={() =>
                        document
                          .getElementById(`module-${index}`)
                          .classList.toggle("hidden")
                      }
                    >
                      <h3 className="text-xl font-semibold">
                        Module {index + 1}: {module.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {module.objectives}
                      </p>
                    </button>
                    <div id={`module-${index}`} className="hidden mt-4">
                      <ul className="list-disc pl-9 text-gray-300">
                        {module.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="mb-2">
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5 download curriculum section */}
        <section className="py-[50px] px-[10px]">
          <div
            data-aos="fade-down"
            className="container mx-auto p-5 flex flex-col md:flex-row justify-between items-center flex-wrap gap-5 rounded-lg shadow-lg border-2 border-orange-600"
          >
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold mb-2 text-orange-700">
                | Get the Full Course Breakdown
              </h2>
              <p className="text-gray-400 text-sm">
                Access the detailed curriculum with key modules and learning
                outcomes of the Performance Marketing program.
              </p>
            </div>
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded flex items-center gap-2 mt-4 md:mt-0">
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
        </section>

        {/* 7 alumni section  */}
        <section className="py-[50px] px-[10px]">
          <div className="container mx-auto">
            <h2
              data-aos="fade-down"
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-700 text-center mb-12"
            >
              | Our Alumni Excel at Prestigious Brands, Including
            </h2>
            <Alumni />
          </div>
        </section>

        {/* 10 skills section */}
        <section id="ourAlumni" className="py-[50px] px-[10px]">
       <Skills/>
        </section>

        {/* 13 job roles section  */}
        <section className="py-[50px] px-[10px]">
          <div className="container mx-auto">
            <h2
              data-aos="fade-down"
              className="text-orange-700 text-center text-3xl font-bold mb-8"
            >
              | Career Opportunities in{" "}
              <span className="text-white font-bold">Performance Marketing </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobRoles.map((role, index) => (
                <div
                  key={index}
                  className="border-l-4 border-orange-700 bg-[#080810] rounded-md p-4 text-white shadow-lg"
                >
                  <h3 className="text-xl font-semibold mb-4">{role.title}</h3>
                  <p>{role.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 12 key highlight section */}
        <section className="py-[50px] px-[10px]">
          <div className="container mx-auto">
            <div className="lg:flex gap-5">
              <div className="lg:w-1/2 w-full mb-8 lg:mb-0">
                <h2
                  data-aos="fade-down"
                  className="text-2xl font-bold mb-6 text-orange-700"
                >
                  | Course Benefits at a Glance
                </h2>
                <p className="text-lg mb-8">
                  Master advanced{" "}
                  <span className="text-orange-500 font-bold">
                    Performance Marketing
                  </span>{" "}
                  techniques with hands-on projects, expert-led sessions, and
                  real-world applications.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#080810] p-6 rounded-lg text-center">
                    <h3 className="text-3xl font-bold text-orange-500">200+</h3>
                    <p className="mt-2 text-gray-300">Mentees Placed</p>
                  </div>
                  <div className="bg-[#080810] p-6 rounded-lg text-center">
                    <h3 className="text-3xl font-bold text-orange-500">
                      12+ LPA
                    </h3>
                    <p className="mt-2 text-gray-300">Average CTC</p>
                  </div>
                  <div className="bg-[#080810] p-6 rounded-lg text-center">
                    <h3 className="text-3xl font-bold text-orange-500">95%</h3>
                    <p className="mt-2 text-gray-300">Placement Rate</p>
                  </div>
                  <div className="bg-[#080810] p-6 rounded-lg text-center">
                    <h3 className="text-3xl font-bold text-orange-500">450+</h3>
                    <p className="mt-2 text-gray-300">Hiring Partners</p>
                  </div>
                </div>
              </div>
              <div
                data-aos="fade-down"
                className="lg:w-1/2 w-full bg-white rounded-lg shadow-lg p-6 text-black"
              >
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-gray-800">
                      Krutanic
                    </span>
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Get in Touch
                </h2>
                <p className="text-gray-600 mb-6">
                  For more information about the Perfomance Marketing program or
                  to discuss your career goals, feel free to contact us:
                </p>
                <button
                  onClick={handleOpenDialog}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-md"
                >
                  Connect With Us
                </button>
              </div>
            </div>
          </div>

          {isDialogOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white w-full max-w-4xl mx-auto p-6 rounded-lg shadow-lg flex flex-col md:flex-row">
                <div className="md:w-2/3 pr-6">
                  <h3 className="text-2xl font-semibold text-black mb-4">
                    Talk to Our Advisor
                  </h3>
                  <form>
                    <div className="mb-4">
                      <input
                        type="text"
                        id="name"
                        className="w-full border-b border-gray-300 rounded-md p-2"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="email"
                        id="email"
                        className="w-full border-b border-gray-300 rounded-md p-2"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="text"
                        id="phone"
                        className="w-full border-b border-gray-300 rounded-md p-2"
                        placeholder="Enter your mobile number"
                      />
                    </div>
                    <div className="mb-4">
                      <select
                        id="program"
                        className="w-full border-b border-gray-300 rounded-md p-2"
                      >
                        <option>Select Program</option>
                        <option>Web Development</option>
                        <option>Data Science</option>
                        <option>UI/UX Design</option>
                        <option>Digital Marketing</option>
                      </select>
                    </div>
                    <div className="flex justify-start">
                      <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>

                <div className="md:w-1/3 relative">
                  <img
                    src="https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Advisor"
                    className="rounded-lg w-full object-cover"
                  />
                  <button
                    onClick={handleCloseDialog}
                    className="absolute -top-6 -right-6 text-xl text-white bg-black rounded-full px-2"
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 6 testimonial section  */}
        <section id="advancesection" className="py-[50px] px-[10px]">
          <div className="container mx-auto">
            <h2
              data-aos="fade-down"
              className="text-3xl font-bold text-center  text-orange-700"
            >
              | Insights from Our Mentees
            </h2>
            <div className="testimonial">
              <Testimonial />
            </div>
          </div>
        </section>

        {/* 8 Certification section */}
        <section className="py-[50px] px-[10px]">
          <Certification/>
        </section>
 
        {/* 9 mentors section  */}
        <section className="py-[50px] px-[10px]">
          <div className="container mx-auto">
            <MentorSection />
          </div>
        </section>

        {/* 16 store section  */}
        <section className="py-[50px] px-[10px] bg-white">
         <StoreSection/>
        </section>

        {/* 17 new FAQ section */}
        <section className="py-[50px] px-[10px] bg-white">
          <div data-aos="fade-down" className="container mx-auto">
            <h1 className="text-center mb-2 text-4xl font-bold text-black">
              | Ask Us Anything
            </h1>
            <div className="flex justify-center   flex-col md:flex-row">
              {/* Sidebar */}
              <div className="md:w-1/6 w-full p-3 border-r border-b md:border-b-0 text-black border-orange-700">
                <ul className="space-y-2">
                  {Object.keys(faqData).map((category) => (
                    <li
                      key={category}
                      onClick={() => {
                        setActiveCategory(category);
                        setOpenFAQ(null); // Reset any open question
                      }}
                      className={`cursor-pointer border font-bold text-black py-2 px-4 rounded-lg ${
                        activeCategory === category ? " text-orange-700" : ""
                      }`}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQ Content */}
              <div className="md:w-3/4 w-full p-3">
                <h2 className="text-2xl font-bold mb-4 text-orange-700">
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
                        <span className="text-orange-400 font-bold text-2xl">
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
            className={`fixed bottom-0 left-0 w-full bg-white z-10 shadow-md flex justify-between items-center px-4 py-1   transition-transform duration-300 ${
              isVisible ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <span className="text-lg font-semibold text-black">hello</span>
            <div className="flex space-x-4">
              <button className="flex items-center px-4 py-2 border rounded-md text-white bg-black  hover:text-orange-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-9-13.5v12m0 0L7.5 10.5m3.5 2.5L16.5 10.5"
                  />
                </svg>
                Brochure
              </button>
              <ApplyNowButton/>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Proformancemarket;

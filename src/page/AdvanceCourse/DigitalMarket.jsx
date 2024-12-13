import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";
// import MentorSection from "../../Components/MentorSection";
import Alumni from "../../Components/Alumni";
import BenefitsofLearning from "./Components/BenefitsofLearning";
import Skills from "./Components/Skills";
import Certification from "./Components/Certification";
import StoreSection from "./Components/StoreSection";

import DM from "../../assets/Advanced Course Images/Digital Markting/DM.png";
import curriculumimage from "../../assets/Advanced Course Images/Digital Markting/DM 2.jpg";
import { Link } from "react-router-dom";

import pdfdm from '../../../krutanic/Digital Marketing Advanced Program.pdf'

const DigitalMarket = () => {
  const [activeCategory, setActiveCategory] = useState("Program");
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // scrolling
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  // scrolling ends

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const courseTopics = [
    {
      title: "Advanced Search Engine Optimization (SEO) Strategies",
      icon: "🌐",
    },
    { title: "Pay-Per-Click (PPC) Campaign Management", icon: "🎣" },
    { title: "Social Media Marketing and Brand Building", icon: "⚡" },
    { title: "Email Marketing Automation and Analytics", icon: "🛣️" },
    { title: "Content Marketing and Campaign Optimization", icon: "🗃️" },
    { title: "Marketing Analytics and Tools", icon: "🗃️" },
  ];

  const modules = [
    {
      title: "Advanced SEO and SEM Technique",
      objectives:
        "Learn advanced SEO strategies and manage SEM campaigns to drive organic and paid traffic.",
      topics: [
        "On-Page and Off-Page SEO",
        "Keyword Research and Analysis",
        "Link Building Strategies",
        "SEO Tools (SEMrush, Ahrefs)",
        "Google Ads Campaigns",
      ],
    },
    {
      title: "Social Media Marketing Mastery",
      objectives:
        "Develop strategies to grow brand presence on social media platforms.",
      topics: [
        "Facebook, Instagram, and LinkedIn Ads",
        "Content Creation for Social Media",
        "Influencer Marketing",
        "Engagement and Community Building",
        "Social Media Analytics",
      ],
    },
    {
      title: "Data-Driven Marketing Analytics",
      objectives:
        "Analyze and optimize marketing performance using analytics tools.",
      topics: [
        "toGoogle Analytics",
        "Conversion Rate Optimization",
        "A/B Testing",
        "Campaign Performance Metrics",
        "Social Media Insights( Social blade )",
      ],
    },
    {
      title: "Email Marketing and Automation",
      objectives:
        "Create effective email campaigns and automate customer engagement.",
      topics: [
        "Email Campaign Design",
        "Personalization and Segmentation",
        "Email Automation Tools (Mailchimp, HubSpot)",
        "Email List Management",
        "Analyzing Email Campaigns",
      ],
    },
    {
      title: "Content Marketing Strategy",
      objectives:
        "Learn to create and distribute content that engages audiences and drives conversions.",
      topics: [
        "Content Creation and Blogging",
        "Content Calendar Planning",
        "Video Marketing",
        "Content Distribution Channels",
        "Content Performance Metrics",
      ],
    },
  ];

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

  const jobRoles = [
    {
      title: "Digital Marketing Manager",
      description: "Leads digital marketing strategies and oversees campaigns.",
    },
    {
      title: "SEO Specialist",
      description: "Enhances website visibility and drives organic traffic.",
    },
    {
      title: "PPC Analyst",
      description: "Manages paid ad campaigns to boost conversions.",
    },
    {
      title: "Social Media Manager",
      description:
        "Creates strategies to grow brand presence on social platforms.",
    },
    {
      title: "Content Marketing Specialist",
      description:
        "Develops content to engage audiences and support marketing goals.",
    },
    {
      title: "Email Marketing Manager",
      description: "Executes email campaigns to nurture leads and drive sales.",
    },
    {
      title: "  Digital Marketing Analyst",
      description: "Analyzes marketing campaigns to enhance performance and ROI.",
    },
    {
      title: "Web Analyst",
      description: "Evaluates website data to improve traffic and user engagement.",
    },
    {
      title: "User Experience (UX) Specialist",
      description: "Designs intuitive experiences to optimize user satisfaction and usability.",
    },
  ];

  const Difference = [
    {
      title: "High Demand",
      description:
        "The rapid shift to online platforms makes digital marketing professionals highly sought after.",
      icon: "👥",
    },
    {
      title: "Lucrative Opportunities",
      description:
        "Digital marketing roles offer competitive salaries and room for career growth.",
      icon: "📘",
    },
    {
      title: "Creative Freedom",
      description:
        "The field offers creative tasks, from content creation to ad design, with the ability to experiment and innovate.",
      icon: "📦",
    },
    {
      title: "Variety of Roles",
      description:
        "You can specialize in areas like SEO, social media, content marketing, or paid ads, offering flexibility in your career path.",
      icon: "💼",
    },
    {
      title: " Data-Driven Decisions",
      description:
        "Work with analytics to optimize campaigns and see real-time results of your efforts.",
      icon: "💻",
    },
    {
      title: "Continuous Learning",
      description:
        "With constant technological advancements, the digital marketing landscape keeps evolving, providing opportunities for ongoing learning and growth.",
      icon: "🔗",
    },
  ];

  const faqData = {
    Program: [
      {
        question: "What topics are covered in the Digital Marketing program?",
        answer:
          "The program includes SEO, PPC, social media marketing, email marketing, and content strategy, along with analytics tools like Google Analytics and HubSpot.",
      },
      {
        question: "How is the course delivered?",
        answer:
          "The course is delivered online with a mix of live sessions, recorded lectures, practical workshops, and real-world projects.",
      },
      {
        question: " Will I get hands-on experience?",
        answer:
          "Yes, you’ll work on live projects and case studies to apply your skills in creating and managing successful digital campaigns",
      },
      {
        question: "How long is the program?",
        answer:
          "The program runs for 6 months with flexible schedules, ideal for professionals.",
      },
    ],
    Eligibility: [
      {
        question: "What are the prerequisites for the program?",
        answer:
          "Basic knowledge of marketing or familiarity with digital platforms is helpful but not required.",
      },
      {
        question: "Do I need prior experience in digital marketing?",
        answer:
          "No, this course is designed for both beginners and those with some experience looking to advance their skills.",
      },
      {
        question: "Can beginners apply?",
        answer:
          ".Yes, the program is suitable for anyone willing to learn the basics before diving into advanced techniques",
      },
      {
        question: "Is there an age restriction?",
        answer: "No, the course is open to learners of all ages.",
      },
    ],
    Community: [
      {
        question: "How can I interact with other participants?",
        answer:
          "Through discussion forums, group projects, and networking sessions with peers and mentors.",
      },
      {
        question: "Is there mentorship available?",
        answer:
          "Yes, you’ll receive guidance from industry experts throughout the course.",
      },
      {
        question: "Can I access support after the course ends?",
        answer:
          "Yes, alumni have access to forums, events, and ongoing learning resources.",
      },
      {
        question: "How diverse is the community?",
        answer:
          "Our community includes professionals and students from various industries and global locations.",
      },
    ],
    Lectures: [
      {
        question: "Are the lectures pre-recorded or live?",
        answer:
          "The program features both live sessions and recorded lectures for a flexible learning experience.",
      },
      {
        question: "How interactive are the sessions?",
        answer:
          "Live sessions include Q&A, hands-on exercises, and real-time feedback from instructors.",
      },
      {
        question: "Can I replay the lectures if I miss one?",
        answer: "Yes, all recorded sessions are available on-demand.",
      },
      {
        question: "How often are live sessions held?",
        answer:
          "Weekly live sessions are scheduled to accommodate multiple time zones.",
      },
    ],
    Certification: [
      {
        question: "Will I receive a certificate upon completion?",
        answer:
          "Yes, a Digital Marketing Certification from Krutanic Solutions will be awarded after course completion.",
      },
      {
        question: "Is the certification recognized by employers?",
        answer:
          "Yes, the certification is industry-recognized and highlights your expertise in advanced digital marketing strategies.",
      },
      {
        question:
          "Can I add the certification to my resume or LinkedIn profile?",
        answer:
          "Absolutely, the certification can be shared on professional platforms to showcase your skills.",
      },
      {
        question: "Is the certification free?",
        answer: "Yes, it’s included in the program fee.",
      },
    ],
    Opportunities: [
      {
        question: "What career opportunities will this course open for me?",
        answer:
          "The program prepares you for roles like Digital Marketing Manager, SEO Specialist, Social Media Manager, and Content Strategist.",
      },
      {
        question: "Will I receive job placement assistance?",
        answer:
          "Yes, we provide career support, including resume building, interview coaching, and job placement guidance.",
      },
      {
        question: "Are internships available through this program?",
        answer:
          "Yes, internships with partner companies are available to provide hands-on experience.",
      },
      {
        question: "How will this course help in advancing my career?",
        answer:
          "It equips you with industry-relevant skills, making you a competitive candidate for senior digital marketing roles.",
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
        <section
          id="advancedigitalbg"
          className="py-[60px] shadow-lg shadow-[#f15b29] px-[10px] min-h-screen flex items-center justify-center"
        >
          <div className="container mx-auto">
            <div className="">
              <h1
                id="digital"
                data-aos="fade-up"
                className=" text-center text-4xl  font-bold mb-3"
              >
                <span class="before:block m-2 p-1 before:absolute before:-inset-1 before:-skew-y-2 before:bg-[#f15b29] relative inline-block">
                  <i class="relative text-white ">
                    {" "}
                    Take Your Career to the Next Level with{" "}
                  </i>
                </span>

                <span class="before:block m-2 p-1 before:absolute before:-inset-1 before:-skew-y-2 before:bg-[#000] relative inline-block">
                  <i class="relative text-white "> Digital Marketing</i>
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
                  <p className="mt-2 text-md border border-[#f15b29] rounded-lg px-2 py-1 ">
                    {" "}
                    Available Cohort{" "}
                  </p>
                  <p className="mt-2 text-md"> 18/60 </p>
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
                  <p>6 months </p>
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
                    {" "}
                    <span className="text-[#f15b29]">★★★★</span>☆ (4.7/5)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr className=" opacity-10" />

        {/*14 why choose us */}
        <section className="py-[60px] px-[10px]">
          <div className="container mx-auto  text-center">
            <h1
              data-aos="fade-up"
              className="text-[#f15b29] font-bold mb-6"
            >
              | Why Choose{" "}
              <span className="text-white">Digital Marketing ? </span>
            </h1>
            <p data-aos="fade-up" className="text-gray-400 mb-12">
              Learn how to master digital marketing techniques and create
              data-driven strategies to help businesses grow and succeed in a
              competitive online environment
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
          <div  data-aos="fade-up" className="mt-[20px] text-center">
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
              | Program Overview
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {courseTopics.map((topic, index) => (
                <div
                  data-aos="fade-up"
                  key={index}
                  className="bg-[#080810] p-6 rounded-lg text-center transition-transform duration-300 hover:scale-105"
                >
                  <div className="text-4xl mb-4">{topic.icon}</div>
                  <h3 className="text-xl font-bold uppercase text-white  hover:text-[#f15b29] transition-colors duration-300">
                    {topic.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
        <hr className=" opacity-10" />

        {/* 3 key outcomes section */}
        <section className="py-[60px] px-[10px]">
          <div className="container mx-auto lg:flex flex-col lg:flex-row">
            <div className="w-full mb-3 lg:mb-0">
              <h1
                data-aos="fade-up"
                className=" font-bold mb-4 text-[#f15b29]"
              >
                | Key Takeaways
              </h1>
              <ul className="space-y-4">
                <li>
                  <span className="font-semibold text-[#f15b29]">
                    Master Advanced Digital Marketing Strategies{" "}
                  </span>
                  Learn to optimize SEO, PPC, and social media campaigns using
                  data-driven techniques to achieve exceptional results across
                  platforms.
                </li>
                <li>
                  <span className="font-semibold text-[#f15b29]">
                    Develop Expertise in Marketing Analytics{" "}
                  </span>

                  {isExpanded && (
                    <span>
                      &nbsp;Gain hands-on experience with tools like Google
                      Analytics, HubSpot, and social media insights to analyze
                      and optimize campaigns for maximum ROI.
                    </span>
                  )}
                </li>
                <li>
                  <span className="font-semibold text-[#f15b29]">
                    Create Engaging Content and Campaigns{" "}
                  </span>
                  Learn to design impactful content and multi-platform marketing
                  strategies that resonate with target audiences and drive
                  conversions.
                </li>
                <span className="font-semibold text-[#f15b29]">
                  Boost Brand Visibility and Performance{" "}
                </span>
                Gain skills to increase brand awareness and enhance performance
                through strategic online marketing techniques.
                <li>
                  <span className="font-semibold text-[#f15b29]">
                    Create Effective Content Marketing Strategies
                  </span>
                </li>
                {isExpanded && (
                  <>
                    <li>
                      <span className="font-semibold text-[#f15b29]">
                        Leverage Social Media Advertising{" "}
                      </span>
                      Optimize campaigns on platforms like Facebook, Instagram,
                      and LinkedIn for maximum reach and ROI.
                    </li>
                    <li>
                      <span className="font-semibold text-[#f15b29]">
                        Learn SEO and SEM Techniques
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
            <div
              data-aos="fade-up"
              className="lg:w-1/2 w-full h-[300px] rounded-lg shadow-lg shadow-[#926E4E] overflow-hidden"
            >
              <img
                src={DM}
                alt="Curriculum"
                className="w-full h-full object-cover"
              />
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
              <div className="lg:w-1/2 w-full lg:h-[450px] rounded-lg overflow-hidden mb-5 lg:mb-0 ">
                <img
                  src={curriculumimage}
                  alt="curriculum image"
                  className="w-full h-full "
                />
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="space-y-4  ">
                  {modules.map((module, index) => (
                    <div key={index} className=" pb-4">
                      <button
                        className="w-full text-left hover:text-[#f15b29] transition-colors duration-300 focus:outline-none"
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
          </div>
        </section>
        <hr className=" opacity-10" />

        {/* 5 download curriculum section */}
        <section className="py-[60px] px-[10px]">
          <div
            data-aos="fade-up"
            className=" container mx-auto p-5 flex flex-col md:flex-row justify-between items-center flex-wrap gap-5 rounded-lg shadow-lg border-2 border-[#f15b29]"
          >
            <div className="text-center md:text-left">
              <h1 className=" font-bold mb-2 text-[#f15b29]">
                | Get the Full Course Breakdown
              </h1>
              <p className="text-gray-400 text-sm">
                Access the detailed curriculum with key modules and learning
                outcomes of the Digital Marketing program.
              </p>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-3">
              <button className="bg-[#f15b29] hover:bg-[#f15b29] text-white font-semibold py-2 px-6 rounded flex items-center gap-2 mt-4 md:mt-0">
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
                <a
                  href={pdfdm}
                  target="blank"
                >
                  {" "}
                  Download
                </a>
              </button>
              <button className="bg-[#f15b29] hover:bg-[#f15b29] text-white font-semibold py-2 px-6 rounded-md">
                <Link
                  to="https://prettyform.addxt.com/a/form/vf/1FAIpQLSc0U5iJFWM3f3oMa6g_5uUtuoiSfOf4CIltW77EH7dpRCuwPg"
                  target="_blank"
                >
                  {" "}
                  connect with us
                </Link>
              </button>
            </div>
          </div>
        </section>

       
        <hr className=" opacity-10" />

        {/* 13 job roles section  */}
        <section className="py-[60px] px-[10px]">
          <div className="container mx-auto">
            <h1
              data-aos="fade-up"
              className="text-[#f15b29] text-center  font-bold mb-8"
            >
              | Career Opportunities in{" "}
              <span className="text-white font-bold">Digital Marketing</span>
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
          <div  data-aos="fade-up" className="mt-[20px] text-center">
                And more
           </div>
        </section>
        <hr className=" opacity-10" />

        {/* 12 key highlight section */}
        <section className="py-[60px] px-[10px]">
          <div className="container mx-auto">
            <div className="">
              <div className="w-full mb-8 lg:mb-0">
                <h1
                  data-aos="fade-up"
                  className=" text-center font-bold mb-6 text-[#f15b29]"
                >
                  | Course Benefits at a Glance
                </h1>
                <p data-aos="fade-up" className="text-lg text-center mb-8">
                  Master advanced{" "}
                  <span className="text-[#f15b29] font-bold">
                    Digital Marketing
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
                      9+ LPA
                    </h3>
                    <p className="mt-2 text-gray-300">Average CTC</p>
                  </div>
                  <div className=" p-6 rounded-lg text-center">
                    <h3 className="text-3xl font-bold text-[#f15b29]">94%</h3>
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

        {/*  8 Certification section */}
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
              <div className="md:w-1/6 w-full p-3 lg:border-r border-b md:border-b-0 text-black border-[#f15b29]">
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
          <p className="text-lg font-semibold text-black"> Program fees 61,999/-  + GST </p>
            <div className="flex space-x-4">
              <button className="flex items-center px-3 py-2 border rounded-md text-white bg-black  hover:text-[#f15b29]">
             
              <a href="https://rzp.io/rzp/advanced-training-program" target="blank" className="text-[#f15b29] whitespace-nowrap">Enroll Now</a>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DigitalMarket;

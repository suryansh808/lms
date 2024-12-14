import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import { EffectCube, Pagination, Autoplay } from "swiper/modules";

import img1 from "../assets/Advanced Course Images/Mern Stack Development/MSD 2.jpg";
import img2 from "../assets/Advanced Course Images/Digital Markting/DM 4.jpg";
import img3 from "../assets/Advanced Course Images/Data science/DS 4.jpg";
import img4 from "../assets/Advanced Course Images/Product management/PM 5.jpg";

import faqimg from '../assets/Advanced Course Images/Digital Markting/questionmark.jpg'

import datascience from '../assets/Advanced Course Images/Data science/DS 3.jpg'
import digital from '../assets/Advanced Course Images/Digital Markting/DM 1.jpg'
import Investmentbanking from '../assets/Advanced Course Images/Investment banking/IB 6.jpg'
import MERN from '../assets/Advanced Course Images/Mern Stack Development/MSD 1.jpg'
import ProductManagement from '../assets/Advanced Course Images/Product management/PM 4.jpg'
import  ProformanceMarket from '../assets/Advanced Course Images/Performance marketing/PM 3.jpg'
import Getintouch from "../Components/Getintouch";




const faqs = [
  {
    question: "Do I need a laptop to do the course?",
    answer:
      "A Laptop is mandatory to do the course. This is primarily because all your projects are industry-level and you would be able to do those projects only on a Laptop.",
  },
  {
    question: "What tools or software do I need for the course?",
    answer:
      "You will need access to a laptop/PC with internet connectivity, along with the relevant software tools and platforms, which will be shared by the instructors during the course.",
  },
  {
    question: "What is the duration of this course?",
    answer:
      "This Online Program will happen across 6 months. We will also share a detailed program calendar with you post your Admission.",
  },
  {
    question: "The course is available in which languages?",
    answer:
      "The course will happen only in English, not in any other regional language.",
  },
  {
    question: "Can I access the course material after the program ends?",
    answer:
      "Yes, all recorded sessions, course materials, and resources will be available to you even after the course ends for continued learning.",
  },
];

const Advance = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  
  const handleViewCourse1 = () => {
    navigate("/DataScience");
  };
  const handleViewCourse2 = () => {
    navigate("/DigitalMarket");
  };
  const handleViewCourse3 = () => {
    navigate("/Investmentbanking");
  };
  const handleViewCourse4 = () => {
    navigate("/MernStack");
  };
  const handleViewCourse5 = () => {
    navigate("/ProductManagement");
  };
  const handleViewCourse6 = () => {
    navigate("/Performancemarket");
  };  


  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const courseSectionRef = useRef(null);
  const scrollToCourse = () => {
    courseSectionRef.current?.scrollIntoView({ behavior: "auto" });
  };




  return (
    <div id="advance" className="">
          <section className="px-[10px] py-[60px]">
         <div  data-aos="fade-up" className="width flex items-center justify-center flex-wrap gap-[5rem]">
          <div  className="content lg:w-1/2 md:w-1/2 flex items-start flex-col max-[600px]:order-1 ">
            <h1  className="text-4xl font-bold mb-4 ">
          <span className="text-[#f15b29]">Transform with Krutanic’s Hands-On Learning Experience</span>
            </h1>
            <p  className="text-md mb-8 text-white">
          
The Krutanic Advanced Program offers an intensive curriculum that combines theoretical knowledge with practical application. Students gain valuable experience through real-world projects, enabling them to effectively navigate the complexities of Digital Marketing, Data Science, Investment Banking, Performance Marketing, Product Management, and Mern Stack Development. For more details, fill out the registration form.
            </p>
            <button
             onClick={scrollToCourse}
              
              className="bg-[#f15b29] hover:bg-orange-700 text-white transition-colors duration-300 px-6 py-3 rounded-lg font-semibold"
            >
              Find Your Course

            </button>
          </div>
          <div className="">
          <Swiper
            effect={"cube"}
            loop="true"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            grabCursor={true}
            cubeEffect={{
              shadow: true,
              slideShadows: true,
              shadowOffset: 20,
              shadowScale: 0.94,
            }}
            modules={[EffectCube, Autoplay, Pagination]}          
          >
            <SwiperSlide className=" shadow-lg shadow-orange-800">
              <img src={img1} />
            </SwiperSlide>
            <SwiperSlide className=" shadow-lg shadow-orange-800">
              <img src={img2} />
            </SwiperSlide>
            <SwiperSlide className=" shadow-lg shadow-orange-800">
              <img src={img3} />
            </SwiperSlide>
            <SwiperSlide className=" shadow-lg shadow-orange-800">
              <img src={img4} />
            </SwiperSlide>
          </Swiper>
          </div>
        
         </div>
        </section> 
        <hr className=" opacity-10"/>


      {/* Our Course Section */}
      <section ref={courseSectionRef} className="px-[10px] py-[60px]">
       <div className="width">
       <h1
          
          className=" font-bold text-center py-5 text-[#f15b29]"
        >
         | Our Advanced Courses
        </h1>
        <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-[10px] md:px-12 lg:px-26">
          <div className="bg-[#080810] rounded-xl overflow-hidden flex flex-col items-center">
           <div className="overflow-hidden  lg:h-[300px]">
           <img
              src={datascience}
              alt="Data Science"
              className="hover:scale-110  ease-linear duration-700"
            />
           </div>
            <div className="p-2">
            <h3 className="text-xl font-semibold text-white mb-2">
              Data Science
            </h3>
            <p className="text-sm -tracking-tighter text-white mb-4">
            Analyzing data to find insights that guide business decisions.
            </p>
            <button
              onClick={handleViewCourse1}
              className="bg-white text-black px-4 py-2 rounded-md hover:bg-[#f15b29] hover:text-white ease-linear duration-700"
            >
              Explore Details
            </button>
            </div>
          </div>
          <div className="bg-[#080810] rounded-xl overflow-hidden flex flex-col items-center ">
           <div className="overflow-hidden lg:h-[300px]">
           <img
              src={digital}
              alt="digital marketing"
              className="hover:scale-110  ease-linear duration-700"
            />
           </div>
            <div className="p-2">
            <h3 className="text-xl font-semibold text-white mb-2">
              Digital Marketing
            </h3>
            <p className="text-sm text-white mb-4">
            Promoting products online through channels like social media, SEO, and ads to drive business goals.
            </p>
            <button
              onClick={handleViewCourse2}
              className="bg-white text-black px-4 py-2 rounded-md hover:bg-[#f15b29] hover:text-white ease-linear duration-700"
            >
             Explore Details
            </button>
            </div>
          </div>
          <div className="bg-[#080810] rounded-xl overflow-hidden flex flex-col items-center">
           <div className="overflow-hidden lg:h-[300px]">
           <img
              src={Investmentbanking}
              alt="Investment banking"
              className="hover:scale-110 ease-linear duration-700"
            />
           </div>
            <div className="p-2">
            <h3 className="text-xl font-semibold text-white mb-2">
              Investment Banking
            </h3>
            <p className="text-sm text-white mb-4">
            Advising on financial transactions and raising capital for companies.
            </p>
            <button
              onClick={handleViewCourse3}
              className="bg-white text-black px-4 py-2 rounded-md hover:bg-[#f15b29] hover:text-white ease-linear duration-700"
            >
              Explore Details
            </button>
            </div>
          </div>
          <div className="bg-[#080810] rounded-xl overflow-hidden flex flex-col items-center">
           <div className="overflow-hidden lg:h-[300px]">
           <img
              src={MERN}
              alt="MERN"
              className="hover:scale-110 ease-linear duration-700"
            />
           </div>
           <div className="p-2">
           <h3 className="text-xl font-semibold text-white mb-2">
              MERN Stack Devlopment
            </h3>
            <p className="text-sm -tracking-tighter text-white mb-4">
            Building web apps using MongoDB, Express.js, React, and Node.js
            </p>
            <button
              onClick={handleViewCourse4}
              className="bg-white text-black px-4 py-2 rounded-md hover:bg-[#f15b29] hover:text-white ease-linear duration-700"
            >
              Explore Details
            </button>
           </div>
          </div>
          <div className="bg-[#080810] rounded-xl overflow-hidden flex flex-col items-center">
            <div className="overflow-hidden lg:h-[300px]">
            <img
              src={ProductManagement}
              alt="Product Management"
              className="hover:scale-110 ease-linear duration-700"
            />
            </div>
            <div className="p-2">
            <h3 className="text-xl font-semibold text-white mb-2">
              Product Management
            </h3>
            <p className="text-sm -tracking-tighter text-white mb-4">
            Overseeing a product’s development from concept to market.

            </p>
            <button
              onClick={handleViewCourse5}
              className="bg-white text-black px-4 py-2 rounded-md hover:bg-[#f15b29] hover:text-white ease-linear duration-700"
            >
               Explore Details
            </button>
            </div>
          </div>
          <div className="bg-[#080810] rounded-xl overflow-hidden flex flex-col items-center">
            <div className="overflow-hidden lg:h-[300px]"> 
            <img
              src={ProformanceMarket}
              alt=" Proformance Market"
              className="hover:scale-110 ease-linear duration-700"
            />
            </div>
             <div className="p-2">
             <h3 className="text-xl font-semibold text-white mb-2">
              Performance Marketing
            </h3>
            <p className="text-sm -tracking-tighter text-white mb-4">
            Marketing based on measurable actions, like clicks or sales.

            </p>
            <button
              onClick={handleViewCourse6}
              className="bg-white text-black px-4 py-2 rounded-md hover:bg-[#f15b29] hover:text-white ease-linear duration-700"
            >
              Explore Details
            </button>
             </div>
          </div>
        </div>
       </div>
      </section>
      <hr className=" opacity-10"/>

       {/* program info  */}
       <section className="px-[10px] py-[60px]">
        <div className="width">
          <h1 data-aos='fade-up' className=" text-center text-[#f15b29] justify-center font-semibold mb-9">
            | We have designed a flexible program for you{" "}
          </h1>
          <div data-aos='fade-up' className="px-4 grid lg:grid-cols-3 gap-3 text-white">
           
            <div className="bg-[#080810] rounded-lg p-4 text-center">
              <div className="text-3xl mb-4">📄</div>
              <h3 className="text-xl font-semibold mb-2">
                {" "}
                Seeking practical experience?
              </h3>
              <p className="text-sm">
                Participate in hands-on projects and real-world case studies
                that enhance your learning and prepare you for the job market.
              </p>
            </div>

            
            <div className="bg-[#080810] rounded-lg p-4 text-center hover:shadow-lg">
              <div className="text-3xl mb-4">👨‍👩‍👦</div>
              <h3 className="text-xl font-semibold mb-2">
                Want to learn on the go?
              </h3>
              <p className="text-sm">
                Access our friendly platform and study anytime, anywhere, making
                your education truly portable and convenient.
              </p>
            </div>

            
            <div className="bg-[#080810] rounded-lg p-4 text-center hover:shadow-lg">
              <div className="text-3xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold mb-2">
                {" "}
                Jobs & class timings clash?
              </h3>
              <p className="text-sm">
                Our adaptable programs let you learn anytime, anywhere, ensuring
                you don’t miss out on opportunities.
              </p>
            </div>

           
            <div className="bg-[#080810]  rounded-lg p-4 text-center hover:shadow-lg">
              <div className="text-3xl mb-4">📑</div>
              <h3 className="text-xl font-semibold mb-2">
                Looking for community support?
              </h3>
              <p className="text-sm">
                Engage with fellow learners through discussion forums, group
                projects, and networking events.
              </p>
            </div>

          
            <div className="bg-[#080810] lg:col-span-2 rounded-lg p-4 text-center hover:shadow-lg">
              <div className="text-3xl mb-4">❓</div>
              <h3 className="text-xl font-semibold mb-2">
                {" "}
                Need guidance on career paths?
              </h3>
              <p className="text-sm">
                Take advantage of tailored career services, including resume
                reviews, interview coaching, and job placement assistance to
                help you achieve your professional goals.
              </p>
            </div>
          </div>
        </div>
      </section>
      <hr className=" opacity-10"/>

      {/* FAQ Section */}
      <section className="px-[10px] py-[60px]  text-white">
        <div className="container width px-4">
          <h1 data-aos="fade-up" className=" font-bold text-[#f15b29] text-center py-5">
           | Frequently Asked Questions
          </h1>
         <div className="lg:flex lg:gap-4   overflow-hidden">
         <div data-aos="fade-up" className="space-y-4 lg:w-1/2">
            {faqs.map((faq, index) => (
              <div  key={index} className=" rounded-lg overflow-hidden ease-linear duration-500">
                <button
                  className="flex justify-between items-center w-full p-4 text-left bg-[#080810]"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-lg font-semibold pr-8">{faq.question}</h3>
                  <span className="text-2xl text-[#f15b29]">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="p-4 bg-[rgb(255,255,255,0.2)] ">
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div data-aos="fade-up" className=" lg:w-1/2 lg:mt-0 mt-4  overflow-hidden rounded-lg">
            <img className="w-full rounded-lg" src={faqimg} alt="img" />
          </div>
         </div>
        </div>
      </section>
     
       
       <section>
          <Getintouch/>
       </section>
       
    </div>
  );
};

export default Advance;

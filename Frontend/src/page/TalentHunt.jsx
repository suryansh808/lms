import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import API from "../API";
import { motion } from "framer-motion";

const TalentHunt = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    collegeName: "",
    collegeEmailId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/eventregistration`, formData);
      toast.success("Form submitted successfully!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        collegeName: "",
        collegeEmailId: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit the form");
    }
  };

  const category = [
    {
      name: "MERN Mastermind Challenge",
      description:
        "Showcase your ability to build dynamic, high-performance applications using the MERN stack (MongoDB, Express.js, React, Node.js).",
    },
    {
      name: "UX/UI Design Excellence",
      description:
        "Compete to design intuitive and visually captivating user interfaces that elevate the digital experience.",
    },
    {
      name: "Full-Stack Innovators Quest",
      description:
        "Develop end-to-end solutions with a full-stack approach, combining front-end and back-end technologies.",
    },
    {
      name: "Digital Marketing Mavericks",
      description:
        "Create innovative digital marketing campaigns that drive engagement and measurable results across platforms.",
    },
    {
      name: "Data Science Visionaries Challenge",
      description:
        "Apply data science techniques to uncover insights and solve complex real-world business problems.",
    },
    {
      name: "Performance Marketing Prodigies",
      description:
        "Design high-performance marketing campaigns optimized for exceptional ROI and conversion rates.",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const [isFlipped, setIsFlipped] = useState(false);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
  
  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API}/eventsendotp`, { email });
      if (response.status === 200) {
        toast.success('OTP sent successfully');
        setShowOtp(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error sending OTP');
    }finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/eventverifyotp`, { email, otp });
      toast.success('login successful!!!');
      console.log(response.data);
      if (response.status === 200) {
        setTimeout(() => {
        localStorage.setItem('eventuserId', response.data._id);
        localStorage.setItem('eventuserEmail', response.data.email);
        localStorage.setItem('eventToken', response.data.token);
        navigate('/EventDashBoard');
      }, 2000); 
      }
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("Your account is inactive. Please contact support.");
      } else if (error.response?.status === 400) {
        toast.error("Invalid or expired OTP. Please try again.");
      } else if (error.response?.status === 404) {
        toast.error("User not found. Please check your email.");
      } else {
        toast.error(
          error.response?.data?.message || "An error occurred while verifying OTP. Please try again."
        );
      }
    }
  };

  // const LeearningSectionRef = useRef(null);
  // const scrollToCourse = () => {
  //   LeearningSectionRef.current?.scrollIntoView({ behavior: "auto" });
  // };



  return (
    <div id="talenthunt">
      <Toaster position="top-center" reverseOrder={false} />
      <section class="home">
        <div class="description">
          <h1 data-aos="fade-up" class="title">
            <span class="gradient-text">Grow Professionally</span> with the Best
          </h1>
          <p data-aos="fade-up" class="paragraph">
            In a world filled with opportunities, having a mentor can make all
            the difference. Explore why people turn to this invaluable resource
            to unlock their potential.
          </p>
          {/* <button  onClick={scrollToCourse} className="border border-[#f15b29] rounded-md px-4 py-1">Register Now</button> */}
        </div>
        <div className="users-color-container">
          <span className="item" style={{ "--i": 1 }}></span>
          <img
            className="item"
            src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/274f29ce-0d3f-4ac2-a2aa-f9b7bd188b2a"
            style={{ "--i": 2 }}
            alt=""
          />
          <span className="item" style={{ "--i": 3 }}></span>
          <img
            className="item"
            src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/b8a14493-3d9f-4b9b-b93a-56d0bc7243e9"
            style={{ "--i": 4 }}
            alt=""
          />
          <img
            className="item"
            src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/03e51e1e-9750-45a5-b75e-a1e341d4562a"
            style={{ "--i": 10 }}
            alt=""
          />
          <span className="item" style={{ "--i": 11 }}></span>
          <img
            className="item"
            src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/5eb50f89-3e5a-480e-860c-8d40d3ba9ffe"
            style={{ "--i": 12 }}
            alt=""
          />
          <span className="item" style={{ "--i": 5 }}></span>
          <span className="item" style={{ "--i": 9 }}></span>
          <img
            className="item"
            src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/86c71a79-2efe-4567-8665-b1e5a1fd9735"
            style={{ "--i": 8 }}
            alt=""
          />
          <span className="item" style={{ "--i": 7 }}></span>
          <img
            className="item"
            src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/97ef9643-5202-41aa-80f0-ceeabccdd099"
            style={{ "--i": 6 }}
            alt=""
          />
        </div>
      </section>
      <hr className=" opacity-10" />

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h1
            data-aos="fade-up"
            className="font-bold mb-8 text-center gradient-text"
          >
            | About the Talent Hunt
          </h1>
          <p
            data-aos="fade-up"
            className="text-lg text-center max-w-3xl mx-auto"
          >
            Our annual Talent Hunt is designed to discover and nurture the
            brightest minds in education technology. Whether you're a coding
            prodigy, a design virtuoso, or an innovative thinker, this is your
            chance to shine!
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h1
            data-aos="fade-up"
            className="font-bold mb-12 text-center gradient-text"
          >
            | Categories
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {category.map((category, index) => (
              <div
                data-aos="fade-up"
                key={index}
                className="bg-[#080808] shadow-md rounded-lg p-6 text-center"
              >
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <hr className=" opacity-10" />

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h1
            data-aos="fade-up"
            className=" font-bold mb-12 text-center text-[#f15b29]"
          >
            | How to Participate
          </h1>
          <div className="flex items-center justify-center flex-wrap gap-4 max-[600px]:justify-start">
            {[
              "Register on our platform",
              "Choose your category",
              "Submit your project",
              "Present to our panel of judges",
            ].map((step, index) => (
              <div
                data-aos="fade-up"
                key={index}
                className="flex items-center mb-6"
              >
                <div className="bg-[#f15b29] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                  {index + 1}
                </div>
                <p className="text-lg dark:text-gray-300">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
      //  ref={LeearningSectionRef}
        className="bg-white">
      <div className={`container  bg-white text-black flex justify-around flex-wrap `}>
          <div className="relative w-full h-[600px] sm:w-1/2 px-6 sm:px-20 py-8">
      <motion.div
        className="relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side - Registration Form */}
        <div className={`absolute w-full backface-hidden ${isFlipped ? "hidden" : "block"}`}>
          <h2 className="text-2xl sm:text-3xl font-bold text-center gradient-text">
            | Talent Hunt Registration
          </h2>
          <form onSubmit={handleSubmit} className="rounded-lg p-5">
            <fieldset className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 mt-2 text-black placeholder:text-[#00000096] border-b rounded-lg focus:outline-none"
                required
              />
            </fieldset>
            <fieldset className="mb-4">
              <input
                type="number"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 mt-2 text-black placeholder:text-[#00000096] border-b rounded-lg focus:outline-none"
                required
              />
            </fieldset>
            <fieldset className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Personal Email ID"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 mt-2 text-black placeholder:text-[#00000096] border-b rounded-lg focus:outline-none"
                required
              />
            </fieldset>
            <fieldset className="mb-4">
              <input
                type="text"
                name="collegeEmailId"
                placeholder="Student's College Email ID"
                className="w-full p-3 mt-2 text-black placeholder:text-[#00000096] border-b rounded-lg focus:outline-none"
                value={formData.collegeEmailId}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="mb-4">
              <input
                type="text"
                name="collegeName"
                placeholder="College Name"
                value={formData.collegeName}
                onChange={handleChange}
                className="w-full p-3 mt-2 text-black placeholder:text-[#00000096] border-b rounded-lg focus:outline-none"
                required
              />
            </fieldset>
            <fieldset className="mb-2">
              <button
                type="submit"
                className="w-full p-3 bg-black text-white rounded-lg focus:outline-none"
              >
                Register Now
              </button>
            </fieldset>
            <button
              className="w-full p-2 text-blue-600 underline"
              onClick={() => setIsFlipped(true)}
            >
              Already registered? Login
            </button>
          </form>
        </div>

        {/* Back Side - Login Form */}
        <div className={`absolute w-full backface-hidden ${isFlipped ? "block" : "hidden"}`} style={{ transform: "rotateY(180deg)" }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-center gradient-text">
            | Login
          </h2>
          <form onSubmit={handleVerifyOtp} className="rounded-lg p-5">
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter Email ID"
	            className="w-full p-3 mt-2 text-black placeholder:text-[#00000096] border-b rounded-lg focus:outline-none"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {!showOtp ? (
            <button disabled={loading} type="button"  className="w-full p-3 bg-black text-white rounded-lg focus:outline-none" onClick={handleSendOtp}>
            { loading ? "Sending..." : "Send OTP"}
            </button>
          ) : (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter OTP"
		             className="w-full p-3 mt-2 text-black placeholder:text-[#00000096] border-b rounded-lg focus:outline-none"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button  className="w-full p-3 bg-black text-white rounded-lg focus:outline-none" type="submit">Verify OTP</button>
            </>
          )}

            <button
              className="w-full p-2 mt-4 text-blue-600 underline"
              onClick={() => setIsFlipped(false)}
            >
              Back to Registration
            </button>
          </form>
        </div>
      </motion.div>
          </div>
          <div className="text-center w-full sm:w-1/2 px-6 sm:px-20 py-10 sm:py-40">
            <h2 className="text-2xl sm:text-3xl font-semibold text-black gradient-text">
              | Follow Us
            </h2>
            <p className="mt-4 text-lg text-black">
              Stay updated with the latest news and announcements on our social
              channels.
            </p>
            <div className="mt-8 flex justify-center gap-6">
              <a
                target="_blank"
                href="https://www.facebook.com/people/Krutanic-Solutions/61563953173071/"
                className="text-blue-500 text-4xl hover:text-blue-700"
              >
                <span className="fa fa-facebook"></span>
              </a>
              <a
                target="_blank"
                href="https://www.youtube.com/@KrutanicSolutions"
                className="text-red-800 text-4xl hover:text-red-900"
              >
                <span className="fa fa-youtube"></span>
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/krutanic"
                className="text-pink-500 text-4xl hover:text-pink-700"
              >
                <span className="fa fa-instagram"></span>
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/company/krutanic/"
                className="text-blue-700 text-4xl hover:text-blue-900"
              >
                <span class="fa fa-linkedin"></span>
              </a>
            </div>
          </div>
      </div>
      </section>
    </div>
  );
};

export default TalentHunt;

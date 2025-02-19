import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { color } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
// import { FaHandshake } from "react-icons/fa";

import ShuffleHero from "../Components/ShuffleHero";
import ClientsCarousel from "../Components/our_alumni";
import Testimonial from "../Components/testimonial";
import Wavefull from "../Components/wave_full";
import Popularcourse from "../Components/popularcourse";
import VerticalAccordion from "../Components/VerticalAccordion";

// import whychoose from "../assets/whatmakedifferent.png";
import specialization from "../assets/specialization.jpg";
import whyimg from "../assets/whychoose.jpg";
import corporate from "../assets/corporatesolution.jpg";
import comingsoon from "../assets/comingsoon.jpg";

import roadmap from "../assets/roadmap.png";
import AdvanceCounses from "../Components/advancecourses";

const HomePage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div id="landingpage">
      {/* section hero */}
      <div className="hero">
        <ShuffleHero />
      </div>
      <Wavefull />
      {/* section hero end */}

      {/* section aboutus */}
      <div className="aboutus">
        <div className="about1stdiv">
          <div className="text">
            <h1 data-aos="zoom-in">| About Us</h1>
            <p>
            Krutanic Solutions is your trusted partner for career growth, offering advanced tech courses designed to prepare you for the fast-paced job market. We focus on delivering industry-relevant skills through expert guidance, ensuring that you gain both theoretical knowledge and practical experience. Each course is backed by hands-on projects, allowing you to work on real-world challenges that employers value. Whether you're starting your career or looking to upskill, our programs in Web Development, Data Science, and Digital Marketing are tailored to help you succeed. Join Krutanic Solutions today and take the next step toward achieving your career goals.
            </p>
            <Link to="/AboutUs">
              <button className="btnblack">LEARN MORE</button>{" "}
            </Link>
            <div className="number">
              <h2 data-aos="fade-right">
                <span class="fa fa-globe"></span> 250+ Hiring Partners
              </h2>
              <h2 data-aos="fade-right">
                <span class="fa fa-globe"></span> 170+ Global Mentors
              </h2>
            </div>
          </div>
          <div className="box">
            <div data-aos="zoom-in" data-aos-delay="500">
              <span class="fa fa-graduation-cap"></span>
              <p>Explore Industry-Leading Courses to Boost Skills.</p>
            </div>
            <div data-aos="zoom-in" data-aos-delay="1000">
              <span class="fa fa-briefcase"></span>
              <p>Learn from Experienced Industry Experts.</p>
            </div>
            <div data-aos="zoom-in" data-aos-delay="500">
              <span class="fa fa-laptop"></span>
              <p>Gain Hands-On Experience with Real Projects.</p>
            </div>
            <div data-aos="zoom-in" data-aos-delay="1000">
              <span class="fa fa-line-chart"></span>
              <p>Get Personalized Placement Support for Dream Job.</p>
            </div>
          </div>
        </div>
        <div className="boxfour">
          <div data-aos="fade-up" data-aos-duration="200" data-aos-delay="200"  >
            <span className="fa fa-book text-blue-700"></span>
            <h2>Courses for All Levels</h2>
          </div>
          <div data-aos="fade-up" data-aos-duration="400" data-aos-delay="600"  >
            <span className="fa fa-flag text-yellow-500"></span>
            <h2>Success Starts Here</h2>
          </div>
          <div data-aos="fade-up"  data-aos-duration="600" data-aos-delay="800" >
            <span className="fa fa-globe text-green-700"></span>
            <h2>Flexible Learning</h2>
          </div>
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="1200"  >
            <span className="fa fa-key text-purple-700"></span>
            <h2>Unlock Potential</h2>
          </div>
        </div>
      </div>
      {/* section aboutus end*/}

     
        {/* <div className="roadmap">
          <div>
          <h1>| Roadmap to your Success</h1>
            <img src={roadmap} alt="Road Map" />
          </div>
        </div> */}
   

      {/* Start Your Career */}
      <div className="startcareer">
        <div data-aos="flip-up" data-aos-duration="100000sec">
          <div className="startcareer-text">
            <ul>
              <li>Full Stack Development</li>
              <li>Android App Development</li>
              <li>Artificial Intelligence</li>
              <li>MAchine Learning</li>
              <li>Cyber Security</li>
              <li>Data Science</li>
              <li>Embedded System</li>
              <li>Cloud Computing</li>
              <li>IOT & Robotics</li>
              <li>Auto Cad</li>
              <li>Bussiness Analytics</li>
              <li>Digital Marketing</li>
              <li>Human Resource</li>
              <li>Supply Chain Management</li>
              <li>Nano Technology and Genetic</li>
              <li>Graphics Design</li>
            </ul>
          </div>
          <div>
            <h2>Transform Your Career with Confidence </h2>
            <p>
              <span>&#10149;</span>We've Got Your Back! Learning can be
              challenging, but we're with you all the way tracking your
              progress, refining your skills, and leaving no gaps.
            </p>
            <p>
              <span>&#10149;</span>Learn Anytime, Anywhere! Join live classes,
              connect with mentors, and study flexibly from wherever you are
            </p>
            <p>
              <span>&#10149;</span>Boost Your Portfolio! Earn completion and
              internship certificates to level up your résumé and career
              prospects.
            </p>
          </div>
        </div>
      </div>

      {/* Start Your Career end*/}

      {/* provide section */}

      <div className="providesection">
        <div className="provide">
          <h1 data-aos="zoom-in">| Krutanic Provides ?</h1>
          <p>
            At our organization, we are committed to offering an unparalleled
            learning experience that empowers you to excel.
          </p>
          <div>
            <div data-aos="fade-up" className="provide1">
              <span class="fa fa-graduation-cap text-green-500"></span>
              <h2>Expert Mentorship</h2>
              <p>Get mentored by top professionals in the field.</p>
            </div>
            <div data-aos="fade-up" className="provide1">
              <span class="fa fa-map text-orange-500"></span>
              <h2>Customized Paths</h2>
              <p>Programs customized to match your goals and ambitions.</p>
            </div>
            <div data-aos="fade-up" className="provide1">
              <span class="fa fa-briefcase text-blue-700"></span>
              <h2>Industrial Training</h2>
              <p>Skills designed to meet market and MNC standards.</p>
            </div>
            <div data-aos="fade-up" className="provide1">
              <span class="fa fa-trophy text-red-500"></span>
              <h2>Proven Success</h2>
              <p>Alumni excelling in leading global companies.</p>
            </div>
          </div>
        </div>
      </div>

      {/* section provide end*/}

      {/* section alumni work */}

      <div className="workat">
        <div className="alumni">
          <h1 data-aos="zoom-in">| Our alumni at top Brands</h1>
          <p>
            Their success stories inspire current students to aim for global
            excellence in their careers.
          </p>
          <ClientsCarousel />
        </div>
      </div>

      {/* section alumni work end */}

      {/* section specialization */}

      <div className="specialization">
        <div>
          <h1 data-aos="zoom-in">| Our specialization</h1>
          <p>
            Comprehensive Learning Approach for In-Depth Expertise and Personal
            Growth.
          </p>
          <div className="specializationiner">
            <div  data-aos="fade-up-right" className="img">
              <img src={specialization} alt="" />
            </div>
            <div className="textdiv">
              <div data-aos="fade-left" data-aos-duration="400" data-aos-delay="400" className="specialtext">
                <span className="fa fa-check-square-o"></span>
                <p>
                  {" "}
                  We cover all aspects, from basic concepts to advanced
                  techniques, ensuring you gain in-depth expertise.
                </p>
              </div>
              <div data-aos="fade-left" data-aos-duration="600" data-aos-delay="600" className="specialtext">
                <span className="fa fa-search"></span>
                <p>
                  Your learning journey is closely monitored through regular
                  assessments to ensure you thoroughly understand and retain the
                  concepts taught.
                </p>
              </div>
              <div data-aos="fade-left" data-aos-duration="800" data-aos-delay="800" className="specialtext">
                <span class="fa fa-star"></span>
                <p>
                  Each program is structured to meet individual needs, ensuring
                  maximum growth and success.
                </p>
              </div>
              <div data-aos="fade-left" data-aos-duration="1200" data-aos-delay="1200" className="specialtext">
                <span class="fa fa-gear"></span>
                <p>
                  Our personalized approach empowers you to progress at your own
                  pace, ensuring a comprehensive and effective learning
                  experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* section specialization end */}

      {/* section Popular course */}

      <div className="popularcourse">
        <h1 data-aos="zoom-in">| Popular Courses</h1>
        <Popularcourse />
      </div>

      {/* section Popular course end */}

      {/* advance courses */}
      <div  className="popularcourse" >
        <AdvanceCounses />
      </div>
      {/* advance courses end  */}

      {/* <WhyChooseUs/> */}
      <div className="whychoose">
        <h1 data-aos="zoom-in">| Why choose us ?</h1>
        <p>
        Expertise, quality service, and student satisfaction guaranteed every time.
        </p>
        <div className="whydiv">
          <div  data-aos="fade-up-right" className="whyimg">
            <img src={whyimg} alt="" />
          </div>
          <div className="whytext">
            <div data-aos="fade-left" data-aos-duration="400" data-aos-delay="400" className="text">
              <span>&#10149;</span>
              <div>
                <h2>Digital Skills</h2>
                <p>
                  Designed to equip students with in-demand skills for success
                  in the digital economy.
                </p>
              </div>
            </div>
            <div data-aos="fade-left" data-aos-duration="600" data-aos-delay="600" className="text">
              <span>&#10149;</span>
              <div>
                <h2>Career Support</h2>
                <p>
                  Career guidance to help students secure jobs and excel in
                  their careers.
                </p>
              </div>
            </div>
            <div data-aos="fade-left" data-aos-duration="800" data-aos-delay="800" className="text">
              <span>&#10149;</span>
              <div>
                <h2>Flexible Learning</h2>
                <p>
                  Offers online and hybrid classes to suit diverse schedules and
                  preferences.
                </p>
              </div>
            </div>
            <div data-aos="fade-left" data-aos-duration="1200" data-aos-delay="1200" className="text">
              <span>&#10149;</span>
              <div>
                <h2>Global Networking</h2>
                <p>Opportunities to connect with a global community of professionals and industry experts. </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhyChooseUs end */}

      {/* section mission vission  */}

      <div className="misvis">
        <div className="mission">
          <h1 data-aos="zoom-in">| OUR MISION</h1>
          <ul>
            <li> Expert faculty with real-world experience</li>
            <li>Comprehensive support for students</li>
            <li>Interactive learning approach</li>
            <li>Proven track record of success</li>
          </ul>
        </div>
        <div className="vission">
          <h1 data-aos="zoom-in">| OUR VISION</h1>
          <p>
            Our vision is to be the leading provider of special education camps
            for programming, empowering students to achieve their full
            potential.
          </p>
          <br />
          <Link to="/AboutUs">
            <button className="btnwhite">LEARN MORE</button>
          </Link>
        </div>
      </div>

      {/* section mission vission end  */}

      {/* section empower  */}

      <div className="empower">
        <div data-aos="fade-up" data-aos-duration="400" data-aos-delay="400">
          <span>&#127760;</span>
          <p>
            Empower students with skills for success in the digital economy.
          </p>
        </div>
        <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="600">
          <span>&#128187;</span>
          <p>
            Deliver the best learning experience for success in the digital
            world.
          </p>
        </div>
        <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="800">
          <span>&#128640;</span>
          <p>
            Foster innovation and creativity by encouraging students to think
            creatively
          </p>
        </div>
        <div data-aos="fade-up" data-aos-duration="1200" data-aos-delay="1200">
          <span>&#127793;</span>
          <p>
            Be a catalyst for positive change, transforming the world one
            student at a time.
          </p>
        </div>
      </div>

      {/* section empower end */}

      {/* section testimonial */}

      <div className="testimonial">
        <h1 data-aos="zoom-in">| Our Mentees' Feedback</h1>
        <p>
          how our students have transformed their learning journey and achieved
          success.
        </p>
        <Testimonial />
      </div>

      {/* section testimonial end */}

      {/* section Corporate Solution */}

      <div className="corporatesolution">
        <h1 data-aos="zoom-in">| Corporate Solutions</h1>
        <p>
          Corporate Solutions offers innovative strategies, cutting-edge tools,
          and collaborative approaches to drive business growth and success.
        </p>
        <div className="corporatediv">
          <div data-aos="fade-up-right" className="corporateimg">
            <img src={corporate} alt="" />
          </div>
          <div className="corporatetext">
            <div data-aos="fade-left" data-aos-duration="400" data-aos-delay="400" className="text">
              <span>&#10149;</span>
              <div>
                <h2>Empowerment</h2>
                <p>
                  Proven methods that foster both professional and personal
                  growth.
                </p>
              </div>
            </div>
            <div data-aos="fade-left" data-aos-duration="600" data-aos-delay="600" className="text">
              <span>&#10149;</span>
              <div>
                <h2>Innovative Learning</h2>
                <p>
                  Access to the latest tools and technologies for real-time
                  learning.
                </p>
              </div>
            </div>
            <div data-aos="fade-left" data-aos-duration="800" data-aos-delay="800" className="text">
              <span>&#10149;</span>
              <div>
                <h2>Collaborative Networking</h2>
                <p>
                  Participate in group projects and cross-industry networking
                  sessions.
                </p>
              </div>
            </div>
            <div data-aos="fade-left" data-aos-duration="1200" data-aos-delay="1200" className="text">
              <span>&#10149;</span>
              <div>
                <h2>Creative Solutions</h2>
                <p>
                  We encourage creative problem-solving to meet dynamic
                  business challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* section Corporate Solution end */}

      {/* section Our Partner */}

      <div className="workat">
        <div className="alumni">
          <h1 data-aos="zoom-in">| Our Hiring Partners</h1>
          <ClientsCarousel />
        </div>
      </div>

      {/* section Our Partner */}

      <div className="whitediv">
        {/* how to enroll  */}
        <div className="ourprocess">
          <div className="ourprocessdiv">
            <div className="process1">
              <h1 data-aos="zoom-in">| How to Enroll ?</h1>
              <p>
                Our process is designed to help you achieve your goals and
                succeed in your career. We focus on guiding you every step of
                the way so that you can get the most out of your learning
                experience.
              </p>
              <p>
                By enrolling with us, you’ll get access to a structured learning
                experience, expert guidance, and a supportive community.
              </p>
            </div>
            <div className="process2">
              <VerticalAccordion />
            </div>
          </div>
        </div>

        {/* how to enroll end */}

        {/* what makes us different */}

        {/* <div className="whatmakesusdifferent">
          <h1 data-aos="zoom-in">| What Makes Us Different ?</h1>
          <div className="whatmakesusdifferentdiv">
            <img src={whychoose} alt="img" />
          </div>
        </div> */}

        {/* what makes us different end */}

        {/* Our Success Story */}

        <div className="ourstory">
          <h1 data-aos="zoom-in">| Our Success Story</h1>
          <p>
            Our Success Story is unfolding with every milestone we achieve—stay
            tuned for our inspiring journey!
          </p>
          <div className="storydiv">
            <img src={comingsoon} alt="" />
          </div>
        </div>

        {/* Our Success Story end */}
      </div>
    </div>
  );
};
export default HomePage;

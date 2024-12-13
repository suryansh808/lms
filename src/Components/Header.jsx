import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo3 from "../assets/LOGO3.png";
import wipro from "../assets/wipro.svg";

import mca from '../assets/poplogo/mca.png';
import iso from '../assets/poplogo/iso.png';
import msme from '../assets/poplogo/msme.png';


const Header = () => {
  const [isMobileVisible, setisMobileVisible] = useState(false);
  const [isAutopopupVisible, setisAutopopupVisible] = useState(false);
  // Create a ref for the mobile menu
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    // Set the div to be visible after 3 seconds
    const timer = setTimeout(() => {
      setisAutopopupVisible(true);
    }, 1000); // 3000 milliseconds = 3 seconds

    // Cleanup the timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  const autoPopup = () => {
    setisAutopopupVisible(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleVisibility = () => {
    setisMobileVisible((prevState) => !prevState);
  };

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setisMobileVisible(false);
      }
    };

    // Add event listener to the document
    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div id="header" ref={mobileMenuRef}>
      <div className="navbar">
        <div>
          <Link to="/" onClick={scrollToTop}>
            <img src={logo3} alt="Logo" />
          </Link>
        </div>
        <div className="menu">
          <Link to="/Mentorship">MENTORSHIP PROGRAM</Link>
          <Link to="/Advance">ADVANCED PROGRAM</Link>
          <Link to="/Collabration" onClick={scrollToTop}>
            COLLABRATION
          </Link>
          <Link to="/TalentHunt" onClick={scrollToTop}>
            TALENT HUNT
          </Link>
          <a href="https://www.krutanic.online/login/" ><button className="btn">LOGIN</button> </a>
        </div>
        <div className="toggle">
          <span onClick={toggleVisibility}>☰</span>
        </div>
      </div>

      {isMobileVisible && (
        <div className="mobile">
          <ul onClick={toggleVisibility}>
            <Link to="/Mentorship">
              <li>MENTORSHIP PROGRAM</li>
            </Link>
            <Link to="/Advance">
              <li>ADVANCED PROGRAM</li>
            </Link>
            <Link to="/Collabration" onClick={scrollToTop}>
              <li>COLLABRATION</li>
            </Link>
            <Link to="/TalentHunt" onClick={scrollToTop}>
              <li>TALENT HUNT</li>
            </Link>
            <Link to="/ContactUs" onClick={scrollToTop}>
              <li>Contact US</li>
            </Link>
            <Link to="/Career" onClick={scrollToTop}>
              <li>Career</li>
            </Link>
            <Link to="/AboutUs" onClick={scrollToTop}>
              <li>About Us</li>
            </Link>
            <a href="https://www.krutanic.online/login/" ><button className="btn">LOGIN</button> </a>
            {/* <Li
            to="/https://www.krutanic.online/login/"
            onClick={() => {
              scrollToTop();
              toggleVisibility();
            }}
          >
           <li><button className="btn">LOGIN</button></li>
          </Li> */}
          </ul>
         
        </div>
      )}

{isAutopopupVisible && (
        <div id="autopopup">
          <div className="autotext">
            <div className="close">
              <span onClick={autoPopup} class="fa fa-close"></span>
            </div>
            <h1>Revealing our estimated</h1>
            <div className="first">
              <h2>Our Credential Partner</h2>
              <img src={wipro} alt="wipro" />
            </div>
            <h3>Our Prestigious Certifications</h3>
            <div className="second">
              <img src={mca} alt="" />
              <img src={iso} alt="" />
              <img src={msme} alt="" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

{
  /* <li>
  <Link to='/Login' onClick={() => { scrollToTop(); solution(); }} className='btn'>
    LOGIN
  </Link>
</li> */
}

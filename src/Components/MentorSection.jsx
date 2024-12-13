import React, { useEffect } from "react";
import Slider from "react-slick";
import AOS from "aos";
 import "aos/dist/aos.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const mentors = [
  {
    name: "Mentor Name",
    designation: "Desgination",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Mentor Name",
    designation: "Desgination",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Mentor Name",
    designation: "Desgination",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Mentor Name",
    designation: "Desgination",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Mentor Name",
    designation: "Desgination",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Mentor Name",
    designation: "Desgination",
    image: "https://via.placeholder.com/150",
  },
];



const MentorSection = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div className="bg-cream px-4 py-10 text-center">
      <h1 
      data-aos="fade-up"
      className=" text-[#f15b29] font-bold mb-4">
          
        | Our Esteemed Mentors
      </h1>
      <p  data-aos="fade-up" className="text-white mb-8">
        Discover the brilliant and visionary minds shaping our journey. Our
        mentors bring extensive expertise and an unwavering passion for
        innovation to every advanced course they lead.
      </p>
      <Slider {...settings}   className="relative">
        {mentors.map((mentor, index) => (
          <div key={index} className="p-4">
            <div className="bg-white text-black shadow-md rounded-lg p-4 text-center">
              <img
                src={mentor.image}
                alt={mentor.name}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="font-semibold text-lg">{mentor.name}</h3>
              <p className="text-gray-500">{mentor.designation}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const NextArrow = ({ onClick }) => {
  return (
    <button
      className="absolute top-1/2 z-10 right-6 transform -translate-y-1/2 text-[#f15b29] text-2xl focus:outline-none"
      onClick={onClick}
    >
      &#x276F;
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button
      className="absolute top-1/2 z-10 left-6 transform -translate-y-1/2 text-[#f15b29] text-2xl focus:outline-none"
      onClick={onClick}
    >
      &#x276E;
    </button>
  );
};

export default MentorSection;

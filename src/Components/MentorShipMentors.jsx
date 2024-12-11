// import React, { useEffect } from "react";
// import Slider from "react-slick";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const mentors = [
//   {
//     name: "Mentor Name",
//     designation: "Desgination",
//     image: "https://via.placeholder.com/150", 
//   },
//   {
//     name: "Mentor Name",
//     designation: "Desgination",
//     image: "https://via.placeholder.com/150", 
//   },
//   {
//     name: "Mentor Name",
//     designation: "Desgination",
//     image: "https://via.placeholder.com/150", 
//   },
//   {
//     name: "Mentor Name",
//     designation: "Desgination",
//     image: "https://via.placeholder.com/150", 
//   },
//   {
//     name: "Mentor Name",
//     designation: "Desgination",
//     image: "https://via.placeholder.com/150", 
//   },
//   {
//     name: "Mentor Name",
//     designation: "Desgination",
//     image: "https://via.placeholder.com/150", 
//   },
// ];

// const  MentorShipMentors  = () => {

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//  useEffect(() => {
//     AOS.init({ duration: 1000, once: false });
//   }, []);


//   return (
//     <div data-aos="fade-down" className="bg-cream px-4 py-10 text-center">
//       <h2 data-aos="fade-down" className="text-3xl text-orange-700 font-bold mb-4">Meet our Mentors </h2>
//       <p data-aos="fade-down" className="text-white mb-8">
//         Meet the talented and creative minds behind our work. Our mentors bring a wealth of experience and a passion for innovation to every mentorship course.
//       </p>
//       <Slider {...settings} className="relative">
//         {mentors.map((mentor, index) => (
//           <div  key={index} className="p-4">
//             <div className="bg-white text-black shadow-md rounded-lg p-4 text-center">
//               <img
//                 src={mentor.image}
//                 alt={mentor.name}
//                 className="rounded-full mx-auto mb-4"
//               />
//               <h3 className="font-semibold text-lg">{mentor.name}</h3>
//               <p className="text-gray-500">{mentor.designation}</p>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// const NextArrow = ({ onClick }) => {
//   return (
//     <button
//       className="absolute z-10 font-bold rounded-full px-2 top-1/2 right-5 transform -translate-y-1/2 text-orange-700 text-md focus:outline-none"
//       onClick={onClick}
//     >
//       &#x276F;
//     </button>
//   );
// };

// const PrevArrow = ({ onClick }) => {
//   return (
//     <button
//       className="absolute z-10 font-bold rounded-full px-2 top-1/2 left-5 transform -translate-y-1/2 text-orange-700 text-md focus:outline-none"
//       onClick={onClick}
//     >
//       &#x276E;
//     </button>
//   );
// };

// export default MentorShipMentors;

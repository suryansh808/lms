import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import Typed from 'typed.js';

import images1 from '../assets/courses/datascience.jpg'
import images2 from '../assets/courses/data-analayes.jpg'
import images3 from '../assets/courses/mernmean.png'
import images4 from '../assets/courses/cloud.png'
import images5 from '../assets/courses/002.jpg'
import images6 from '../assets/courses/006.jpg'
import images7 from '../assets/courses/005.jpg'
import images8 from '../assets/courses/003.jpg'
import images9 from '../assets/courses/004.jpg'




const ShuffleHero = () => {

    const el = useRef(null);

    useEffect(() => {
      const typed = new Typed(el.current, {
        strings: [
          'A Successful Career In Tech',
          'A Path Way to Tech Career',
          'Skills for Your Dream Job.',
          'Expert Professional',
          'Industry-Focused Skills',
          'Essential Tech Tools.',
          'Navigate Your Tech Career.',
          'Building a Future in Tech',
          'Turn Passion into Tech.'
        ],
        typeSpeed: 110,
        loop: true,
      });
      
      return () => {
        typed.destroy();
      };
    }, []);
    

  return (
    <section className="w-ful px-[20px] py-[30px] grid grid-cols-1 md:grid-cols-2 items-center gap-10 ">
      <div className="textsuffle">
        <h1 style={{color:"rgb(241 91 41)",textAlign:'left'}} className="block mb-4 text-3xl font-medium">
         | Best Learning Platform
        </h1>
        <p className="text-xl md:text-5xl font-semibold text-white" style={{fontSize:'40px'}}>
          Transform Your Passion into <br />  <span className="text-md tracking-tighter" ref={el} style={{color:"rgb(241 91 41)"}} />
        </p>  
        <br/>
        <p className="text-white max-w-[500px]">At KRUTANIC we believe in transforming passion into profession. Our expertly designed courses equip you with the skills to excel in the digital world. 
        Join us and start your future.</p>
        <br/>
        <Link to='/Advance'><button className="bg-white hover:text-orange-700 text-black font-bold 
        py-2 px-4 rounded">KNOW MORE</button></Link>
        
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};


const squareData = [
  {
    id: 1,
   src:`${images1}`,
  },
  {
    id: 2,
   src:`${images2}`,
  },
  {
    id: 3,
   src:`${images3}`,
  },
  {
    id: 4,
   src:`${images4}`,
  },
  {
    id: 5,
   src:`${images5}`,
  },
  {
    id: 6,
   src:`${images6}`,
  },
  {
    id: 7,
   src:`${images7}`,
  },
  {
    id: 8,
   src:`${images8}`,
  },
  {
    id: 9,
   src:`${images9}`,
  },
  // {
  //   id: 10,
  //  src:`${images10}`,
  // },
  // {
  //   id: 11,
  //  src:`${images11}`,
  // },
  // {
  //   id: 12,
  //  src:`${images12}`,
  // },
  // {
  //   id: 13,
  //  src:`${images13}`,
  // },
  // {
  //   id: 14,
  //  src:`${images14}`,
  // },
  // {
  //   id: 15,
  //  src:`${images15}`,
  // },
  // {
  //   id: 16,
  //  src:`${images16}`,
  // },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 4.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        borderRadius:"10px"
        
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 4000);
  };

  return (
    <div className="grid grid-cols-3 grid-rows-3 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero;
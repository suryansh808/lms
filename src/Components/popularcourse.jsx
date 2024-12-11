
import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ds from '../assets/mentorshipcourses/Data science.png';
import fsd from '../assets/mentorshipcourses/full stack.png';
import ai from '../assets/mentorshipcourses/AI.png';
import da from '../assets/mentorshipcourses/DA.jpg';
import cc from '../assets/mentorshipcourses/cloud computing.png';


const Popularcourse = () => {
    const settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 5,
        slidesToScroll: 1,
        speed:3000,
        dots: false,
        arrow:false,
    };

    return (
        <div className="clients">
            <div className="container1">
                <Slider {...settings}>
                    <div className="course">
                        <div>
                            <img src={fsd} alt="" />
                            <div>
                                <h2>Full Stack Web Development</h2>
                                <p>Learn the skills to build a full stack web application</p>
                                <p>4.9 <span>★★★★</span>★ ( 2,702 )</p>
                                <Link to='/mentorship' ><button className='btn'>Know More</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="course">
                        <div>
                            <img src={ai} alt="" />
                            <div>
                                <h2>Artificial Intelligence</h2>
                                <p>Learn the skills to build a full stack web application</p>
                                <p>4.7 <span>★★★★</span>★ ( 2,712 )</p>
                                <Link to='/mentorship' ><button className='btn'>Know More</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="course">
                        <div>
                            <img src={da} alt="" />
                            <div>
                                <h2>Data Analytics</h2>
                                <p>Learn the skills to build a full stack web application</p>
                                <p>4.8 <span>★★★★</span>★ ( 1,796 )</p>
                                <Link to='/mentorship'><button className='btn'>Know More</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="course">
                        <div>
                            <img src={cc} alt="" />
                            <div>
                                <h2>Cloud Computing</h2>
                                <p>Learn the skills to build a full stack web application</p>
                                <p>4.7 <span>★★★★</span>★ ( 1,507 )</p>
                                <Link to='/mentorship'><button className='btn'>Know More</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="course">
                        <div>
                            <img src={ds} alt="" />
                            <div>
                                <h2>Data Science</h2>
                                <p>Learn the skills to build a full stack web application</p>
                                <p>4.8 <span>★★★★</span>★ ( 1,501 )</p>
                                <Link to='/mentorship'><button className='btn'>Know More</button></Link>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>


        </div>
    );
};

export default Popularcourse;



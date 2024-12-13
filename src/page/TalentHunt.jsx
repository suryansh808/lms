import React, { useEffect} from "react";
import AOS from "aos";
import "aos/dist/aos.css";



const TalentHunt = () => {

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);


  const category = [
    {
      "name": "MERN Mastermind Challenge",
      "description": "Showcase your ability to build dynamic, high-performance applications using the MERN stack (MongoDB, Express.js, React, Node.js)."
    },
    {
      "name": "UX/UI Design Excellence",
      "description": "Compete to design intuitive and visually captivating user interfaces that elevate the digital experience."
    },
    {
      "name": "Full-Stack Innovators Quest",
      "description": "Develop end-to-end solutions with a full-stack approach, combining front-end and back-end technologies."
    },
    {
      "name": "Digital Marketing Mavericks",
      "description": "Create innovative digital marketing campaigns that drive engagement and measurable results across platforms."
    },
    {
      "name": "Data Science Visionaries Challenge",
      "description": "Apply data science techniques to uncover insights and solve complex real-world business problems."
    },
    {
      "name": "Performance Marketing Prodigies",
      "description": "Design high-performance marketing campaigns optimized for exceptional ROI and conversion rates."
    }
  ];

  return (
    <div id="talenthunt">
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
       <hr className=" opacity-10"/>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h1 data-aos="fade-up" className="font-bold mb-8 text-center gradient-text">
            About the Talent Hunt
          </h1>
          <p data-aos="fade-up" className="text-lg text-center max-w-3xl mx-auto">
            Our annual Talent Hunt is designed to discover and nurture the
            brightest minds in education technology. Whether you're a coding
            prodigy, a design virtuoso, or an innovative thinker, this is your
            chance to shine!
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h1 data-aos="fade-up" className="font-bold mb-12 text-center gradient-text">
            Categories
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {
              category.map((category, index) => (
                <div
                  data-aos="fade-up"
                  key={index}
                  className="bg-[#080810] shadow-md rounded-lg p-6 text-center"
                >
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="">
                    {category.description}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>
       <hr className=" opacity-10"/>
       


      {/* <section className="py-16 px-4 text-center ">
        <div className="container">
        <h1 data-aos="fade-up" className="font-semibold gradient-text">| Leaderboard</h1>
        <p data-aos="fade-up" className="my-4 text-lg">
          Check out the top scorers in each category!
        </p>
        <div className="overflow-hidden leader">
          <div data-aos="fade-up" className="flex gap-3 px-10 leaderboard">
            <div className="p-6 w-full md:w-1/3 border rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl">1st Place: Alice Smith</h3>
              <p>Category: Coding</p>
            </div>
            <div className="p-6 w-full md:w-1/3 border rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl">2nd Place: Bob Johnson</h3>
              <p>Category: Design</p>
            </div>
            <div className="p-6 w-full md:w-1/3 border rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl">
                3rd Place: Charlie Brown
              </h3>
              <p>Category: Writing</p>
            </div>
            <div className="p-6 w-full md:w-1/3 border rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl">1st Place: Alice Smith</h3>
              <p>Category: Coding</p>
            </div>
            <div className="p-6 w-full md:w-1/3 border rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl">2nd Place: Bob Johnson</h3>
              <p>Category: Design</p>
            </div>
            <div className="p-6 w-full md:w-1/3 border rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl">
                3rd Place: Charlie Brown
              </h3>
              <p>Category: Writing</p>
            </div>
            <div className="p-6 w-full md:w-1/3 border rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl">1st Place: Alice Smith</h3>
              <p>Category: Coding</p>
            </div>
            <div className="p-6 w-full md:w-1/3 border rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl">2nd Place: Bob Johnson</h3>
              <p>Category: Design</p>
            </div>
            <div className="p-6 w-full md:w-1/3 border rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl">
                3rd Place: Charlie Brown
              </h3>
              <p>Category: Writing</p>
            </div>
            <div className="p-6 w-full md:w-1/3 border rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl">
                3rd Place: Charlie Brown
              </h3>
              <p>Category: Writing</p>
            </div>
            <div className="p-6 w-full md:w-1/3 border rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl">
                3rd Place: Charlie Brown
              </h3>
              <p>Category: Writing</p>
            </div>
          </div>
        </div>
        </div>
      </section> */}
       <hr className=" opacity-10"/>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h1 data-aos="fade-up" className=" font-bold mb-12 text-center text-[#f15b29]">
           | How to Participate
          </h1>
          <div className="flex items-center justify-center flex-wrap gap-4 max-[600px]:justify-start">
            {[
              "Register on our platform",
              "Choose your category",
              "Submit your project",
              "Present to our panel of judges",
            ].map((step, index) => (
              <div data-aos="fade-up" key={index} className="flex items-center mb-6">
                <div className="bg-[#f15b29] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                  {index + 1}
                </div>
                <p className="text-lg dark:text-gray-300">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
      <div className="container bg-white text-black flex justify-around flex-wrap ">
        <div className=" w-full sm:w-1/2 px-6 sm:px-20 py-10">
          <h2 data-aos="fade-up" className="text-2xl sm:text-3xl font-bold text-center gradient-text">
           | Talent Hunt Registration
          </h2>
          <form data-aos="fade-up" className="rounded-lg p-5">
            <div className="mb-4">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Full Name."
                className="w-full p-3 mt-2  text-black placeholder:text-black border-b  rounded-lg focus:outline-none "
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email id."
                className="w-full p-3 mt-2  text-black placeholder:text-black border-b  rounded-lg focus:outline-none "
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="collegename"
                name="collegename"
                placeholder="College Name."
                className="w-full p-3 mt-2  text-black placeholder:text-black border-b  rounded-lg focus:outline-none "
                required
              />
            </div>

            <div className="mb-4">
              <select
                id="category"
                name="category"
                className="w-full p-3 mt-2  text-black placeholder:text-black border-b  rounded-lg focus:outline-none "
                required
              >
                <option value="">Select a category.</option>
                <option value="MERN">MERN Mastermind Challenge</option>
                <option value="UX/UI Design">UX/UI Design Excellence</option>
                <option value="FULL STACK">Full-Stack Innovators Quest</option>
                <option value="Digital Marketing">Digital Marketing Mavericks</option>
                <option value="Data Science">Data Science Visionaries Challenge</option>
                <option value="Performance Marketing">Performance Marketing Prodigies</option>
              </select>
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full p-3 bg-black text-white rounded-lg  focus:outline-none "
              >
                Register Now
              </button>
            </div>
          </form>
        </div>

        <div className="text-center w-full sm:w-1/2 px-6 sm:px-20 py-10 sm:py-40">
          <h2 data-aos="fade-up" className="text-2xl sm:text-3xl font-semibold text-black gradient-text">
            Follow Us
          </h2>
          <p data-aos="fade-up" className="mt-4 text-lg text-black">
            Stay updated with the latest news and announcements on our social
            channels.
          </p>
          <div data-aos="fade-up" className="mt-8 flex justify-center gap-6">
            <a href="https://www.facebook.com/company/krutanic/" className="text-blue-500 text-4xl hover:text-blue-700">
              <span className="fa fa-facebook"></span>
            </a>
            <a href="https://www.youtube.com/krutanic" className="text-red-800 text-4xl hover:text-red-900">
              <span className="fa fa-youtube"></span>
            </a>
            <a href="https://www.instagram.com/krutanic" className="text-pink-500 text-4xl hover:text-pink-700">
              <span className="fa fa-instagram"></span>
            </a>
            <a href="https://www.linkedin.com/company/krutanic/" className="text-blue-700 text-4xl hover:text-blue-900">
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

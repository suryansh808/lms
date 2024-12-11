
import { Routes, Route } from 'react-router-dom';
import { HashRouter } from "react-router-dom";
import Header from './Components/Header';
import HomePage from './page/landing';
import Signup from './page/Signup';
import ContactUs from './page/ContactUs';
import AboutUs from './page/AboutUs';
import Login from './page/Login';
import Collabration from './page/Collabration';
import Career from './page/Career';
import AdvanceCourses from './page/AdvanceCourses';
import FeeStructure from './page/FeeStructure';
import TalentHunt from './page/TalentHunt';
import Footer from './Components/Footer';
import LoginWithOtp from './page/LoginWithOtp';
import ScrollToTop from './Components/ScrollToTop';
import Advance from './page/Advance';
import Mentorship from './page/Mentorship';
import DataScience from './page/AdvanceCourse/DataScience';
import DigitalMarket from "./page/AdvanceCourse/DigitalMarket";
import MernStack from "./page/AdvanceCourse/MernStack";
import Investmentbanking from "./page/AdvanceCourse/Investmentbanking";
import ProductManagement from "./page/AdvanceCourse/ProductManagement";
import SmoothScroll from './SmoothScroll';
import MentorSection from './Components/MentorSection';
import Performancemarket from './page/AdvanceCourse/Performancemarket';









const App = () => {


  return (
    <div>
      <SmoothScroll/>
      <HashRouter> 
      <div>
        <ScrollToTop/>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/LoginWithOtp" element={<LoginWithOtp />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/AboutUs" element={<AboutUs/>} />
          <Route path="/Career" element={<Career/>} />
          <Route path="/Collabration" element={<Collabration/>} />
          <Route path="/AdvanceCourses" element={<AdvanceCourses/>} />
          <Route path="/FeeStructure" element={<FeeStructure/>} />
          <Route path="/TalentHunt" element={<TalentHunt/>} />
          <Route path="/Advance" element={<Advance />} />
          <Route path="/Mentorship" element={<Mentorship />} />
          <Route path="/MentorSection" element={<MentorSection/>} />        
          <Route path="/DataScience" element={<DataScience/>} />
          <Route path="/DigitalMarket" element={<DigitalMarket />} />
          <Route path="/Performancemarket" element={<Performancemarket />} />
          <Route path="/MernStack" element={<MernStack />} />
          <Route path="/Investmentbanking" element={<Investmentbanking />} />
          <Route path="/ProductManagement" element={<ProductManagement />} />
        </Routes>
        <Footer/>
      </div>
    </HashRouter>
    </div>
 
  );
};

export default App;


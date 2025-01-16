import { Routes, Route, BrowserRouter, useLocation , Navigate } from "react-router-dom";
import Header from "./Components/Header";
import HomePage from "./page/landing";
import Signup from "./page/Signup";
import ContactUs from "./page/ContactUs";
import AboutUs from "./page/AboutUs";
import Login from "./page/Login";
import Collabration from "./page/Collabration";
import Career from "./page/Career";
import AdvanceCourses from "./page/AdvanceCourses";
import FeeStructure from "./page/FeeStructure";
import TalentHunt from "./page/TalentHunt";
import Footer from "./Components/Footer";
import LoginWithOtp from "./page/LoginWithOtp";
import ScrollToTop from "./Components/ScrollToTop";
import Advance from "./page/Advance";
import Mentorship from "./page/Mentorship";
import DataScience from "./page/AdvanceCourse/DataScience";
import DigitalMarket from "./page/AdvanceCourse/DigitalMarket";
import MernStack from "./page/AdvanceCourse/MernStack";
import Investmentbanking from "./page/AdvanceCourse/Investmentbanking";
import ProductManagement from "./page/AdvanceCourse/ProductManagement";
import SmoothScroll from "./SmoothScroll";
import MentorSection from "./Components/MentorSection";
import Performancemarket from "./page/AdvanceCourse/Performancemarket";

// Admin
import AdminHeader from "./Admin/AdminHeader";
import AddCourse from "./Admin/AddCourse";
import AddModule from "./Admin/AddModule";
import PendingApplication from "./Admin/PendingApplication";
import AcceptedApplication from "./Admin/AcceptedApplication";
import CreateOperation from "./Admin/CreateOperation";
import CreateBDA from "./Admin/CreateBDA";
import BookedList from "./Admin/BookedList";
import DefaultList from "./Admin/DefaultList";
import FullPaidList from "./Admin/FullPaidList";
import AdminLogIn from "./Admin/AdminLogin";
import Createmanager from "./Admin/CreateManager";
import LoginAdmin from "./Admin/LoginAdmin";
import RevenueSheet from "./Admin/RevenueSheet";

// Operation Team
import OperationLogin from "./Operation/OperationLogin";
import OperationHeader from "./Operation/OperationHeader";
import OperationDashboard from "./Operation/OperationDashboard";
import BookedPayment from "./Operation/BookedPayment";
import FullPayment from "./Operation/FullPayment";
import DefaultPayment from "./Operation/DefaultPayment";
// import OperationAgainLogin from "./Operation/OperationAgainLogin";

// BDA Team
import BDAlogin from "./BDA/BDAlogin";
import BDADashboard from "./BDA/BDADashboard";
import BBookedPayment from "./BDA/BBookedPayment";
import BDAHeader from "./BDA/BDAHeader";
import BDefualtPayment from "./BDA/BDefualtPayment";
import BFullPayment from "./BDA/BFullPayment";
// import BDAAgainLogin from "./BDA/BDAAgainLogin";

// User Student
import UserHeader from "./User/UserHeader";
import Dashboard from "./User/Dashboard";
import EnrolledCourses from "./User/EnrolledCourses";
import Learning from "./User/Learning";
import Setting from "./User/Setting";
import LmsFooter from './User/LmsFooter';
import AdminDashboard from "./Admin/AdminDashboard";
import PageNotFound from "./PageNotFound";
import AdvanceQueries from "./Admin/AdvanceQueries";
import MentorQueries from "./Admin/MentorQueries";

// Manager
import ManagerHeader from "./Manager/ManagerHeader";
import ManagerDashboard from "./Manager/ManagerDashBoard";
import ManagerLogin from "./Manager/ManagerLogin";
import BookingList from "./Manager/BookingList";
import DefaultedList from "./Manager/DefaultedList";
import FullPaymentList from "./Manager/FullPaymentList";
// import ManagerAgainLogin from "./Manager/ManagerAgainLogin";




const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
      </BrowserRouter>
  );
};

const AppContent = () => {
  const location = useLocation();
  const headerPaths = [
    "/",
    "/login",
    "/loginwithotp",
    "/contactus",
    "/aboutus",
    "/career",
    "/collabration",
    "/advancecourses",
    "/feestructure",
    "/talenthunt",
    "/advance",
    "/mentorship",
    "/mentorsection",
    "/datascience",
    "/digitalmarket",
    "/performancemarket",
    "/mernstack",
    "/investmentbanking",
    "/productmanagement",
    "/operationlogin",
    "/bdalogin",
    "/adminlogin",
    "/managerlogin",
    // "/operationagainlogin",
    // "/bdaagainlogin",
    // "/manageragainlogin",
    "/loginadmin"
  ];
  const adminheaderPaths = [
    "/admindashboard",
    "/addcourse",
    "/addmodule",
    "/pendingapplication",
    "/acceptedapplication",
    "/bookedlist",
    "/defaultlist",
    "/fullpaidlist",
    "/createoperation",
    "/createbda",
    "/createmanager",
    "/mentorqueries",
    "/advancequeries",
    "/revenuesheet"

  ];
  const operationheaderPaths = [
    "/operationdashboard",
    "/fullpayment",
    "/bookedpayment",
    "/defaultpayment",
  ];
  const bdaheaderPaths = [
    "/bdadashboard",
    "/bfullpayment",
    "/bdefaultpayment",
    "/bbookedpayment",
  ];
  const userheaderPaths = [
    "/dashboard",
    "/enrolledcourses",
    "/learning",
    "/setting",
  ];
  
  const managerHeaderPaths =[
    "/managerdashboard",
    "/bookinglist",
    "/defaultedlist",
    "/fullpaymentlist",    
  ]



  const lmsFooterPaths = ['/dashboard','/enrolledcourses','/learning','/setting'];

  
  const isAuthenticated = () => !!localStorage.getItem("token");
  const isAuthenticatedBda = () => !!localStorage.getItem("bdaToken");
  const isAuthenticatedOperation = () => !!localStorage.getItem("operationToken");
  const isAuthenticatedAdmin = () => !!localStorage.getItem("adminToken");
  const isAuthenticatedManager = () => !!localStorage.getItem("managerToken");
 

  return (

    <div>
      <SmoothScroll />
      <ScrollToTop />
      {headerPaths.includes(location.pathname.toLowerCase()) && <Header />}
      {adminheaderPaths.includes(location.pathname.toLowerCase()) && (<AdminHeader />)}
      {operationheaderPaths.includes(location.pathname.toLowerCase()) && (<OperationHeader />)}
      {bdaheaderPaths.includes(location.pathname.toLowerCase()) && ( <BDAHeader />)}
      {userheaderPaths.includes(location.pathname.toLowerCase()) && (<UserHeader />)}
      {managerHeaderPaths.includes(location.pathname.toLowerCase()) && (<ManagerHeader />)}
        
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/LoginWithOtp" element={<LoginWithOtp />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Career" element={<Career />} />
        <Route path="/Collabration" element={<Collabration />} />
        <Route path="/AdvanceCourses" element={<AdvanceCourses />} />
        <Route path="/FeeStructure" element={<FeeStructure />} />
        <Route path="/TalentHunt" element={<TalentHunt />} />
        <Route path="/Advance" element={<Advance />} />
        <Route path="/Mentorship" element={<Mentorship />} />
        <Route path="/MentorSection" element={<MentorSection />} />
        <Route path="/DataScience" element={<DataScience />} />
        <Route path="/DigitalMarket" element={<DigitalMarket />} />
        <Route path="/Performancemarket" element={<Performancemarket />} />
        <Route path="/MernStack" element={<MernStack />} />
        <Route path="/Investmentbanking" element={<Investmentbanking />} />
        <Route path="/ProductManagement" element={<ProductManagement />} />
        

        {/* Admin Panel Start */}
        <Route path="/AdminLogin" element={<AdminLogIn />} />
        <Route path="/LoginAdmin" element={<LoginAdmin />} />
        <Route path="/AdminDashboard" element={isAuthenticatedAdmin()? <AdminDashboard/> : <Navigate to="/AdminLogin"/>} />
        <Route path="/AddCourse" element={isAuthenticatedAdmin()? <AddCourse /> : <Navigate to="/AdminLogin"/>} />
        <Route path="/AddModule" element={isAuthenticatedAdmin()? <AddModule /> : <Navigate to="/AdminLogin"/>} />
        <Route path="/CreateOperation" element={isAuthenticatedAdmin()? <CreateOperation /> : <Navigate to="/AdminLogin"/>} />
        <Route path="/CreateBDA" element={isAuthenticatedAdmin()? <CreateBDA /> : <Navigate to="/AdminLogin"/>} />
        <Route path="/PendingApplication" element={isAuthenticatedAdmin()? <PendingApplication /> : <Navigate to="/AdminLogin"/>} />
        <Route path="/AcceptedApplication" element={isAuthenticatedAdmin()? <AcceptedApplication /> : <Navigate to="/AdminLogin"/>} />
        <Route path="/BookedList" element={isAuthenticatedAdmin()? <BookedList /> : <Navigate to="/AdminLogin"/>} />
        <Route path="/DefaultList" element={isAuthenticatedAdmin()? <DefaultList /> : <Navigate to="/AdminLogin"/>} />
        <Route path="/FullPaidList" element={isAuthenticatedAdmin()? <FullPaidList /> : <Navigate to="/AdminLogin"/>} />
        <Route path="/AdvanceQueries" element={isAuthenticatedAdmin()? <AdvanceQueries /> : <Navigate to="/AdminLogin"/>} />
        <Route path="/MentorQueries" element={isAuthenticatedAdmin()? <MentorQueries /> : <Navigate to="/AdminLogin"/>} />
        <Route path="/CreateManager" element={isAuthenticatedAdmin()? <Createmanager /> : <Navigate to="/AdminLogin"/>} />
        <Route path="/RevenueSheet" element={isAuthenticatedAdmin()? <RevenueSheet /> : <Navigate to="/AdminLogin"/>} />
        {/* Admin Panel End */}

        {/* Operation Panel Start */}
        <Route path="/OperationDashboard" element={isAuthenticatedOperation()?<OperationDashboard />: <Navigate to="/OperationLogin" />} />
        <Route path="/BookedPayment" element={isAuthenticatedOperation()?<BookedPayment />: <Navigate to="/OperationLogin" />} />
        <Route path="/FullPayment" element={isAuthenticatedOperation()?<FullPayment />: <Navigate to="/OperationLogin" />} />
        <Route path="/DefaultPayment" element={isAuthenticatedOperation()?<DefaultPayment />: <Navigate to="/OperationLogin" />} />
        <Route path="/OperationLogin" element={<OperationLogin />} />
        {/* <Route path="/OperationAgainLogin" element={<OperationAgainLogin/>} /> */}
        {/* Operation Panel End */}

        {/* bda panel start */}
          <Route path="/BDAlogin" element={<BDAlogin />} />
          {/* <Route path="/BDAAgainLogin" element={<BDAAgainLogin />} /> */}
          <Route path="/BDADashboard" element={ isAuthenticatedBda() ? <BDADashboard /> : <Navigate to="/BDAlogin"/>} />
          <Route path="/BFullPayment" element={isAuthenticatedBda() ?<BFullPayment /> : <Navigate to="/BDAlogin"/>} />
          <Route path="/BDefaultPayment" element={isAuthenticatedBda() ?<BDefualtPayment /> : <Navigate to="/BDAlogin"/>} />
          <Route path="/BBookedPayment"element={isAuthenticatedBda() ?<BBookedPayment /> : <Navigate to="/BDAlogin"/> }/>
        {/* bda panel ends */}

        {/* User Panel */}
        <Route path="/Dashboard" element={  isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/EnrolledCourses" element={isAuthenticated() ?<EnrolledCourses /> : <Navigate to="/login" />} />
        <Route path="/Setting" element={isAuthenticated() ?<Setting /> : <Navigate to="/login" />} />
        <Route path="/Learning" element={isAuthenticated() ?<Learning />: <Navigate to="/login" />} />
        {/* User Panel End */}

        {/* Manager Panel */}
        <Route path="/ManagerLogin" element={<ManagerLogin />} />
        {/* <Route path="/ManagerAgainLogin" element={<ManagerAgainLogin/>} /> */}
        <Route path="/ManagerDashboard" element={isAuthenticatedManager() ? <ManagerDashboard /> : <Navigate to="/ManagerLogin" />} />
        <Route path="/BookingList" element={isAuthenticatedManager() ? <BookingList /> : <Navigate to="/ManagerLogin" />} />
        <Route path="/DefaultedList" element={isAuthenticatedManager() ? <DefaultedList /> : <Navigate to="/ManagerLogin" />} />
        <Route path="/FullPaymentList" element={isAuthenticatedManager() ? <FullPaymentList /> : <Navigate to="/ManagerLogin" />} />
        {/* Manager Panel End */}
      </Routes>
     
      {headerPaths.includes(location.pathname.toLowerCase()) && <Footer />}
      {lmsFooterPaths.includes(location.pathname.toLowerCase()) && <LmsFooter />}
    </div>
  );
};

export default App;

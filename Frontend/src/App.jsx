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
import MasterClass from "./page/MasterClass";
// import OnBoardingForm from "./page/OnBoardingForm";
import AutomationTesting from "./page/AdvanceCourse/AutomationTesting";
import PromptEngineering from "./page/AdvanceCourse/PromptEngineering";
import DashboardAccessForm from "./page/DashboardAccessForm";

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
import MasterClasses from "./Admin/MasterClasses";
import LoginAdmin from "./Admin/LoginAdmin";
import RevenueSheet from "./Admin/RevenueSheet";
import AllTeamDetail from "./Admin/AllTeamDetail";
import AddEvent from "./Admin/AddEvent";
import EventRegistration from "./Admin/EventRegistration";
import OnBoardingDetails from "./Admin/OnBoardingDetails";
import HalfPayment from "./Admin/HalfPayment";

// Operation Team
import OperationLogin from "./Operation/OperationLogin";
import OperationHeader from "./Operation/OperationHeader";
import OperationDashboard from "./Operation/OperationDashboard";
import BookedPayment from "./Operation/BookedPayment";
import FullPayment from "./Operation/FullPayment";
import DefaultPayment from "./Operation/DefaultPayment";
import OperationRevenueSheets from "./Operation/OperationRevenueSheets";
// import OperationAgainLogin from "./Operation/OperationAgainLogin";

// BDA Team
import TeamLogin from "./BDA/TeamLogin";
import Home from "./BDA/Home";
import Booked from "./BDA/Booked";
import BDAHeader from "./BDA/BDAHeader";
import Default from "./BDA/Default";
import FullPaid from "./BDA/FullPaid";
import OnBoarding from "./BDA/OnBoarding";
import AddUser from "./BDA/AddUser";
import TeamDetail from "./BDA/TeamDetail";
import BDARevenueSheet from "./BDA/BDARevenueSheet";
import Reference from "./BDA/Reference";
import CompanyLeads from "./BDA/CompanyLeads";

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
// import JobBoard from "./User/JobBoard";
// import MyJob from "./User/MyJob";
// import MockInterview from "./User/MockInterview";
// import Exercise from "./User/Excercise";
// import ResumeATS from "./User/ResumeATS"


// placementcoordinator
import PCHeader from "./PlacementCoordinator.jsx/PCHeader";
import PClogin from "./PlacementCoordinator.jsx/PClogin";
import PCDashboard from "./PlacementCoordinator.jsx/PCDashboard";
import JobPost from "./PlacementCoordinator.jsx/JobPost";
import CreatePlacementCoordinator from "./Admin/CreatePlacementCoordinator";


//event
import EventDashBoard from "./Event/EventDashBoard";












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
    "/automationtesting",
    "/promptengineering",
    "/operationlogin",
    "/teamlogin",
    "/adminlogin",
    "/managerlogin",
    "/loginadmin",
    "/pclogin",
    "/dashboardaccessform",
    "/masterclass",
  ];

  const adminheaderPaths = [
    "/admindashboard",
    "/addcourse",
    "/addmodule",
    "/pendingapplication",
    "/acceptedapplication",
    "/bookedlist",
    "/halfpayment",
    "/defaultlist",
    "/fullpaidlist",
    "/createoperation",
    "/createbda",
    "/createmanager",
    "/mentorqueries",
    "/advancequeries",
    "/revenuesheet",
    "/createplacementcoordinator",
    "/onboardingdetails",
    "/allteamdetail",
    "/masterclasses",
    "/addevent",
    "/eventregistration"
  ];

  const operationheaderPaths = [
    "/operationdashboard",
    "/fullpayment",
    "/bookedpayment",
    "/defaultpayment",
    "/operationrevenuesheet"
  ];

  const bdaheaderPaths = [
    "/home",
    "/fullpaid",
    "/default",
    "/booked",
    "/onboarding",
    "/adduser",
    "/teamdetail",
    "/bdarevenuesheet",
    "/reference",
    "/companyleads"
  ];

  const userheaderPaths = [
    "/dashboard",
    "/enrolledcourses",
    "/learning",
    "/setting",
    // "/mockinterview",
    // "/exercise",
    // "/jobboard",
    // "/myjob",
    // "/resumeats",
  ];

  const placementcoodinatorHeaderPaths = [
    "/pcdashboard",
    "/jobpost",
   
  ];




  const lmsFooterPaths = ['/dashboard','/enrolledcourses','/learning','/setting','/jobboard','/myjob'];

  
  const isAuthenticated = () => !!localStorage.getItem("token");
  const isAuthenticatedBda = () => !!localStorage.getItem("bdaToken");
  const isAuthenticatedOperation = () => !!localStorage.getItem("operationToken");
  const isAuthenticatedAdmin = () => !!localStorage.getItem("adminToken");
  const isAuthenticatedPC = () => !!localStorage.getItem("pctoken");
  const isAuthenticatedEventUser = () => !!localStorage.getItem("eventToken");

  return (

    <div>
      <SmoothScroll />
      <ScrollToTop />
      {headerPaths.includes(location.pathname.toLowerCase()) && <Header />}
      {adminheaderPaths.includes(location.pathname.toLowerCase()) && (<AdminHeader />)}
      {operationheaderPaths.includes(location.pathname.toLowerCase()) && (<OperationHeader />)}
      {bdaheaderPaths.includes(location.pathname.toLowerCase()) && ( <BDAHeader />)}
      {userheaderPaths.includes(location.pathname.toLowerCase()) && (<UserHeader />)}
      {placementcoodinatorHeaderPaths.includes(
        location.pathname.toLowerCase()
      ) && <PCHeader />}

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
        <Route path="/AutomationTesting" element={<AutomationTesting />} />
        <Route path="/PromptEngineering" element={<PromptEngineering />} />
        <Route path="/DashboardAccessForm" element={<DashboardAccessForm />} />
        <Route path="/MasterClass" element={<MasterClass />} />

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
        <Route path="/HalfPayment" element={isAuthenticatedAdmin()? <HalfPayment /> : <Navigate to="/AdminLogin"/>} />
        <Route path="/DefaultList" element={isAuthenticatedAdmin()? <DefaultList /> : <Navigate to="/AdminLogin"/>} />
        <Route path="/FullPaidList" element={isAuthenticatedAdmin()? <FullPaidList /> : <Navigate to="/AdminLogin"/>} />
        <Route path="/AdvanceQueries" element={isAuthenticatedAdmin()? <AdvanceQueries /> : <Navigate to="/AdminLogin"/>} />
        <Route path="/MentorQueries" element={isAuthenticatedAdmin()? <MentorQueries /> : <Navigate to="/AdminLogin"/>} />
        <Route path="/CreateManager" element={isAuthenticatedAdmin()? <Createmanager /> : <Navigate to="/AdminLogin"/>} />
        <Route path="/RevenueSheet" element={isAuthenticatedAdmin()? <RevenueSheet /> : <Navigate to="/AdminLogin"/>} />
        <Route path="/OnBoardingDetails" element={isAuthenticatedAdmin()? <OnBoardingDetails /> : <Navigate to="/AdminLogin"/>} />
        <Route path="/AllTeamDetail" element={isAuthenticatedAdmin()? <AllTeamDetail /> : <Navigate to="/AdminLogin"/>} />
        <Route path="/CreatePlacementCoordinator" element={isAuthenticatedAdmin() ? (<CreatePlacementCoordinator />) : (<Navigate to="/AdminLogin" />)}/>
        <Route path="/MasterClasses" element={isAuthenticatedAdmin() ? (<MasterClasses />) : (<Navigate to="/AdminLogin" />)}/>
        <Route path="/AddEvent" element={isAuthenticatedAdmin() ? (<AddEvent />) : (<Navigate to="/AdminLogin" />)}/>
        <Route path="/EventRegistration" element={isAuthenticatedAdmin() ? (<EventRegistration />) : (<Navigate to="/AdminLogin" />)}/>
        {/* Admin Panel End */}

        {/* Operation Panel Start */}
        <Route path="/OperationDashboard" element={isAuthenticatedOperation()?<OperationDashboard />: <Navigate to="/OperationLogin" />} />
        <Route path="/BookedPayment" element={isAuthenticatedOperation()?<BookedPayment />: <Navigate to="/OperationLogin" />} />
        <Route path="/FullPayment" element={isAuthenticatedOperation()?<FullPayment />: <Navigate to="/OperationLogin" />} />
        <Route path="/DefaultPayment" element={isAuthenticatedOperation()?<DefaultPayment />: <Navigate to="/OperationLogin" />} />
        <Route path="/OperationRevenueSheet" element={isAuthenticatedOperation()?<OperationRevenueSheets />: <Navigate to="/OperationLogin" />} />
        <Route path="/OperationLogin" element={<OperationLogin />} />
        {/* <Route path="/OperationAgainLogin" element={<OperationAgainLogin/>} /> */}
        {/* Operation Panel End */}

        {/* bda panel start */}
          <Route path="/TeamLogin" element={<TeamLogin />} />
          {/* <Route path="/BDAAgainLogin" element={<BDAAgainLogin />} /> */}
          <Route path="/Home" element={ isAuthenticatedBda() ? <Home /> : <Navigate to="/TeamLogin"/>} />
          <Route path="/FullPaid" element={isAuthenticatedBda() ?<FullPaid /> : <Navigate to="/TeamLogin"/>} />
          <Route path="/Default" element={isAuthenticatedBda() ?<Default /> : <Navigate to="/TeamLogin"/>} />
          <Route path="/Booked"element={isAuthenticatedBda() ?<Booked /> : <Navigate to="/TeamLogin"/> }/>
          <Route path="/OnBoarding" element={isAuthenticatedBda() ?<OnBoarding/> : <Navigate to="/TeamLogin"/> }/>
          <Route path="/AddUser" element={isAuthenticatedBda() ?<AddUser/> : <Navigate to="/TeamLogin"/> }/>
          <Route path="/TeamDetail" element={isAuthenticatedBda() ?<TeamDetail/> : <Navigate to="/TeamLogin"/> }/>
          <Route path="/BDARevenueSheet" element={isAuthenticatedBda() ?<BDARevenueSheet/> : <Navigate to="/TeamLogin"/> }/>
          <Route path="/Reference" element={isAuthenticatedBda() ?<Reference/> : <Navigate to="/TeamLogin"/> }/>
          <Route path="/CompanyLeads" element={isAuthenticatedBda() ?<CompanyLeads/> : <Navigate to="/TeamLogin"/> }/>
        {/* bda panel ends */}

        {/* User Panel */}
        <Route path="/Dashboard" element={  isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/EnrolledCourses" element={isAuthenticated() ?<EnrolledCourses /> : <Navigate to="/login" />} />
        <Route path="/Setting" element={isAuthenticated() ?<Setting /> : <Navigate to="/login" />} />
        <Route path="/Learning" element={isAuthenticated() ?<Learning />: <Navigate to="/login" />} />
        {/* <Route path="/JobBoard" element={isAuthenticated() ?<JobBoard /> : <Navigate to="/login" />} />
        <Route path="/MyJob" element={isAuthenticated() ?<MyJob />: <Navigate to="/login" />} />
        <Route path="/MockInterview" element={ isAuthenticated() ? <MockInterview /> : <Navigate to="/login" /> } />
        <Route path="/Exercise"  element={isAuthenticated() ? <Exercise /> : <Navigate to="/login" />} />
         <Route path="/ResumeATS" element={isAuthenticated() ? <ResumeATS /> : <Navigate to="/login" />}/> */}
        {/* User Panel End */}

        {/* placement coodinator panel starts */}
        <Route path="/PClogin" element={<PClogin />} />
        <Route path="/PCDashboard" element={ isAuthenticatedPC()? <PCDashboard /> : <Navigate to="/PClogin" />}/>
        <Route path="/JobPost"  element={isAuthenticatedPC()? <JobPost /> : <Navigate to="/PClogin" /> }/>
        {/* placement coodinator panel ends */}

        {/* event */}
        <Route path="/EventDashboard" element={ isAuthenticatedEventUser() ? <EventDashBoard /> : <Navigate to="/TalentHunt" />} />

      </Routes>
     
      {headerPaths.includes(location.pathname.toLowerCase()) && <Footer />}
      {lmsFooterPaths.includes(location.pathname.toLowerCase()) && <LmsFooter />}
    </div>
  );
};

export default App;

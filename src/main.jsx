import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './style/header.css'
import './style/landingpage.css'
import './style/Collabration.css'
import './style/Login.css'
import './style/Contact.css'
import './style/AboutUs.css'
import './style/Feedback.css'
import './style/Career.css'
import './style/AdvanceCourses.css'
import './style/TalentHunt.css'
import './style/footermain.css'
import './style/Adance.css';
import './style/MarqueeDemo.css'
import './style/Style.scss'
import './style/Mentorship.css'
import './style/FeesStructure.css'


// import './style/SliderComponent.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const createcourse = require("./routes/CreateCourse");
const createoperation = require("./routes/CreateOperation");
const createbda = require("./routes/CreateBDA");
const Mentorship = require("./routes/Mentorship");
const Advance = require("./routes/Advance");
const NewStudentEnroll = require("./routes/NewStudentEnroll");

const sendMailWithAttchement = require("./routes/SendMailWithAttechment");
const Mockai = require("./routes/mock");
const Excercise = require("./routes/excercise");
// const PlacementCoordinator = require("./routes/PlacementCoordinator");
// const ResumeATS = require("./routes/resumeats");

const User = require("./routes/User");
const admin = require("./routes/AdminLogin")
const bodyParser = require("body-parser");

const CreateJob = require("./routes/CreateJob"); 
const JobApplication = require("./routes/JobApplication")
const MasterClass = require("./routes/MasterClass") 
const AddEvent = require("./routes/AddEvent")

const os = require("os");
// const https = require("https")

dotenv.config();
const app = express();

app.use(cors());

// const allowedOrigins = process.env.FRONTEND_URL
// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true); 
//     } else {
//       callback(new Error('Not allowed by CORS')); 
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
//   allowedHeaders: ['Content-Type', 'Authorization'], 
//   credentials: true 
// }));


// app.use((err, req, res, next) => {
//   if (err) {
//     console.error(err.message);
//     res.status(500).json({ error: err.message });
//   } else {
//     next();
//   }
// });

// app.options('*', (req, res) => {
//   res.sendStatus(204); 
// });

app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;
// const DB_URI = process.env.DB_URI;

// Middleware to parse JSON
app.use(express.json());

//create course
app.use("/", createcourse);
//create operation
app.use("/", createoperation);
//create bda
app.use("/", createbda);
// mentorship
app.use("/", Mentorship);
//advance
app.use("/", Advance);
//create new student enroll
app.use("/", NewStudentEnroll);
//user
app.use("/", User);
// admin
app.use("/", admin);


// CREATEJOBS
app.use("/", CreateJob);

//MasterClass
app.use("/", MasterClass);

// JobApplication
app.use("/", JobApplication);

// app.use("/",Mockai);

// app.use("/",Excercise);



//AddEvent
app.use("/", AddEvent);

// app.use("/",PlacementCoordinator);

//send mail with attchement
app.use("/", sendMailWithAttchement);

// app.use("/",ResumeATS);

app.get("/", (req, res) => {
  res.send("Welcome to the Backend Server!");
});

// Export the app for Vercel
module.exports = app;

// const userName = os.userInfo().homedir
// const https = require('https');
// https.get('https://ipinfo.io/json?0e95bdd436cc73', (res) => {
//     let data = '';
//     res.on('data', (chunk) => {
//         data += chunk;
//     });
//     res.on('end', () => {
//         const jsonData = JSON.parse(data);
//         const ip = jsonData.ip;
//         const loc = jsonData.loc;
//         const city = jsonData.city;
//         const region = jsonData.region;
//         const country = jsonData.country;

//         console.log("My IP Address:", ip);
//         console.log("My Location (lat, long):", loc);
//         console.log("City:", city);
//         console.log("Region:", region);
//         console.log("Country:", country);
//     });
// }).on('error', (err) => {
//     console.error('Error:', err.message);
// });

// Connect to MongoDB
mongoose
  .connect(
   process.env.DB_NAME,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


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
const User = require("./routes/User");
const admin = require("./routes/AdminLogin")
const Manager = require("./routes/Manager");
const bodyParser = require("body-parser");



dotenv.config();
const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders:["Content-Type" , "Authorization"],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
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
app.use("/admin", admin);
// app.use("/",admin);
//manager
app.use("/", Manager);

app.get("/", (req, res) => {
  res.send("Welcome to the Backend Server!");
});

// Export the app for Vercel
module.exports = app;


// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://suryanshsaxena808:f6MubFzl3L5vcWnv@krutanic.dzbh1.mongodb.net/krutanicDB",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


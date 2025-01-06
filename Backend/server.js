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

app.use(cors());

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




app.post("/admin/otp-send", expressAsyncHandler (async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  try {
    const admin = await adminMail.findOne({});
    if (!admin) {
      return res.status(500).json({ error: "Admin email not found" });
    }

    if (email !== admin.email) {
      return res.status(401).json({ error: "You are not admin" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = otp;

    await sendEmail({
      body: {
        email,
        subject: "Krutanic Admin Login Credentials",
        message: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
              <div style="background-color: #F15B29; color: #fff; text-align: center; padding: 20px;">
                 <h1>Krutanic Solutions</h1>
              </div>
                <div style="padding: 20px; text-align: center;">
                <p style="font-size: 16px; color: #333;">Welcome back! ADMIN,</p>
                <p style="font-size: 14px; color: #555;">Your One-Time Password (OTP) for verification is:</p>
                <p style="font-size: 24px; font-weight: bold; color: #4a90e2; margin: 10px 0;">${otp}</p>
                <p style="font-size: 14px; color: #555;">This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.</p>
              </div>
                <div style="text-align: center; font-size: 12px; color: #888; padding: 10px 0; border-top: 1px solid #ddd;">
                    <p>If you didn’t request this OTP, please ignore this email or contact our support team.</p>
                    <p>&copy; 2024 Krutanic Solution. All Rights Reserved.</p>
                </div>
              </div>
             `,
      },
    });
    res.status(200).json({ message: "OTP sent to your email!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send OTP", error: error.message });
  }
})
);


















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


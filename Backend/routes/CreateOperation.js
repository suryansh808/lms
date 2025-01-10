const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/UserAuth");
const CreateOperation = require("../models/CreateOperation");
const NewEnrollStudent = require('../models/NewStudentEnroll');
const { sendEmail } = require("../controllers/emailController");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const crypto = require('crypto'); 

//post to create a new operation account
router.post("/createoperation", async (req, res) => {
  const { fullname, email , password } = req.body;
  try {
    const newoperation = new CreateOperation({
      fullname: fullname,
      email: email,
      password: password
    });
    await newoperation.save()
    .then(() => {
      res.status(201).json(newoperation);
    })
    .catch((saveError) => {
      console.error("Error saving data:", saveError);
      res.status(400).json({ message: saveError.message });
    });
   
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET request to retrieve all operation accounts
router.get("/getoperation", async (req, res) => {
  const { operationId } = req.query;
  try {
    let operation;
    if (operationId) {
      // Fetch specific operation by userId
      operation = await CreateOperation.findById(operationId);
      if (!operation) {
        return res.status(404).json({ message: "Operation not found for the given userId" });
      }
    } else {
      // Fetch all operations if no userId is provided
      operation = await CreateOperation.find().sort({ _id: -1 });
    }
    res.status(200).json(operation);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching data", error: error.message });
  }
});

// put request to edit the opertions details
router.put("/updateoperation/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, email , password } = req.body;
    const updatedOperation = await CreateOperation.findByIdAndUpdate(
      id,
      { fullname, email , password},
      { new: true }
    );
    if (!updatedOperation) {
      return res.status(404).json({ error: "Operation not found" });
    }
    res.status(200).json(updatedOperation);
  } catch (error) {
    res.status(400).json({ error: "Error updating operation" });
  }
});

//delete request to delete the operation account
router.delete("/deleteoperation/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOperation = await CreateOperation.findByIdAndDelete(id);
    if (!deletedOperation) {
      return res.status(404).json({ error: "Operation not found" });
    }
    res.status(200).json({ message: "Operation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting operation" });
  }
});

router.post("/operationsendotp", async (req, res) => {
  const { email } = req.body;
  try {
    const operation = await CreateOperation.findOne({ email });
    if (!operation) {
      return res.status(404).json({ message: "Operation user not found" });
    }

    const otp = crypto.randomInt(100000, 1000000);

    // Email message
    const emailMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #F15B29; color: #fff; text-align: center; padding: 20px;">
          <h1>Krutanic Solutions</h1>
        </div>
        <div style="padding: 20px; text-align: center;">
          <p style="font-size: 16px; color: #333;">Welcome back! Operation Agent,</p>
          <p style="font-size: 14px; color: #555;">Your One-Time Password (OTP) for verification is:</p>
          <p style="font-size: 24px; font-weight: bold; color: #4a90e2; margin: 10px 0;">${otp}</p>
          <p style="font-size: 14px; color: #555;">This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.</p>
        </div>
        <div style="text-align: center; font-size: 12px; color: #888; padding: 10px 0; border-top: 1px solid #ddd;">
          <p>If you didn’t request this OTP, please ignore this email or contact our support team.</p>
          <p>&copy; 2024 Krutanic Solution. All Rights Reserved.</p>
        </div>
      </div>
    `;

    // Save OTP in database and send email simultaneously
    operation.otp = otp;
    await Promise.all([
      operation.save(),
      sendEmail({ email, subject: "Operation Login Credentials", message: emailMessage }),
    ]);

    res.status(200).json({ message: "OTP sent to your email!" });
  } catch (error) {
    console.error("Failed to send OTP:", error);
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
});

// Verify OTP and Login
router.post("/operationverifyotp", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const operation = await CreateOperation.findOne({ email });
    if (!operation) {
      return res.status(404).json({ message: "Operation user not found" });
    }
    if (operation.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    operation.otp = null;
    await operation.save();
    const token = jwt.sign(
      { _id: operation._id, email: operation.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token,
      _id: operation._id,
      operationName: operation.fullname,
      message: "Login successful!",
    });
  } catch (error) {
    console.error("Failed to verify OTP:", error);
    res
      .status(500)
      .json({ message: "OTP verification failed", error: error.message });
  }
});

router.get("/OperationDashboard", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Welcome to the dashboard!" });
});

//send course details and login details to user
router.post('/send-email', async (req, res) => {
  const { fullname, email, program, counselor, domain , clearPaymentMonth , monthOpted } = req.body;
  const defaultPassword = 'Krutanic@123';
  const emailMessage = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #F15B29; color: #fff; text-align: center; padding: 20px;">
        <h1>Welcome to Krutanic Solutions!</h1>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 16px; text-transform: capitalize; color: #333;">Dear ${fullname},</p>
        <p style="font-size: 14px; color: #555;">Thank you for joining us! Here are your details:</p>
        <ul style="font-size: 14px; color: #555; line-height: 1.5;">
          <li style="text-transform: capitalize;"><strong>Mode of Program:</strong> ${program}</li>
          <li style="text-transform: capitalize;"><strong>You have opted a:</strong> ${monthOpted} month</li>
          <li style="text-transform: capitalize;"><strong>You Have Opted for a Domain: </strong> ${domain}</li>
          <li style="text-transform: capitalize;"><strong>Clear Due Payment Date:</strong> ${clearPaymentMonth}</ </li>
          <li style="text-transform: capitalize;"><strong>Any Doubts? Talk to Your Counselor:</strong> ${counselor}</li>
        </ul>
        <p style="font-size: 14px; color: #555;">Here are your login details:</p>
        <p style="font-size: 14px; color: #333;">Use your email (<strong>${email}</strong>) and the default password provided below to log in:</p>
        <p style="text-align: center; font-size: 18px; font-weight: bold; color: #4a90e2;">${defaultPassword}</p>
        <p style="font-size: 14px; color: #555;">
          <a href="https://www.krutanic.com/login" target="_blank" style="color: #F15B29; text-decoration: none;">Click here to log in</a>. 
          After logging in, please set a new password according to your preferences or official requirements.
        </p>
        <p>Note: Once you clear due amount then you'll get the access to your enrolled course.</p>
        <p style="font-size: 14px; color: #555;">If you need further assistance, feel free to reach out.</p>
        <p style="font-size: 14px; color: #333;">Best regards,</p>
        <p style="font-size: 14px; color: #333;">Team Krutanic</p>
      </div>
      <div style="text-align: center; font-size: 12px; color: #888; padding: 10px 0; border-top: 1px solid #ddd;">
        <p>&copy; 2024 Krutanic. All Rights Reserved.</p>
      </div>
    </div>
  `;
  try {
    await sendEmail({
      email,
      subject: `Welcome to Our ${program} Program`,
      message: emailMessage,
    });
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email.', error: error.message });
  }
});

//store a value after send a login details 
router.put('/mailsendedchange/:id', async (req, res) => {
  const { id } = req.params;
  const { mailSended } = req.body;
  const objectId = new mongoose.Types.ObjectId(id);
  try {
    const student = await NewEnrollStudent.findById({ _id: objectId});
    if (!student) {
      return res.status(404).send({ message: 'Student not found.' });
    }
    student.mailSended = mailSended;
    await student.save();
    res.status(200).send({ message: 'Student record updated successfully!', student });
  } catch (error) {
    console.error('Error updating student record:', error);
    res.status(500).send({ message: 'Failed to update student record.' });
  }
});

// if in case operation login with email and password 
router.post("/checkoperation", async (req, res) => {
  const { email, password } = req.body;
  try {
    const operation = await CreateOperation.findOne({ email });
    if (!operation) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (password !== operation.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: operation._id, email: operation.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token, _id: operation._id, operationName: operation.fullname });
  } catch (err) {
    console.error("Error during login", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;

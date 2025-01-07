const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/UserAuth");
const { sendEmail } = require("../controllers/emailController");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Manager = require("../models/Manager");
const crypto = require('crypto'); 


//post to create a new manager account
router.post("/createmanager", async (req, res) => {
    const { email, fullname , password } = req.body;
    try {
      const newmanager = new Manager({
        email: email,
        fullname: fullname,
        password: password
      });
      await newmanager.save()
      .then(() => {
        res.status(201).json(newmanager);
      })
      .catch((saveError) => {
        console.error("Error saving data:", saveError);
        res.status(400).json({ message: saveError.message });
      });
     
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// GET request to retrieve all manager accounts
router.get("/getmanager", async (req, res) => {
  const { managerId } = req.query;
  try {
    let manager;
    if (managerId) {
      // Fetch specific manager by userId
      manager = await Manager.findById(managerId);
      if (!manager) {
        return res.status(404).json({ message: "manager not found for the given userId" });
      }
    } else {
      // Fetch all managers if no userId is provided
      manager = await Manager.find().sort({ _id: -1 });
    }
    res.status(200).json(manager);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching data", error: error.message });
  }
});

  // put request to edit the opertions details
router.put("/updatemanager/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, email , password } = req.body;
    const updatedmanager = await Manager.findByIdAndUpdate(
      id,
      { fullname, email , password},
      { new: true }
    );
    if (!updatedmanager) {
      return res.status(404).json({ error: "manager not found" });
    }
    res.status(200).json(updatedmanager);
  } catch (error) {
    res.status(400).json({ error: "Error updating manager" });
  }
});

//delete request to delete the manager account
router.delete("/deletemanager/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedmanager = await Manager.findByIdAndDelete(id);
    if (!deletedmanager) {
      return res.status(404).json({ error: "manager not found" });
    }
    res.status(200).json({ message: "manager deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting manager" });
  }
});

// api to verfiy the login credentials and send otp
//  const generateOTP = () =>
//     Math.floor(100000 + Math.random() * 900000).toString();
  
  // Send OTP to manager Email
router.post("/managersendotp", async (req, res) => {
    const { email } = req.body;
    try {
      const manager = await Manager.findOne({ email });
      if (!manager) {
        return res.status(404).json({ message: "manager user not found" });
      }
      const otp = crypto.randomInt(100000, 1000000);

      await sendEmail({
        body: {
          email,
          subject: "Your OTP for Secure Login",
          message: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #2c3e50;">🔐 Welcome back, manager!</h2>
            <p>Your <strong>One-Time Password (OTP)</strong> for secure login is:</p>
            <h1 style="background: #f4f4f4; color: #2c3e50; padding: 10px; text-align: center; border-radius: 5px;">
              ${otp}
            </h1>
            <p>Stay secure, stay productive!</p>
            <p><strong>Best regards,</strong><br />
            <strong>The IT Team</strong><br />
            <strong>Krutanic Solution</strong></p>
            <hr />
          </div> 
        `,
        },
      });

      manager.otp = otp;
      await manager.save();
      
  
      res.status(200).json({ message: "OTP sent to your email!" });
    } catch (error) {
      console.error("Failed to send OTP:", error);
      res
        .status(500)
        .json({ message: "Failed to send OTP", error: error.message });
    }
  });
  
  // Verify OTP and Login
router.post("/managerverifyotp", async (req, res) => {
    const { email, otp } = req.body;
    try {
      const manager = await Manager.findOne({ email });
      if (!manager) {
        return res.status(404).json({ message: "manager user not found" });
      }
      if (manager.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
      manager.otp = null;
      await manager.save();
      const token = jwt.sign(
        { _id: manager._id, email: manager.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token,
        _id: manager._id,
        email: manager.email,
        message: "Login successful!",
      });
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      res
        .status(500)
        .json({ message: "OTP verification failed", error: error.message });
    }
  });
  
router.get("/managerDashboard", authMiddleware, (req, res) => {
    res.status(200).json({ message: "Welcome to the dashboard!" });
  });


  router.post("/checkmanager", async (req, res) => {
    const { email, password } = req.body;
    try {
      // Find the manager by email
      const manager = await Manager.findOne({ email });
      if (!manager) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      if (password !== manager.password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      const token = jwt.sign(
        { id: manager._id, email: manager.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token, _id: manager._id, email: manager.email });
    } catch (err) {
      console.error("Error during login", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  

  module.exports = router;
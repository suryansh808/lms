const express = require("express");
const router = express.Router();
const adminMail = require("../models/AdminMail");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { sendEmail } = require("../controllers/emailController");

router.post("/admin", async (req, res) => {
  const { email} = req.body;
  try {
    const newAdmin = new adminMail({ email });
    await newAdmin.save();
    res.status(200).json({ message: "Admin email saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save admin email" });
  }
});

//  mail id verfication

// after verification if the admin mail is matched from database the otp is sent directly to the matched mail or not
router.post("/otp-send", expressAsyncHandler (async (req, res) => {
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
      admin.otp = otp;
      await admin.save();

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



// Route to verify OTP admin
router.post("/otp-verify",async(req, res) => {
  const { email, otp } = req.body;
  try{
    const admin = await admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
      }
      if (admin.otp !==  parseInt(otp)) {
        return res.status(401).json({ error: "Invalid OTP" });
        }
        admin.otp = null;
        await admin.save();
        res.status(200).json({ message: "OTP verified successfully" });
        } 
        catch (error) {
          res.status(500).json({ message: "Failed to verify OTP", error: error.message})          
  }
});



module.exports = router;

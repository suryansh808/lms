const express = require("express");
const router = express.Router();
const adminMail = require("../models/AdminMail"); 
const Operation = require("../models/CreateOperation");
const bda = require("../models/CreateBDA");
const manager = require("../models/Manager");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { sendEmail } = require("../controllers/emailController");
const crypto = require('crypto'); 
const PlacementCoordinator = require("../models/placementcoordinator");
const { default: mongoose } = require("mongoose");
// Route to save admin email
router.post("/admin",expressAsyncHandler(async (req, res) => {
    const { email , password , otp } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    try {
      const newAdmin = new adminMail({ email , password , otp });
      await newAdmin.save();
      res.status(200).json({ message: "Admin email saved successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to save admin email", error: error.message });
    }
  })
);

// Route to send OTP
router.post("/otpsend",expressAsyncHandler(async (req, res) => {
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
        return res.status(401).json({ error: "You are not authorized as admin" });
      }

      const otp = crypto.randomInt(100000, 1000000);
 
         const EmailMessage = `
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
                <p>If you didn’t request this OTP, please ignore this email or contact our IT team.</p>
                <p>&copy; 2024 Krutanic Solution. All Rights Reserved.</p>
              </div>
            </div>
          `;
      admin.otp = otp;
        await Promise.all([
          admin.save(),
          sendEmail({ email , subject: "Krutanic Admin Login Credentials", message: EmailMessage}),
        ]);
      res.status(200).json({ message: "OTP sent to your email!" });
    } catch (error) {
      res.status(500).json({ message: "Failed to send OTP", error: error.message });
    }
  })
);

// Route to verify OTP
router.post("/otpverify",expressAsyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }
    try {
      const admin = await adminMail.findOne({ email });
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      if (admin.otp !== otp) {
        return res.status(401).json({ error: "Invalid OTP" });
      }

      // Clear OTP after verification
      admin.otp = null;
      await admin.save();

      // Generate JWT
      const token = jwt.sign(
        { email: admin.email }, // Payload
        process.env.JWT_SECRET, // Secret key from .env
        { expiresIn: "1h" } // Token expiration time
      );

      res.status(200).json({ message: "OTP verified successfully", token });
    } catch (error) {
      res.status(500).json({ message: "Failed to verify OTP", error: error.message });
    }
  })
);

//if in case login with password so cheack email and password 
router.post("/checkadmin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminMail.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (password !== admin.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token, _id: admin._id, email: admin.email });
  } catch (err) {
    console.error("Error during login", err);
    res.status(500).json({ message: "Server error" });
  }
});

//-------------------------operation
//send login details to operation team
router.post('/sendmailtooperation', async (req, res) => {
  const { fullname, email } = req.body;
  const emailMessage = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #F15B29; color: #fff; text-align: center; padding: 20px;">
        <h1>Welcome to Krutanic Solutions!</h1>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 16px; text-transform: capitalize; color: #333;">Dear ${fullname},</p>
        <p style="font-size: 14px; color: #555;">Welcome to the Operations Team at Krutanic Solutions!</p>
        <p style="font-size: 14px; color: #555;">Here are your login details:</p>
        <p style="font-size: 14px; color: #333;"> Use your official company email (<strong>${email}</strong>) along with the OTP provided to log in.</strong>)</p>
        <p style="font-size: 14px; color: #555;">
          <a href="https://www.krutanic.com/operationLogin" target="_blank" style="color: #F15B29; text-decoration: none;">Click here to log in</a>. 
        </p>
        <p style="font-size: 14px; color: #555;">If you need further assistance, feel free to reach out to the IT team.</p>
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
      subject: 'Welcome to Krutanic Solutions - Operations Team Login',
      message: emailMessage,
    });
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email.', error: error.message });
  }
});

// store a value after sending a login details to operation team
router.put('/mailsendedoperation/:id', async (req, res) => {
  const { id } = req.params;
  const { mailSended } = req.body;
  const objectId = new mongoose.Types.ObjectId(id);
  try {
    const opData = await Operation.findById({ _id: objectId});
    if (!opData) {
      return res.status(404).send({ message: 'Operation not found.' });
    }
    opData.mailSended = mailSended;
    await opData.save();
    res.status(200).send({ message: 'Operaton record updated successfully!', opData });
  } catch (error) {
    console.error('Error updating operation data record:', error);
    res.status(500).send({ message: 'Failed to update updating operation record.' });
  }
});
// -------------------------bda
//send login details to sales team
router.post('/sendmailtobda', async (req, res) => {
  const { fullname, email } = req.body;
  const emailMessage = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #F15B29; color: #fff; text-align: center; padding: 20px;">
        <h1>Welcome to Krutanic Solutions!</h1>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 16px; text-transform: capitalize; color: #333;">Dear ${fullname},</p>
        <p style="font-size: 14px; color: #555;">Welcome to the Sales Team at Krutanic Solutions!</p>
        <p style="font-size: 14px; color: #555;">Here are your login details:</p>
        <p style="font-size: 14px; color: #333;"> Use your official company email (<strong>${email}</strong>) along with the OTP provided to log in.</strong>)</p>
        <p style="font-size: 14px; color: #555;">
          <a href="https://www.krutanic.com/bdalogin" target="_blank" style="color: #F15B29; text-decoration: none;">Click here to log in</a>. 
        </p>
        <p style="font-size: 14px; color: #555;">If you need further assistance, feel free to reach out to the IT team.</p>
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
      subject: 'Welcome to Krutanic Solutions - Sales Team Login',
      message: emailMessage,
    });
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email.', error: error.message });
  }
});

// store a value after sending a login details to sales team 
router.put('/mailsendedbda/:id', async (req, res) => {
  const { id } = req.params;
  const { mailSended } = req.body;
  const objectId = new mongoose.Types.ObjectId(id);
  try {
    const bdaData = await bda.findById({ _id: objectId});
    if (!bdaData) {
      return res.status(404).send({ message: 'Bda not found.' });
    }
    bdaData.mailSended = mailSended;
    await bdaData.save();
    res.status(200).send({ message: 'Bda record updated successfully!', bdaData });
  } catch (error) {
    console.error('Error updating  Bda data record:', error);
    res.status(500).send({ message: 'Failed to update updating  Bda record.' });
  }
});

//----------------------------- manager
//send login details to sales team
router.post('/sendmailtomanager', async (req, res) => {
  const { fullname, email } = req.body;
  const emailMessage = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
  <div style="background-color: #F15B29; color: #fff; text-align: center; padding: 20px;">
    <h1>Welcome to Krutanic Solutions!</h1>
  </div>
  <div style="padding: 20px;">
    <p style="font-size: 16px; text-transform: capitalize; color: #333;">Dear ${fullname},</p>
    <p style="font-size: 14px; color: #555;">We are excited to have you on board as a Manager at Krutanic Solutions!</p>
    <p style="font-size: 14px; color: #555;">Here are your login details:</p>
    <p style="font-size: 14px; color: #333;">
      Use your official company email (<strong>${email}</strong>) along with the OTP provided to log in.
    </p>
    <p style="font-size: 14px; color: #555;">
      <a href="https://www.krutanic.com/managerlogin" target="_blank" style="color: #F15B29; text-decoration: none;">Click here to log in</a>.
    </p>
    <p style="font-size: 14px; color: #555;">For any assistance or technical support, feel free to reach out to the IT team.</p>
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
      subject: 'Welcome to Krutanic Solutions - Manager Login',
      message: emailMessage,
    });
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email.', error: error.message });
  }
});

// store a value after sending a login details to sales team 
router.put('/mailsendedmanager/:id', async (req, res) => {
  const { id } = req.params;
  const { mailSended } = req.body;
  const objectId = new mongoose.Types.ObjectId(id);
  try {
    const managerData = await manager.findById({ _id: objectId});
    if (!managerData) {
      return res.status(404).send({ message: 'Manager not found.' });
    }
    managerData.mailSended = mailSended;
    await managerData.save();
    res.status(200).send({ message: 'manager record updated successfully!', managerData });
  } catch (error) {
    console.error('Error updating  manager data record:', error);
    res.status(500).send({ message: 'Failed to update updating  manager record.' });
  }
});

router.post("/sendmailtoplacementcoordinator", async (req, res) => {
  const { fullname, email } = req.body;
  const emailMessage = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #F15B29; color: #fff; text-align: center; padding: 20px;">
        <h1>Welcome to Krutanic Solutions!</h1>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 16px; text-transform: capitalize; color: #333;">Dear ${fullname},</p>
        <p style="font-size: 14px; color: #555;">Welcome to the Placement Team at Krutanic Solutions!</p>
        <p style="font-size: 14px; color: #555;">Here are your login details:</p>
        <p style="font-size: 14px; color: #333;"> Use your official company email (<strong>${email}</strong>) along with the OTP provided to log in.</p>
        <p style="font-size: 14px; color: #555;">
          <a href="https://www.krutanic.com/placementcoordinatorlogin" target="_blank" style="color: #F15B29; text-decoration: none;">Click here to log in</a>. 
        </p>
        <p style="font-size: 14px; color: #555;">If you need further assistance, feel free to reach out to the IT team.</p>
        <p style="font-size: 14px; color: #333;">Best regards,</p>
        <p style="font-size: 14px; color: #333;">Team Krutanic</p>
      </div>
      <div style="text-align: center; font-size: 12px; color: #888; padding: 10px 0; border-top: 1px solid #ddd;">
        <p>&copy; 2024 Krutanic. All Rights Reserved.</p>
      </div>
    </div>
  `;

  try {
    // Send email to the Placement Coordinator
    await sendEmail({
      email,
      subject: "Welcome to Krutanic Solutions - Placement Team Login",
      message: emailMessage,
    });

    // Mark email as sent (mailSended)
    const coordinator = await PlacementCoordinator.findOne({ email });
    if (coordinator) {
      coordinator.mailSended = true;
      await coordinator.save();
    }

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Error sending email.", error: error.message });
  }
});

// PUT request to update the "mailSended" field for Placement Coordinator after sending email
router.put("/mailsendedplacementcoordinator/:id", async (req, res) => {
  const { id } = req.params;
  const { mailSended } = req.body;
  try {
    const coordinator = await PlacementCoordinator.findById(id);
    if (!coordinator) {
      return res.status(404).send({ message: "Coordinator not found." });
    }

    coordinator.mailSended = mailSended;
    await coordinator.save();
    res
      .status(200)
      .send({
        message: "Coordinator record updated successfully!",
        coordinator,
      });
  } catch (error) {
    console.error("Error updating coordinator record:", error);
    res.status(500).send({ message: "Failed to update coordinator record." });
  }
});



module.exports = router;

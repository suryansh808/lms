const express = require("express");
const router = express.Router();
const adminMail = require("../models/AdminMail"); 
const Operation = require("../models/CreateOperation");
const bda = require("../models/CreateBDA");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { sendEmail } = require("../controllers/emailController");
const crypto = require('crypto'); 
// const PlacementCoordinator = require("../models/PlacementCoordinator");
const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const Alumni = require("../models/Alumni");
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

// router.get("/admindashboard", authMiddleware, (req, res) => {
//   res.status(200).json({ message: "Welcome to the admin dashboard!" });
// });

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
          <a href="https://www.krutanic.com/teamlogin" target="_blank" style="color: #F15B29; text-decoration: none;">Click here to log in</a>. 
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
          <a href="https://www.krutanic.com/pclogin" target="_blank" style="color: #F15B29; text-decoration: none;">Click here to log in</a>. 
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
// router.put("/mailsendedplacementcoordinator/:id", async (req, res) => {
//   const { id } = req.params;
//   const { mailSended } = req.body;
//   try {
//     const coordinator = await PlacementCoordinator.findById(id);
//     if (!coordinator) {
//       return res.status(404).send({ message: "Coordinator not found." });
//     }

//     coordinator.mailSended = mailSended;
//     await coordinator.save();
//     res
//       .status(200)
//       .send({
//         message: "Coordinator record updated successfully!",
//         coordinator,
//       });
//   } catch (error) {
//     console.error("Error updating coordinator record:", error);
//     res.status(500).send({ message: "Failed to update coordinator record." });
//   }
// });

// user component access 
router.get('/user-components', async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const user = await User.findById(userId).select(
      'atschecker jobboard myjob mockinterview exercise'
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      components: {
        atschecker: user.atschecker,
        jobboard: user.jobboard,
        myjob: user.myjob,
        mockinterview: user.mockinterview,
        exercise: user.exercise
      }
    });
  } catch (error) {
    console.error('Error fetching user components:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// PUT: Update user component status (enable/disable)
router.put('/user-components/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { component, status } = req.body; 

    if (!userId || !component || typeof status !== 'boolean') {
      return res.status(400).json({ message: 'User ID, component, and status are required' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Update the specified component status
    if (component in user) {
      user[component] = status;
      await user.save();
      res.json({ message: `Component ${component} updated to ${status}` });
    } else {
      res.status(400).json({ message: 'Invalid component name' });
    }
  } catch (error) {
    console.error('Error updating user component:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// NEW GET: Fetch components for all active users
router.get('/all-user-components', async (req, res) => {
  try {
    const users = await User.find({ status: 'active' }).select(
      '_id atschecker jobboard myjob mockinterview exercise'
    );
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No active users found' });
    }

    const componentsData = users.map((user) => ({
      userId: user._id,
      components: {
        atschecker: user.atschecker,
        jobboard: user.jobboard,
        myjob: user.myjob,
        mockinterview: user.mockinterview,
        exercise: user.exercise,
      },
    }));

    res.json(componentsData);
  } catch (error) {
    console.error('Error fetching all user components:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// NEW POST: Fetch components for a batch of users
router.post('/batch-user-components', async (req, res) => {
  try {
    const { userIds } = req.body;

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ message: 'Array of user IDs is required' });
    }

    const users = await User.find({
      _id: { $in: userIds },
      status: 'active',
    }).select(' _id atschecker jobboard myjob mockinterview exercise');

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No active users found for provided IDs' });
    }

    const componentsData = users.map((user) => ({
      userId: user._id,
      components: {
        atschecker: user.atschecker,
        jobboard: user.jobboard,
        myjob: user.myjob,
        mockinterview: user.mockinterview,
        exercise: user.exercise,
      },
    }));

    res.json(componentsData);
  } catch (error) {
    console.error('Error fetching batch user components:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// alumni data and retreive route 


router.post("/alumni-data", async (req, res) => {
  try {
    const alumni = new Alumni(req.body);
    await alumni.save();
    res.status(201).json({
      success: true,
      message: "Alumni data submitted successfully",
      data: alumni,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit alumni data",
    });
  }
});

router.get("/alumni-data", async (req, res) => {
  try {
    const alumni = await Alumni.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: alumni,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve alumni data",
    });
  }
});






module.exports = router;

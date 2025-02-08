const express = require("express");
const router = express.Router();
const { sendEmail } = require("../controllers/emailController");
const jwt = require("jsonwebtoken");
const CreateBDA = require("../models/CreateBDA");
const TransactionId = require("../models/AddTransactionId");
const crypto = require('crypto'); 

//post to create a new bda account
router.post("/createbda", async (req, res) => {
  const { fullname, email , password, team } = req.body;
  try {
    const newbda = new CreateBDA({
      fullname,
      email,
      password,
      team,
    });
    await newbda.save();
    res.status(201).json(newbda);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET request to retrieve all bda accounts
router.get("/getbda", async (req, res) => {
  const {bdaId} = req.query;
  try {
    let bdaId;
    if(bdaId){
       bda = await CreateBDA.findById(bdaId);
       if (!bda) {
        return res.status(404).json({ message: "Bda not found for the given bdaId" });
      }
    }else{
       bda = await CreateBDA.find().sort({ _id: -1 });
    }
   
    res.status(200).json(bda);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// put request to edit the bda details
router.put("/updatebda/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, email, password , team } = req.body;
    const updatedbda = await CreateBDA.findByIdAndUpdate(
      id,
      { fullname, email, password , team },
      { new: true }
    );
    if (!updatedbda) {
      return res.status(404).json({ error: "bda not found" });
    }
    res.status(200).json(updatedbda);
  } catch (error) {
    res.status(400).json({ error: "Error updating bda" });
  }
});

//delete request to delete the bda account
router.delete("/deletebda/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedbda = await CreateBDA.findByIdAndDelete(id);
    if (!deletedbda) {
      return res.status(404).json({ error: "bda not found" });
    }
    res.status(200).json({ message: "bda deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting bda" });
  }
});


//Send OTP to BDA Email
router.post("/bdasendotp", async (req, res) => {
  const { email } = req.body;
  try {
    const bda = await CreateBDA.findOne({ email });
    if (!bda) {
      return res.status(404).json({ message: "BDA not found" });
    }
    const otp = crypto.randomInt(100000, 1000000);

      // Send OTP via Email
  
         const emailMessage = `
           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #F15B29; color: #fff; text-align: center; padding: 20px;">
              <h1>Krutanic Solutions</h1>
          </div>
          <div style="padding: 20px; text-align: center;">
              <p style="font-size: 16px; color: #333;">Welcome back! Agent,</p>
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
     

    bda.otp = otp; 
    await Promise.all([
        bda.save(),
        sendEmail({ email , subject : "Bda Login Credentials" ,  message: emailMessage }),
    ]);
    res.status(200).json({ message: "OTP sent to your email!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send OTP", error: error.message });
  }
});

// Verify OTP and Login
router.post("/bdaverifyotp", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const bda = await CreateBDA.findOne({ email });
    if (!bda) {
      return res.status(404).json({ message: "BDA not found" });
    }
    if (bda.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    // Clear OTP after successful login
    bda.otp = null;
    await bda.save();

    const token = jwt.sign(
      { id: bda._id, email: bda.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token,
      bdaId: bda._id,
      bdaName: bda.fullname,
      message: "Login successful!",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "OTP verification failed", error: error.message });
  }
});

router.post("/checkbdaauth", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the bda by email
    const bda = await CreateBDA.findOne({ email });
    if (!bda) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (password !== bda.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: bda._id, email: bda.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token, bdaId: bda._id, bdaName: bda.fullname });
  } catch (err) {
    console.error("Error during login", err);
    res.status(500).json({ message: "Server error" });
  }
});

//post request to add transaction id
router.post("/addtransactionid", async (req, res) => {
  const {transactionId , fullname , counselor} = req.body;
  try {
    const AddTransactionId = new TransactionId({
      transactionId,
      fullname,
      counselor
    });
    await AddTransactionId.save();
    res.status(201).json(AddTransactionId);
    console.log("xyz", AddTransactionId);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// GET request to retrieve all transaction ids
router.get("/gettransactionid", async (req, res) => {
  try {
    const transactionId = await TransactionId.find().sort({ _id: -1 });
    res.status(200).json(transactionId);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
}
);

// GET request to retrieve all transaction ids with name 
router.get("/gettransactionwithname", async (req, res) => {
  try {
   const transactions = await TransactionId.find();
   const transactionList = transactions.map(item => item.transactionId);
   const counselorList = transactions.map(item => item.counselor);
   
   res.status(200).json({
     transaction: transactionList,
     counselor: counselorList
   });
 }
 catch (error) {
   res.status(400).json({ message: error.message });
  }
}
);




module.exports = router;
const expressAsyncHandler = require("express-async-handler");
require("dotenv").config();
const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, 
  },
  pool: true, 
});


const sendEmail  = expressAsyncHandler(async (req, res) => {
  const { email, subject, message } = req.body;

  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: subject,
    html: message,
    priority: "high",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully!");
    }
  });
});

module.exports = { sendEmail};
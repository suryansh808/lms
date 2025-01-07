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


const sendEmail = async ({ email, subject, message }) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: subject,
      html: message,
      priority: "high",
    };

    const info = await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
    console.log("Email sent successfully:", info.response);
    return { success: true, response: info.response };
  } catch (error) {
    console.error("Error sending email:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
    });
    return { success: false, error: error.message };
  }
};



module.exports = { sendEmail};
const expressAsyncHandler = require("express-async-handler");
require("dotenv").config();
const nodemailer = require("nodemailer");
// dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL, // generated ethereal user
    pass: process.env.SMTP_PASSWORD, // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false, // Avoid certificate issues (use cautiously)
  },
  pool: true, 
});
/**
 * @param {Object} mailOptions
  * @param {string}
  * * @param {string} 
  *  * @param {string}
 * @returns {Promise<void>}
 */
const sendEmail = async (mailOptions) => {
 for (let attempt = 1; attempt <= 3; attempt++) {
   try {
     await transporter.sendMail(mailOptions);
     console.log("Email sent successfully!");
     return; // Exit loop on success
   } catch (error) {
     console.error(`Attempt ${attempt} failed: ${error.message}`);
     if (attempt === 3) {
       throw new Error("Failed to send email after 3 attempts");
     }
   }
 }
};

const sendEmailController  = expressAsyncHandler(async (req, res) => {
  const { email, subject, message } = req.body;

  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully!");
    }
  });
});

module.exports = { sendEmail ,sendEmailController };
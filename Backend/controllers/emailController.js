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
    rejectUnauthorized: false, 
  },
  pool: true, 
  maxConnections: 5, // Limit the number of connections
  maxMessages: 100, // Limit the number of messages sent per connection
  rateLimit: 5, // Limit messages per second
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

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[${new Date().toISOString()}] Email sent: ${info.response}`);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error sending email: ${error}`);
    res.status(500).json({ message: "Failed to send email", error });
  }
});

module.exports = { sendEmail};
require("dotenv").config();
const nodemailer = require("nodemailer");
const path = require('path');

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

// const sendEmail = async ({ email, subject, message , attachment }) => {
//   const mailOptions = {
//     from: process.env.SMTP_MAIL,
//     to: email,
//     bcc: process.env.SMTP_ADMIN_MAIL,
//     subject: subject,
//     html: message,
//     priority: "high",
//      attachments: [],
//   };
  
//   if (attachment) {
//     mailOptions.attachments.push({
//       filename: path.basename(attachment), 
//       path: attachment, 
//       contentType: 'application/pdf',
//     });
//   }

//   return new Promise((resolve, reject) => {
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error("Error sending email:", error);
//         reject(error); 
//       } else {
//         console.log("Email sent successfully!", info.response);
//         resolve(info.response); 
//       }
//     });
//   });
// };

const sendBaseEmail = async (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        reject(error);
      } else {
        console.log("Email sent successfully!", info.response);
        resolve(info.response);
      }
    });
  });
};

const sendEmail = async ({ email, subject, message }) => {
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    bcc: process.env.SMTP_ADMIN_MAIL,
    subject: subject,
    html: message,
    priority: "high",
  };
  return sendBaseEmail(mailOptions);
};

const sendEmailWithAttachment = async ({ email, subject, message, attachment }) => {
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    bcc: process.env.SMTP_ADMIN_MAIL,
    subject: subject,
    html: message,
    priority: "high",
    attachments: [
      {
        filename: path.basename(attachment),
        path: attachment,
        contentType: 'application/pdf',
      },
    ],
  };
  return sendBaseEmail(mailOptions);
};


module.exports = { sendEmail , sendEmailWithAttachment};
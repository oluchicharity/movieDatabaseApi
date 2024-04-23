require("dotenv").config();
const nodemailer = require("nodemailer");

const Email = async (options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.service, 
    auth: {
      user: process.env.user,
      pass: process.env.mailPassword
    },
  });

  const mailOption = {
    from: process.env.user,
    to: options.email,
    subject: options.subject,
    html: options.html
  };

  try {
    await transporter.sendMail(mailOption);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = Email;


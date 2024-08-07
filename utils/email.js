require("dotenv").config();
const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Verify your email",
      html: `<p>Please click on the following link to verify your email:</p>
              <a href="http://localhost:5050/auth/verify/${token}">Verify Email</a>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error.message); // Log detailed error message
  }
};

const sendEmailNotification = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: subject,
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error.message); // Log detailed error message
  }
};
const sendPasswordResetEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Reset your password",
      html: `<p>You requested a password reset.Please click on the following link to reset your password:</p>
                <a href="http://localhost:5050/auth/forgot-password/${token}">Reset Password</a>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error.message); // Log detailed error message
  }
};

module.exports = {
  sendVerificationEmail,
  sendEmailNotification,
  sendPasswordResetEmail,
};

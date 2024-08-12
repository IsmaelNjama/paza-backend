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
              <a href="http://localhost:5050/auth/verify/${token}">Verify Email</a>
              <p>Best regards,<br>Paza Platform</p>`,
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
const sendPasswordResetEmail = async (email, resetToken) => {
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
                <a href="http://localhost:5050/auth/reset-password/${resetToken}">Reset Password</a>
                <p>Please note that this link will expire in 1 day for your security. If you need more time, don't worry—just request a new link.</p>
                <p>Best regards,<br>Paza Platform</p>`,
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

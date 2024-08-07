const { sendEmailNotification } = require("../utils/email");

module.exports = {
  sendNotification: async (req, res, next) => {
    try {
      const { email, subject, text } = req.body;
      await sendEmailNotification(email, subject, text);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      next(error);
    }
  },
};

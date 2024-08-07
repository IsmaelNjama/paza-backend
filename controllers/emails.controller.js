const { sendEmailNotification } = require("../utils/email");

module.exports = {
  sendNotification: async (req, res, next) => {
    try {
      const { to, subject, text } = req.body;
      await sendEmailNotification(to, subject, text);

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      next(error);
    }
  },
};

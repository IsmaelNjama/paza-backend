const messagesServices = require("../services/messages.service");

module.exports = {
  createMessage: async (req, res, next) => {
    try {
      const { recipient, text } = req.body;

      const sender = req.user._id;

      if (!recipient || !text) {
        return res.status(400).send("Recipient and text are required");
      }

      const messageId = await messagesServices.createMessage({
        sender,
        recipient,
        text,
      });
      res.status(201).send("Message created successfully");
    } catch (error) {
      next(error);
    }
  },

  getMessages: async (req, res, next) => {
    try {
      const conversationId = req.params.id;
      const messages = await messagesServices.getMessages(conversationId);
      res.status(200).send(messages);
    } catch (error) {
      next(error);
    }
  },
};

const messagesServices = require("../services/messages.service");

module.exports = {
  async createMessage(req, res, next) {
    try {
      const { body } = req;
      const response = await messagesServices.createMessage(body);
      res.status(201).json(response);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async getMessages(req, res, next) {
    try {
      const response = await messagesServices.getMessages();
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};

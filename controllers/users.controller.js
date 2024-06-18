const services = require("../services/users.service");

module.exports = {
  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await services.getUserById(id);
      res.send(user);
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await services.updateUser(id, req.body);
      res.send(user);
    } catch (error) {
      next(error);
    }
  },
};

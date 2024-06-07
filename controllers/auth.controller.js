const usersService = require("../services/users.service");

module.exports = {
  signupUser: async (req, res, next) => {
    try {
      const user = await usersService.addUser(req.body);
      res.status(201).send(user);
    } catch (error) {
      next(error);
    }
  },
};

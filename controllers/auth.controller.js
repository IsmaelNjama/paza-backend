const usersService = require("../services/users.service");
const { hashPassword } = require("../utils/argon2");

module.exports = {
  signupUser: async (req, res, next) => {
    const { password } = req.body;
    try {
      const user = await usersService.getUserByEmail(req.body.email);
      if (user) {
        return res.status(409).send("User already exists");
      }
      const hash = await hashPassword(password);

      const newUser = await usersService.addNormalUser(req.body, hash);
      res.status(201).send(newUser);
    } catch (error) {
      next(error);
    }
  },
};

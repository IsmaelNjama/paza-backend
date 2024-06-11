const usersService = require("../services/users.service");
const { hashPassword, verifyPassword } = require("../utils/argon2");
const {
  ERR_NOT_FOUND,
  ERR_REGISTER_ALREADY_EXIST,
  ERR_BAD_REQUEST,
} = require("../utils/error");
const jwt = require("../utils/jwt");

module.exports = {
  signupUser: async (req, res, next) => {
    const { password } = req.body;
    try {
      const userExist = await usersService.getUserByEmail(req.body.email);
      if (userExist) {
        return next(ERR_REGISTER_ALREADY_EXIST);
      }
      const hash = await hashPassword(password);

      const newUser = await usersService.addNormalUser(req.body, hash);
      res.status(201).send(newUser);
    } catch (error) {
      next(error);
    }
  },

  loginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await usersService.getUserByEmail(email);

      if (!user) {
        return next(ERR_NOT_FOUND);
      }

      await verifyPassword(password, user.password);

      usersService.clearUser(user);

      const payload = { id: user._id.toString() };
      const token = jwt.sign(payload);

      res.status(200).send({ token, user });
    } catch (error) {
      next(ERR_BAD_REQUEST);
    }
  },
};

const usersService = require("../services/users.service");
const { hashPassword, verifyPassword } = require("../utils/argon2");
const jwt = require("../utils/jwt");

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

  loginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await usersService.getUserByEmail(email);

      if (!user) {
        return res.status(404).send("User not found");
      }

      await verifyPassword(password, user.password);

      const payload = { id: user._id.toString() };
      const token = jwt.sign(payload);
      res.status(200).send({ token, user });
    } catch (error) {
      next(new Error("email or password mismatch"));
    }
  },
};

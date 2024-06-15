const usersService = require("../services/users.service");
const { hashPassword, verifyPassword } = require("../utils/argon2");
const sendVerificationEmail = require("../utils/email");
const {
  ERR_NOT_FOUND,
  ERR_REGISTER_ALREADY_EXIST,
  ERR_BAD_REQUEST,
  ERR_UNPROCESSABLE,
} = require("../utils/error");
const crypto = require("crypto");

module.exports = {
  signupUser: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const userExist = await usersService.getUserByEmail(req.body.email);
      if (userExist) {
        return next(ERR_REGISTER_ALREADY_EXIST);
      }
      const hash = await hashPassword(password);

      const token = crypto.randomBytes(64).toString("hex");
      await sendVerificationEmail(email, token);

      await usersService.addNormalUser(
        {
          ...req.body,
          isVerified: false,
          verificationToken: token,
        },
        hash
      );

      res.status(201).send("User created successfully");
    } catch (error) {
      next(error);
    }
  },

  verifyEmail: async (req, res, next) => {
    try {
      const { token } = req.params;

      console.log("token email", token);
      if (!token) {
        return next(ERR_UNPROCESSABLE);
      }
      const user = await usersService.getVerifiedUser(token);
      console.log("🚀 ~ verifyEmail: ~ user:", user._id);

      if (!user) {
        return next(ERR_NOT_FOUND);
      }

      res.status(200).send("User verified successfully");
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

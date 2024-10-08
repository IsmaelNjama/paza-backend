const usersService = require("../services/users.service");
const { hashPassword, verifyPassword } = require("../utils/argon2");
const {
  sendVerificationEmail,
  sendPasswordResetEmail,
} = require("../utils/email");
const {
  ERR_USER_NOT_FOUND,
  ERR_REGISTER_ALREADY_EXIST,
  ERR_BAD_REQUEST,
  ERR_UNPROCESSABLE,
  ERR_UNAUTHORIZED,
  ERR_PASSWORD_RESET_REQUIRED,
} = require("../utils/error");
const jwt = require("../utils/jwt");
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

      const user = await usersService.addNormalUser(
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

      if (!token) {
        return next(ERR_UNPROCESSABLE);
      }
      const user = await usersService.getVerifiedUser(token);

      if (!user) {
        return next(ERR_USER_NOT_FOUND);
      }
      await usersService.updateVerifiedUser(user._id);
      res
        .status(200)
        .send(
          "User verified successfully. You can close this window and proceed to login"
        );
    } catch (error) {
      next(error);
    }
  },

  loginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await usersService.getUserByEmail(email);

      if (!user) {
        return next(ERR_USER_NOT_FOUND);
      }
      const checkUserVerificationStatus = user.isVerified;
      if (!checkUserVerificationStatus) {
        return next(ERR_UNAUTHORIZED);
      }

      // Check if the user has attempted to reset their password
      if (user.passwordResetToken) {
        return next(ERR_PASSWORD_RESET_REQUIRED);
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
  forgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body;
      // Check if the email exists in users database
      const user = await usersService.getUserByEmail(email);
      if (!user) {
        return next(ERR_USER_NOT_FOUND);
      }
      const token = crypto.randomBytes(64).toString("hex");
      const payload = { token };

      const resetToken = jwt.sign(payload);

      const response = await usersService.updatePasswordResetToken(
        user._id,
        resetToken
      );
      if (response.acknowledged === true) {
        await sendPasswordResetEmail(email, resetToken);
      }

      res.status(200).send("Password reset email sent successfully");
    } catch (error) {
      next(error);
    }
  },

  getPasswordResetToken: async (req, res, next) => {
    try {
      const { resetToken } = req.params;
      if (!resetToken) {
        return next(ERR_UNPROCESSABLE);
      }

      jwt.verify(resetToken);

      const user = await usersService.getUserByPasswordResetToken(resetToken);
      if (!user) {
        return next(ERR_USER_NOT_FOUND);
      }
      res.redirect(
        `http://localhost:3000/resetpassword?resetToken=${resetToken}`
      );
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return next(ERR_PASSWORD_TOKEN_EXPIRED);
      }
      console.error(error);
      next(error);
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const { resetToken } = req.query;
      if (!resetToken) {
        return next(ERR_UNPROCESSABLE);
      }
      const { password } = req.body;
      const user = await usersService.getUserByPasswordResetToken(resetToken);

      if (!user) {
        return next(ERR_USER_NOT_FOUND);
      }
      const hash = await hashPassword(password);
      await usersService.updatePassword(user._id, hash);
      res.status(200).send("Password reset successfully");
    } catch (error) {
      next(error);
    }
  },
};

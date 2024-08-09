const { verify } = require("argon2");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_TOKEN;

module.exports = {
  sign: (payload) => {
    const accessToken = jwt.sign(payload, secretKey, { expiresIn: "10s" });
    return accessToken;
  },

  verify: (token) => {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  },
};

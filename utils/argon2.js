const argon2 = require("argon2");

module.exports = {
  hashPassword: (password) => {
    return new Promise((resolve, reject) => {
      try {
        const hash = argon2.hash(password);
        resolve(hash);
      } catch (err) {
        reject(err);
      }
    });
  },
  verifyPassword: (password, hash) => {
    return new Promise((resolve, reject) => {
      try {
        const passwordMatch = argon2.verify(hash, password);
        resolve(passwordMatch);
      } catch (err) {
        reject(err);
      }
    });
  },
};

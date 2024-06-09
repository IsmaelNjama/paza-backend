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
    return new Promise(async (resolve, reject) => {
      try {
        const isVerified = await argon2.verify(hash, password);
        if (isVerified) {
          resolve();
        } else {
          reject();
        }
      } catch (err) {
        reject(err);
      }
    });
  },
};

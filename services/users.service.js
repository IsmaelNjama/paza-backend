const { ObjectId } = require("mongodb");
const users = require("../utils/mongodb").users;

const services = {
  addUser: (body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await users().insertOne(body);
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  },
  addNormalUser: (body, hash) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await services.addUser({ ...body, password: hash });

        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  },

  clearUser: (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        delete user.password;
        resolve();
      } catch (error) {
        reject();
      }
    });
  },

  getUserByEmail: (email) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await users().findOne({ email });
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  },

  getUserByVerificationToken: async (token) => {
    try {
      const user = await users().findOne({ token });
      return user;
    } catch (error) {
      throw new Error("Error finding user by verification token");
    }
  },

  updateUser: (id, body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedUser = await users().updateOne(
          { _id: ObjectId(id) },
          { $set: body }
        );
        resolve(updatedUser);
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = services;

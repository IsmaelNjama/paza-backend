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

  updateUser: (id, body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedUser = await users().updateOne(
          { _id: ObjectId.createFromHexString(id) },
          { $set: body }
        );
        resolve(updatedUser);
      } catch (error) {
        reject(error);
      }
    });
  },

  getVerifiedUser: async (token) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await users().findOne({ verificationToken: token });
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = services;

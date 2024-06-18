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

  getUserById: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const objectId = ObjectId.createFromHexString(id);
        const user = await users().findOne({ _id: objectId });
        resolve(user);
      } catch (error) {
        reject(error);
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
        const objectId = ObjectId.createFromHexString(id);
        const updatedUser = await users().updateOne(
          { _id: objectId },
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

  updateVerifiedUser: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedUser = await users().updateOne(
          { _id: id },
          { $set: { isVerified: true }, $unset: { verificationToken: "" } }
        );
        resolve(updatedUser);
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = services;

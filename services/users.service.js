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
        const timestamp = new Date().toISOString();
        const user = await services.addUser({
          ...body,
          password: hash,
          createdAt: timestamp,
        });

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
        resolve(user);
      } catch (error) {
        reject(error);
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

  getUsers: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const usersList = await users().find().toArray();
        const clearedUsers = await Promise.all(
          usersList.map((user) => services.clearUser(user))
        );
        resolve(clearedUsers);
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
          {
            $set: { isVerified: true, account: {} },
            $unset: { verificationToken: "" },
          }
        );
        resolve(updatedUser);
      } catch (error) {
        reject(error);
      }
    });
  },
  getUserByAccountCode: async (code) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await users().findOne({ "account.code": code });
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  },
  updateUserAccountMembers: async (id, members) => {
    return new Promise(async (resolve, reject) => {
      try {
        const objectId = ObjectId.createFromHexString(id);
        const updatedUser = await users().updateOne(
          { _id: objectId },
          { $set: { "account.members": members } }
        );
        resolve(updatedUser);
      } catch (error) {
        reject(error);
      }
    });
  },
  getMembers: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const members = await users().find({ account: {} }).toArray();
        const clearedMembers = await Promise.all(
          members.map((member) => services.clearUser(member))
        );
        resolve(clearedMembers);
      } catch (error) {
        reject(error);
      }
    });
  },
  updatePasswordResetToken: async (id, resetToken) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedUser = await users().updateOne(
          { _id: id },
          { $set: { passwordResetToken: resetToken } }
        );
        resolve(updatedUser);
      } catch (error) {
        reject(error);
      }
    });
  },

  getUserByPasswordResetToken: async (resetToken) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await users().findOne({ passwordResetToken: resetToken });
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  },
  updatePassword: async (id, hash) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedUser = await users().updateOne(
          { _id: id },
          { $set: { password: hash }, $unset: { passwordResetToken: "" } }
        );
        resolve(updatedUser);
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = services;

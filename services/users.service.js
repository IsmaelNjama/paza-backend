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
};

module.exports = services;

const tasks = require("../utils/mongodb").tasks;

const services = {
  createTask: (body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const task = await tasks().insertOne(body);
        resolve(task);
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = services;

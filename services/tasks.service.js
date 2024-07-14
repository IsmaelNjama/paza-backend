const tasks = require("../utils/mongodb").tasks;

const services = {
  createTask: (body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const timestamp = new Date().toISOString();
        const task = await tasks().insertOne({ ...body, createdAt: timestamp });
        resolve(task);
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = services;

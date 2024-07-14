const tasks = require("../utils/mongodb").tasks;

const services = {
  getTasks: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const tasksList = await tasks().find({}).toArray();
        resolve(tasksList);
      } catch (error) {
        reject(error);
      }
    });
  },
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

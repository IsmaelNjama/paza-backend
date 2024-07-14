const { ObjectId } = require("mongodb");
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
  getTaskById: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const objectId = ObjectId.createFromHexString(id);
        const task = await tasks().findOne({ _id: objectId });
        resolve(task);
      } catch (error) {
        reject(error);
      }
    });
  },
  updateTask: (id, body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const objectId = ObjectId.createFromHexString(id);
        const updatedTask = await tasks().updateOne(
          { _id: objectId },
          { $set: body }
        );
        resolve(updatedTask);
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteTask: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const objectId = ObjectId.createFromHexString(id);
        const deletedTask = await tasks().deleteOne({ _id: objectId });
        resolve(deletedTask);
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = services;

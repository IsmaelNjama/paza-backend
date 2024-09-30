const { ObjectId } = require("mongodb");
const jobs = require("../utils/mongodb").jobs;

const services = {
  createJob: (body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const timestamp = new Date().toISOString();
        const job = await jobs().insertOne({
          ...body,
          createdAt: timestamp,
        });
        resolve(job);
      } catch (error) {
        reject(error);
      }
    });
  },
  getJobs: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const job = await jobs().find().toArray();
        resolve(job);
      } catch (error) {
        reject(error);
      }
    });
  },
  getJobById: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const objectId = ObjectId.createFromHexString(id);
        const job = await jobs().findOne({ _id: objectId });
        resolve(job);
      } catch (error) {
        reject(error);
      }
    });
  },
  updateJob: (id, body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const objectId = ObjectId.createFromHexString(id);
        const job = await jobs().updateOne({ _id: objectId }, { $set: body });
        resolve(job);
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteJob: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const objectId = ObjectId.createFromHexString(id);
        const job = await jobs().deleteOne({ _id: objectId });
        resolve(job);
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = services;

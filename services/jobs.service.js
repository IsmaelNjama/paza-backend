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
};

module.exports = services;

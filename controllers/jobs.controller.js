const jobsServices = require("../services/jobs.service");

module.exports = {
  createJob: async (req, res, next) => {
    try {
      const job = await jobsServices.createJob(req.body);
      res.status(201).send("Job created successfully");
    } catch (error) {
      next(error);
    }
  },
  getJobs: async (req, res, next) => {
    try {
      const jobs = await jobsServices.getJobs();
      res.status(200).send(jobs);
    } catch (error) {
      next(error);
    }
  },
  getJobById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const job = await jobsServices.getJobById(id);
      res.status(200).send(job);
    } catch (error) {
      next(error);
    }
  },
  updateJob: async (req, res, next) => {
    try {
      const id = req.params.id;
      const job = await jobsServices.updateJob(id, req.body);
      res.status(200).send("Job updated successfully");
    } catch (error) {
      next(error);
    }
  },
  deleteJob: async (req, res, next) => {
    try {
      const id = req.params.id;
      const job = await jobsServices.deleteJob(id);
      res.status(200).send("Job deletion successful");
    } catch (error) {
      next(error);
    }
  },
};

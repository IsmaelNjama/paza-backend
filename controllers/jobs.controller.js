const jobsServices = require("../services/jobs.service");

module.exports = {
  createJob: async (req, res, next) => {
    try {
      const job = await jobsServices.createJob(req.body);
      res.status(201).send("Job created successfully");
    } catch (error) {
      console.log("��� ~ addJob: ~ error:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};

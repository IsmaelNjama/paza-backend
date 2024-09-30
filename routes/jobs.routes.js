const express = require("express");

const router = express.Router();

const jobsController = require("../controllers/jobs.controller");

router.post("/create", jobsController.createJob);
router.get("/", jobsController.getJobs);
router.get("/:id", jobsController.getJobById);
router.put("/:id", jobsController.updateJob);
router.delete("/:id", jobsController.deleteJob);

module.exports = router;

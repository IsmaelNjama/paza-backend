const express = require("express");

const router = express.Router();

const jobsController = require("../controllers/jobs.controller");

router.post("/create", jobsController.createJob);

module.exports = router;

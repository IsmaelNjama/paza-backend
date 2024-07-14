const express = require("express");

const router = express.Router();
const tasksController = require("../controllers/tasks.controller");
const createTaskSchema = require("../schema/createTasks.schema");
const validate = require("../utils/schemaValidate");

router.post("/create", validate(createTaskSchema), tasksController.createTask);
router.get("/", tasksController.getTasks);

module.exports = router;

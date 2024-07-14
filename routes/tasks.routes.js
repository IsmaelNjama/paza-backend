const express = require("express");

const router = express.Router();
const tasksController = require("../controllers/tasks.controller");
const createTaskSchema = require("../schema/createTasks.schema");
const validate = require("../utils/schemaValidate");

router.post("/create", validate(createTaskSchema), tasksController.createTask);
router.get("/", tasksController.getTasks);
router.get("/:id", tasksController.getTaskById);
router.put("/:id", tasksController.updateTask);
router.delete("/:id", tasksController.deleteTask);

module.exports = router;

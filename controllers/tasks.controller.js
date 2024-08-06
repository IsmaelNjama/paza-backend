const tasksService = require("../services/tasks.service");
const { ERR_TASKS_NOT_FOUND } = require("../utils/error");

module.exports = {
  getTasks: async (req, res, next) => {
    try {
      const tasks = await tasksService.getTasks();

      if (!tasks || tasks.length === 0) {
        return next(ERR_TASKS_NOT_FOUND);
      }
      res.status(200).send(tasks);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  getTaskById: async (req, res, next) => {
    try {
      const task = await tasksService.getTaskById(req.params.id);

      if (!task) {
        return next(ERR_TASKS_NOT_FOUND);
      }
      res.status(200).send(task);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  createTask: async (req, res, next) => {
    try {
      const task = await tasksService.createTask(req.body);
      res.status(201).send(task);
    } catch (error) {
      next(error);
    }
  },

  updateTask: async (req, res, next) => {
    try {
      const task = await tasksService.updateTask(req.params.id, req.body);

      if (task.modifiedCount === 1) {
        res.status(200).send("Task updated successfully");
      }
    } catch (error) {
      next(error);
    }
  },

  deleteTask: async (req, res, next) => {
    try {
      const task = await tasksService.deleteTask(req.params.id);
      if (task.deletedCount === 1) {
        res.status(200).send("Task deleted successfully");
      }
    } catch (error) {
      next(error);
    }
  },
};

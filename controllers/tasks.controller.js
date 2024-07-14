const tasksService = require("../services/tasks.service");

module.exports = {
  getTasks: async (req, res, next) => {
    try {
      const tasks = await tasksService.getTasks();
      res.status(200).send(tasks);
    } catch (error) {
      next(error);
    }
  },

  // getTask: async (req, res) => {
  //   const task = await tasksService.getTask(req.params.id);
  //   res.json(task);
  // },

  createTask: async (req, res, next) => {
    try {
      const task = await tasksService.createTask(req.body);
      res.status(201).send(task);
    } catch (error) {
      next(error);
    }
  },

  // updateTask: async (req, res) => {
  //   const task = await tasksService.updateTask(req.params.id, req.body);
  //   res.json(task);
  // },

  // deleteTask: async (req, res) => {
  //   const task = await tasksService.deleteTask(req.params.id);
  //   res.json(task);
  // },
};

const express = require("express");
const usersController = require("../controllers/users.controller");

const router = express.Router();

router.get("/:id", usersController.getUserById);
router.put("/:id", usersController.updateUser);

module.exports = router;

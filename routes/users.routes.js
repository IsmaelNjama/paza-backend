const express = require("express");
const usersController = require("../controllers/users.controller");

const router = express.Router();

router.get("/members", usersController.getMembers);
router.get("/:id", usersController.getUserById);
router.put("/:id", usersController.updateUser);
router.post("/join", usersController.inviteUser);

module.exports = router;

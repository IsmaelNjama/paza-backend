const express = require("express");

const router = express.Router();

const messagesController = require("../controllers/messages.controller");

router.post("/create", messagesController.createMessage);
router.get("/conversations/:id", messagesController.getConversations);
router.get("/:id", messagesController.getMessages);

module.exports = router;

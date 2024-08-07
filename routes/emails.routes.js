const express = require("express");
const router = express.Router();
const emailsController = require("../controllers/emails.controller");

router.post("/send", emailsController.sendNotification);

module.exports = router;

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validate = require("../utils/schemaValidate");
const signupUserSchema = require("../schema/signupUsers.schema");

router.post("/signup", validate(signupUserSchema), authController.signupUser);

module.exports = router;

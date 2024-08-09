const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validate = require("../utils/schemaValidate");
const signupUserSchema = require("../schema/signupUsers.schema");

router.post("/login", authController.loginUser);
router.post("/signup", validate(signupUserSchema), authController.signupUser);
router.get("/verify/:token", authController.verifyEmail);
router.post("/forgot-password", authController.forgotPassword);

module.exports = router;

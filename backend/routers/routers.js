const express = require("express");
const validateForm = require("../controllers/validateForm");
const router = express.Router();
const authController = require("../controllers/authControllers");
const { rateLimitter } = require("../controllers/rateLimitter");

router
  .route("/login")
  .get(authController.checkSession)
  .post(validateForm, rateLimitter, authController.handleLogin);

router.post("/signup", validateForm, rateLimitter, authController.handleSignup);

router.get("/logout",authController.handleLogout)

module.exports = router;

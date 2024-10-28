const express = require("express");
const AuthController = require("../controllers/authController");
const UserRepository = require("../repositories/UserRepository");
const AuthService = require("../auth/authService");

const router = express.Router();
const authService = new AuthService(new UserRepository());
const authController = new AuthController(authService);

router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));

module.exports = router;
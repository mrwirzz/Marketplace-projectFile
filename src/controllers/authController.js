const AuthService = require("../auth/authService");

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async register(req, res) {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json({ status: "success", data: user });
    } catch (error) {
      res.status(400).json({ status: "fail", message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { token, user } = await this.authService.login(req.body.email, req.body.password);
      res.status(200).json({ status: "success", data: { token, user } });
    } catch (error) {
      res.status(400).json({ status: "fail", message: error.message });
    }
  }
}

module.exports = AuthController;
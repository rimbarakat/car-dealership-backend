require("dotenv").config();
const AuthService = require("../services/authService");
class AuthController {
  service = new AuthService();
  async registerUser(req, res, next) {
    const registerBody = req.body;
    try {
      const response = await this.service.registerUser(registerBody);
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }

  async authenticate(req, res, next) {
    return res.json({});
  }

  async loginUser(req, res, next) {
    try {
      const loginBody = req.body;
      const response = await this.service.login(loginBody);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AuthController();

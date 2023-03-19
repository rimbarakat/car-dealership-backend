require("dotenv").config();
const authService = require("../services/authService");
class AuthController {
  async registerUser(req, res, next) {
    const registerBody = req.body;
    try {
      const response = await authService.registerUser(registerBody);
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
      const response = await authService.login(loginBody);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AuthController();

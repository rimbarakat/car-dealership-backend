authService = require("../services/authService");

class AuthController {
  async registerUser(req, res, next) {
    const { firstname, lastname, email, phonenumber, password } = req.body;
    try {
      console.log(req.body);
      const status = await authService.registerUserService({
        firstname,
        lastname,
        email,
        phonenumber,
        password,
      });
      console.log(status);

      if (status) {
        res.send({ message: "User created successfully" });
      } else {
        res.send({ message: "Error creating user" });
      }
    } catch (err) {
      next(err);
      console.log(err);
    }
  }

  async loginUser(req, res) {}
}

module.exports = new AuthController();

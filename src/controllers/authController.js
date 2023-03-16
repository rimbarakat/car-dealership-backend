require("dotenv").config();
const secretKey = process.env.JWT_SECRET_KEY;
const passwordSecret = process.env.PASS_SEC;
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
authService = require("../services/authService");
const User = require("../models/userModel")

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

  async loginUser(req, res, next) {

    try {
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(401).json({ message: "Wrong credentials!" });

      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
      const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      Originalpassword !== req.body.password &&
        res.status(401).json("Wrong credentials!");

      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "1d" }
      );

      const { password, ...others } = user._doc;

      res.status(200).json({ ...others, accessToken });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();

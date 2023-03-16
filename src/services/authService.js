require("dotenv").config();
const CryptoJS = require("crypto-js");
const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;
const passwordSecret = process.env.PASS_SEC;


class AuthService {
  registerUserService = async (userDetails) => {
    const { firstname, lastname, email, phonenumber, password } = userDetails;
    const userExists = await userModel.findOne({ email }, { maxTimeMS: 30000 });
    if (userExists) {
      throw { status: 409, message: "Email already registered" };
    }
    const encrypted = CryptoJS.AES.encrypt(password, passwordSecret);
    //const encrypted = encryptor.encrypt(password);
    const newUser = new userModel({
      firstname,
      lastname,
      email,
      phonenumber,
      password: encrypted,
    });

    try {
      const savedUser = await newUser.save();
      const token = jwt.sign({ userId: savedUser._id }, secretKey, { expiresIn: '1d' });
      return {
        status: 201,
        message: "User registered successfully",
        data: { user: savedUser, token },
      };
    } catch (err) {
      throw { status: 500, message: "Internal server error" };
    }
  };


  loginUserService(userDetails) {
    // const {email, password } = userDetails;
    // const loginUser = new userModel({
    //   email,
    //   password
    // });
  }
}

module.exports = new AuthService();

const userModel = require("../models/userModel");
const key = process.env.SECRET_KEY; //please store it in .env file
const encryptor = require("simple-encryptor")(key);

class AuthService {
  registerUserService = async (userDetails) => {
    const { firstname, lastname, email, phonenumber, password } = userDetails;
    const userExists = await userModel.findOne({ email }, { maxTimeMS: 30000 });
    if (userExists) {
      throw { status: 409, message: "Email already registered" };
    }

    const encrypted = encryptor.encrypt(password);
    const newUser = new userModel({
      firstname,
      lastname,
      email,
      phonenumber,
      password: encrypted,
    });

    try {
      const savedUser = await newUser.save();
      return {
        status: 201,
        message: "User registered successfully",
        data: savedUser,
      };
    } catch (err) {
      throw { status: 500, message: "Internal server error" };
    }
  };
  loginUserService(userDetails) {}
}

module.exports = new AuthService();

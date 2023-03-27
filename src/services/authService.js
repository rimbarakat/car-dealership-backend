const User = require("../models/userModel");
const jwt = require("../utils/jwt");
const { hashPassword, verify } = require("../utils/hash");
const HttpUnauthorizedError = require("../http-errors/HttpErrors");
const HttpError = require("../http-errors/HttpError");

class AuthService {
  registerUser = async (registerBody) => {
    const { firstName, lastName, email, phoneNumber, password } = registerBody;
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new HttpError(409, "Email already registered");
    }
    const phoneExists = await User.findOne({ phoneNumber });
    if (phoneExists) {
      throw new HttpError(409, "Phone number already registered");
    }
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      userType: "client",
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    // Sending an access token here directly is wrong, because you have to verify the email first
    // we should only send an access token after login, not register
    // But... for now, okay..
    // we will assume that the email is automatically verified and that the user is automatically signed in
    const accessToken = await jwt.sign({
      userId: savedUser._id,
      userType: savedUser.userType,
    });
    const { password: removed, ...rest } = savedUser.toJSON();
    return { user: { ...rest }, accessToken };
  };

  /**
   * it's important to return login_error from login so that the client knows that this 401 comes from login
   *
   * @param {*} loginBody
   * @returns
   */
  async login(loginBody) {
    const user = await User.findOne({ email: loginBody.email });
    if (!user) {
      throw new HttpUnauthorizedError(null, "login_error");
    }
    const isVerified = await verify(loginBody.password, user.password);
    if (!isVerified) {
      throw new HttpUnauthorizedError(null, "login_error");
    }
    const accessToken = jwt.sign({
      id: user._id,
      userType: user.userType,
    });
    const { password, ...u } = user.toJSON();
    return { user: u, accessToken };
  }
}

module.exports = AuthService;

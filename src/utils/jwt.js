const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const TOKEN_DURATION = "60d";

const verifyToken = async (token) => {
  return jwt.verify(token, SECRET_KEY);
};
const sign = (payload) => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: TOKEN_DURATION,
  });
};
module.exports = { verifyToken, sign };

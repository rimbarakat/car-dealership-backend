const HttpError = require("../http-errors/HttpError");
const HttpUnauthorizedError = require("../http-errors/HttpErrors");
const jwt = require("../utils/jwt");
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error();
    }
    const token = authHeader.split(" ")[1];
    const decoded = await jwt.verifyToken(token);
    if (!decoded) {
      throw new Error();
    }
    req.user = decoded;
    next();
  } catch (e) {
    // returning all auth errors as 401
    next(new HttpUnauthorizedError());
  }
};

module.exports = authMiddleware;

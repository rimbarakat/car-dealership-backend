const HttpError = require("../http-errors/HttpError");
const HttpUnauthorizedError = require("../http-errors/HttpUnauthorizedError");
const jwt = require("../utils/jwt");
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new HttpUnauthorizedError();
    }
    const token = authHeader.split(" ")[1];
    const decoded = await jwt.verifyToken(token);
    if (!decoded) {
      throw new HttpError(401, "invalid token");
    }
    req.user = decoded;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = authMiddleware;

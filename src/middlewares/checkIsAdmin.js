const HttpForbiddenError = require("../http-errors/HttpErrors");
const checkIsAdmin = async (req, res, next) => {
  if (req.user.userType === "admin") {
    return next();
  }
  throw new HttpForbiddenError("User is not allowed to perform this operation");
};

module.exports = checkIsAdmin;

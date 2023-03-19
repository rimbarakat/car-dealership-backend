const HttpError = require("./HttpError");

class HttpUnauthorizedError extends HttpError {
  constructor(message) {
    super(401, message || "Unable to authenticate");
  }
}
module.exports = HttpUnauthorizedError;

const HttpError = require("./HttpError");

class HttpUnauthorizedError extends HttpError {
  constructor(message, code) {
    super(401, message || "Unable to authenticate", code);
  }
}
module.exports = HttpUnauthorizedError;

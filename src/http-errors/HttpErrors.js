const HttpError = require("./HttpError");

class HttpUnauthorizedError extends HttpError {
  constructor(message, code) {
    super(401, message || "Unable to authenticate", code);
  }
}
class HttpForbiddenError extends HttpError {
  constructor(message, code) {
    super(403, message || "Forbidden operation", code);
  }
}
class HttpNotFoundError extends HttpError {
  constructor(message, code) {
    super(404, message || "Not found", code);
  }
}
module.exports = {
  HttpUnauthorizedError,
  HttpNotFoundError,
  HttpForbiddenError,
};

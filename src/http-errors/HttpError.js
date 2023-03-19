class HttpError extends Error {
  constructor(status, message, code) {
    super();
    this.status = status;
    this.message = message;
    this.code = code;
  }
}
module.exports = HttpError;

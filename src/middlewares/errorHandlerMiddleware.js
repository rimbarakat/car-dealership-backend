const HttpError = require("../http-errors/HttpError");

const errorHandlerMiddleware = (err, req, res, next) => {
  let status = 500;
  let message = "something went wrong";
  if (err instanceof HttpError) {
    status = err.status;
    message = err.message || message;
  }
  res.status(status).json({
    message: message,
  });
};
module.exports = errorHandlerMiddleware;

const HttpError = require("../http-errors/HttpError");

const errorHandlerMiddleware = (err, req, res, next) => {
  let status = 500;
  let message = "Internal Error";
  let code;
  console.log(err);
  if (err instanceof HttpError) {
    status = err.status;
    message = err.message || message;
    code = err.code;
  }
  res.status(status).json({
    message: message,
    code: code,
  });
};
module.exports = errorHandlerMiddleware;

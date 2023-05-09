const express = require("express");
// const rateLimit = require("express-rate-limit");
const rateLimit = require("../middlewares/rateLimit");


const app = express();
const HttpError = require("../http-errors/HttpError");

const login_limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 100 requests per windowMs
    message: "Too many login tries, please try again later.",
});

module.exports = login_limiter;
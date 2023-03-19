const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: /^\S+@\S+\.\S+$/,
    },
    phoneNumber: {
      type: String,
      required: true,
      // match:  /^\d{7,8}$/
      match: /^((\+|00)961)?\d{7,8}$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    userType: {
      type: String,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);

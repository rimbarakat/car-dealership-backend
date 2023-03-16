const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({

    model: { type: String, required: true},
    year: { type: String, required: true},
    color: { type: String, required: true},
    description: { type: String, required: true},
    image: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", CarSchema);
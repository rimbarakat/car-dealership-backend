require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoutes = require("./routes/authRoutes");
const carsRoutes = require("./routes/carsRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const uri = process.env.MONGO_URI;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/cars", carsRoutes);
app.use("/bookings", bookingRoutes);

app.listen(8000, () => {
  console.log("Server started on port 8000");
});

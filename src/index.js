require("dotenv").config();
const validateEnv = require("./utils/validateEnv");
validateEnv();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
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
app.use(cors());
app.use("/auth", authRoutes);
app.use("/cars", carsRoutes);
app.use("/bookings", bookingRoutes);

const port = Number(process.env.PORT) || 8000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

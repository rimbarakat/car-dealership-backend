const carModel = require("../models/carModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const { json } = require("express");
const HttpError = require("../http-errors/HttpError");

class CarService {
  getCarbyId = async (id) => {
    //retreive car info by the id from the database and return it
    const car = await carModel
      .findById(id, { maxTimeMS: 30000 })
      .select("model year color description image");
    if (!car) {
      throw new HttpError(404, "car not found");
    }
    return car;
  };
  getAllCars = async () => {
    const cars = await carModel
      .find()
      .select("model year color description image");
    return cars;
  };
  updateCar = async (id, newInfo) => {
    const { model, year, color, description, image } = newInfo;
    const carExists = carModel.findByIdAndUpdate(
      id,
      { model, year, color, description, image },
      { new: true },
      { maxTimeMS: 30000 }
    );
    return carExists;
  };
  addCar = async (carInfo) => {
    const newCarInfo = new carModel({
      model: carInfo.model,
      year: carInfo.year,
      color: carInfo.color,
      description: carInfo.description,
      image: carInfo.image,
    });
    const newCar = await newCarInfo.save();
    return newCar;
  };
  deleteCar = async (id) => {
    const deletedCar = await carModel.findByIdAndDelete(id);
    if (!deletedCar) {
      throw new HttpError(404, "car not found");
    }
    return deletedCar;
  };
  getCarBookings = async (carInfo) => {};
}

module.exports = new CarService();

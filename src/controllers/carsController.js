// const Car = require("../models/carModel");
const Bookings = require("../models/bookingModel");
// const User = require("../models/userModel");
const CarsService = require("../services/carServices");
// const userModel = require("../models/userModel");
// const carModel = require("../models/carModel");

const mockcar = {
  model: "Toyota",
  year: "2019",
  color: "Red",
  description: "This is a car",
};

class CarsController {
  service = new CarsService();
  getCar = async (req, res, next) => {
    try {
      const id = req.params.id;
      const car = await this.service.getCarbyId(id);
      res.json(car);
    } catch (err) {
      next(err);
    }
  };
  getCars = async (req, res, next) => {
    try {
      const cars = await this.service.getAllCars();
      res.status(200).json({ data: cars });
    } catch (err) {
      next(err);
    }
  };
  updateCar = async (req, res, next) => {
    const id = req.params.id;
    const { model, mileage, price, price_int, engine, engineShort, fuelType, fuelTypeShort, gearBox, gearBoxShort, drive, driveShort, year, color, description, image, isAvailable, isSold } = req.body;
    const car = await this.service.updateCar(id, {
      model,
      mileage,
      price,
      price_int,
      engine,
      engineShort,
      fuelType,
      fuelTypeShort,
      gearBox,
      gearBoxShort,
      drive,
      driveShort,
      year,
      color,
      description,
      image,
      isAvailable,
      isSold,
    });
    res.status(200).json(car);
  };
  addCar = async (req, res, next) => {
    try {
      const { model, mileage, price, price_int, engine, engineShort, fuelType, fuelTypeShort, gearBox, gearBoxShort, drive, driveShort, year, color, description, image, isAvailable, isSold, } = req.body;
      const car = await this.service.addCar({
        model,
        mileage,
        price,
        price_int,
        engine,
        engineShort,
        fuelType,
        fuelTypeShort,
        gearBox,
        gearBoxShort,
        drive,
        driveShort,
        year,
        color,
        description,
        image,
        isAvailable,
        isSold,
      });
      res.status(201).json(car);
    } catch (err) {
      next(err);
    }
  };
  deleteCar = async (req, res, next) => {
    try {
      const id = req.params.id;
      await this.service.deleteCar(id);
      // for loop delete all bookings with the id
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  };
  getCarBookings = async (req, res, next) => {
    try {
      const id = req.params.id;
      const bookings = await this.service.getCarBookings(id);
      res.json(bookings);
    }
      catch (err) {
      next(err);
    }
  };
}

module.exports = new CarsController();

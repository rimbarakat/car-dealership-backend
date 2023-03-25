const Car = require("../models/carModel");
const User = require("../models/userModel");
carServices = require("../services/carServices");
const userModel = require("../models/userModel");
const carModel = require("../models/carModel");

const mockcar = {
  model: "Toyota",
  year: "2019",
  color: "Red",
  description: "This is a car",
};

class CarsController {
  async getCar(req, res, next) {
    try {
      const id = req.params.id;
      const car = await carServices.getCarbyId(id);
      res.json(car);
    } catch (err) {
      next(err);
    }
  }
  async getCars(req, res, next) {
    try {
      const cars = await carServices.getAllCars();
      res.status(200).json({ data: cars });
    } catch (err) {
      next(err);
    }
  }
  async updateCar(req, res, next) {
    const id = req.params.id;
    const { model, year, color, description, image } = req.body;
    const car = await carServices.updateCar(id, {
      model,
      year,
      color,
      description,
      image,
    });
    res.status(200).json({ data: car });
  }
  async addCar(req, res, next) {
    try {
      const { model, year, color, description, image } = req.body;
      const car = await carServices.addCar({
        model,
        year,
        color,
        description,
        image,
      });
      res.status(201).json({ data: car });
    } catch (err) {
      next(err);
    }
  }
  async deleteCar(req, res, next) {
    try {
      const id = req.params.id;
      await carServices.deleteCar(id);
    } catch (err) {
      next(err);
    }
  }
  getCarBookings(req, res, next) {}
}

module.exports = new CarsController();

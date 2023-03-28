const Car = require("../models/carModel");
const HttpError = require("../http-errors/HttpError");
const { ObjectId } = require("mongodb");
const { HttpNotFoundError } = require("../http-errors/HttpErrors");

class CarService {
  getCarbyId = async (id) => {
    //retreive car info by the id from the database and return it
    const car = await Car.findOne({ _id: id }).select(
      "model year color description image _id"
    );
    if (!car) {
      throw new HttpNotFoundError("Car not found");
    }
    return car;
  };
  getAllCars = async () => {
    const cars = await Car.find().select("model year color description image");
    return cars;
  };
  updateCar = async (id, newInfo) => {
    const { model, year, color, description, image } = newInfo;
    const car = await Car.findOneAndUpdate(
      {
        _id: id,
      },
      { model, year, color, description, image },
      { new: true }
    );
    return car.toObject();
  };
  addCar = async (carInfo) => {
    const newCarInfo = new Car({
      model: carInfo.model,
      mileage: carInfo.mileage,
      price: carInfo.price,
      engine: carInfo.engine,
      fuelType: carInfo.fuelType,
      gearBox: carInfo.gearBox,
      drive: carInfo.drive,
      year: carInfo.year,
      color: carInfo.color,
      description: carInfo.description,
      image: carInfo.image,
    });
    const newCar = await newCarInfo.save();
    return newCar.toObject();
  };
  deleteCar = async (id) => {
    const deletedCar = await Car.deleteOne({
      id: id,
    });
    if (!deletedCar) {
      throw new HttpNotFoundError("Car not found");
    }
    return deletedCar;
  };
  getCarBookings = async (carInfo) => {};
}

module.exports = CarService;

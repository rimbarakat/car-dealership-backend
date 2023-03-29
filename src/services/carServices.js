const Car = require("../models/carModel");
const HttpError = require("../http-errors/HttpError");
const { ObjectId } = require("mongodb");
const { HttpNotFoundError } = require("../http-errors/HttpErrors");

class CarService {
  getCarbyId = async (id) => {
    //retreive car info by the id from the database and return it
    const car = await Car.findOne({ _id: id }).select(
      "model mileage price price_int engine engineShort fuelType fuelTypeShort gearBox gearBoxShort drive driveShort year color description image isAvailable isSold _id"
    );
    if (!car) {
      throw new HttpNotFoundError("Car not found");
    }
    return car;
  };
  getAllCars = async () => {
    const cars = await Car.find().select("model mileage price price_int engine engineShort fuelType fuelTypeShort gearBox gearBoxShort drive driveShort year color description image isAvailable isSold");
    return cars;
  };
  updateCar = async (id, newInfo) => {
    const { model, mileage, price, price_int, engine, engineShort, fuelType, fuelTypeShort, gearBox, gearBoxShort, drive, driveShort, year, color, description, image, isAvailable, isSold } = newInfo;
    const car = await Car.findOneAndUpdate(
      {
        _id: id,
      },
      { model, mileage, price, price_int, engine, engineShort, fuelType, fuelTypeShort, gearBox, gearBoxShort, drive, driveShort, year, color, description, image, isAvailable, isSold },
      { new: true }
    );
    return car.toObject();
  };
  addCar = async (carInfo) => {
    const newCarInfo = new Car({
      model: carInfo.model,
      mileage: carInfo.mileage,
      price: carInfo.price,
      price_int: carInfo.price_int,
      engine: carInfo.engine,
      engineShort: carInfo.engineShort,
      fuelType: carInfo.fuelType,
      fuelTypeShort: carInfo.fuelTypeShort,
      gearBox: carInfo.gearBox,
      gearBoxShort: carInfo.gearBoxShort,
      drive: carInfo.drive,
      driveShort: carInfo.driveShort,
      year: carInfo.year,
      color: carInfo.color,
      description: carInfo.description,
      image: carInfo.image,
      isAvailable: carInfo.isAvailable, 
      isSold: carInfo.isSold,
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

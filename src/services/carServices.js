const Car = require("../models/carModel");
const Booking = require("../models/bookingModel");
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
      _id: id,
    });
    if (!deletedCar) {
      throw new HttpNotFoundError("Car not found");
    }
    await Booking.deleteMany({ car: id });
    return deletedCar;
  };
  getCarBookings = async (carId) => {
    const temp = new Date();
    const bookings = await Booking.find({car: carId}).select("_id car user bookedTimeSlot bookedDateSlot notes timestamps");
    const test = await Car.find({ _id: carId });
    for (let i = 0; i < test[0].availability.length; i++) {
      //to get one date you put the index of the date you want in the availability to get all dates you keep it as is.
      console.log(test[0].availability[i].toObject().date);

    }
  };
  
}

module.exports = CarService;

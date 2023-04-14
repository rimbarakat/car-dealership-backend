const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const HttpError = require("../http-errors/HttpError");
const { ObjectId } = require("mongodb");
const { HttpNotFoundError } = require("../http-errors/HttpErrors");
const { HttpConflictError } = require("../http-errors/HttpErrors");

class BookingsService {
  getBookingById = async (id) => {
    const booking = await Booking.findOne({ _id: id }).select("car user date time notes timestamps");
    if (!booking) {
      throw new HttpNotFoundError("Car Booking not found");
    }
    return booking;
  };

  getAllBookings = async (date) => {
    let bookings;
    if (date) {
        bookings = await Booking.find({ date: date }).select("time");
    } else {
        bookings = await Booking.find().select("car user date time notes");
    }
    return bookings;
  };

  getCarBookings = async (carId) => {
    const bookings = await Booking.find({car: carId}).select("_id car user date time notes timestamps");
    return bookings;
  };
  
  addBooking = async (bookingInfo) => {
    const newBookingInfo = new Booking({
      car: bookingInfo.car,
      user: bookingInfo.user,
      date: bookingInfo.date,
      time: bookingInfo.time,
      notes: bookingInfo.notes
    });
    const newBooking = await newBookingInfo.save();
    return newBooking.toObject();
  };

  deleteBooking = async (id) => {
    const deletedBooking = await Booking.deleteOne({
      _id: id,
    });
    if (!deletedBooking) {
      throw new HttpNotFoundError("Car booking not found");
    }
    return deletedBooking;
  };

  
}

module.exports = BookingsService;

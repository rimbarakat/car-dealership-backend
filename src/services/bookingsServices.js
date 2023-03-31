const Booking = require("../models/bookingModel");
const HttpError = require("../http-errors/HttpError");
const { ObjectId } = require("mongodb");
const { HttpNotFoundError } = require("../http-errors/HttpErrors");

class BookingsService {
  getBookingById = async (id) => {
    const booking = await Booking.findOne({ _id: id }).select("car user bookedTimeSlot bookedDateSlot notes timestamps");
    if (!booking) {
      throw new HttpNotFoundError("Car Booking not found");
    }
    return booking;
  };

  getAllBookings = async () => {
    const bookings = await Booking.find().select("car user bookedTimeSlot bookedDateSlot notes");
    return bookings;
  };
  
  addBooking = async (bookingInfo) => {
    const newBookingInfo = new Booking({
        car: bookingInfo.car,
        user: bookingInfo.user,
        bookedTimeSlot: bookingInfo.bookedTimeSlot,
        bookedDateSlot: bookingInfo.bookedDateSlot,
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

const Car = require("../models/carModel");
const { HttpNotFoundError } = require("../http-errors/HttpErrors");
const { HttpConflictError } = require("../http-errors/HttpErrors");

class BookingsService {
  getBookingById = async (id) => {
    const booking = await Booking.findOne({ _id: id }).select("userId date from to timestamps");
    if (!booking) {
      throw new HttpNotFoundError("Car Booking not found");
    }
    return booking;
  };

  getBookings = async () => {
    let bookings;
    if (date) {
        bookings = await Car.find({ date: date });
    } else {
        bookings = await Car.find().select("userId date from to");
    }
    bookings = await Car.find({}).select("userId date from to");
    return bookings;
  };

  getCarBookings = async (id, date) => {
    let bookingSlots 
    console.log(date);
    if (date) {
      bookingSlots = await Car.find({ _id: id, 'bookings.date': date},{"bookings.$": 1});
    } 
    else {
      bookingSlots = await Car.findById(id).select("bookings");
    }
  
    return bookingSlots;
  };
  
  addBooking = async (id, bookingInfo) => {
    //no need to check if available is true (cuz users cant select a date that is not available)
    const newBooking = {
      userId: bookingInfo.userId,
      date: bookingInfo.date,
      from: bookingInfo.from,
      to: bookingInfo.to
    };
    const updatedCarBookings = await Car.findOneAndUpdate(
      { _id: id },
      { $push: { bookings: newBooking } },
      { new: true }
    );

    await Car.findOneAndUpdate(
      { _id: id, "slots.date": newBooking.date, "slots.timeSlots.from": newBooking.from },
      { $set: { "slots.$[slot].timeSlots.$[timeSlot].isAvailable": false } },
      { arrayFilters: [{ "slot.date": newBooking.date }, { "timeSlot.from": newBooking.from }], new: true }
    );

    return updatedCarBookings;
  };

  // deleteBooking = async (id) => {
  //   const deletedBooking = await Car.deleteOne({
  //     _id: id,
  //   });
  //   if (!deletedBooking) {
  //     throw new HttpNotFoundError("Car booking not found");
  //   }
  //   return deletedBooking;
  // };
}

module.exports = BookingsService;

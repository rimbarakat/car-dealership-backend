const Car = require("../models/carModel");
const UserModel = require("../models/userModel");
const { HttpNotFoundError } = require("../http-errors/HttpErrors");
const { HttpConflictError } = require("../http-errors/HttpErrors");

function formatBookingToString(booking) {
  const userId = booking.userId;
  const date = booking.date;
  const from = booking.from;
  const to = booking.to;

  return `User ID: ${userId}, Date: ${date}, From: ${from}, To: ${to}`;
}

class BookingsService {
  
  getAllBookings = async (userId, date) => {

    // if user is admin
    const user = await UserModel.findById(userId);
    if (user.userType == "admin") {
      const cars = await Car.find({});
      if (date) {
        const filteredBookings = [];
        for (const car of cars) {
          for (const booking of car.bookings) {
            console.log(booking.date);
            if (booking.date == date) {
              filteredBookings.push({
                carId: car._id,
                userId: booking.userId,
                bookingId: booking._id,
                bookingDate: booking.date,
                bookingFrom: booking.from,
                bookingTo: booking.to,
              });
            }
          }
        } 
        return filteredBookings;
      }
      else {
        return cars.flatMap(car => car.bookings.map(booking => ({
          carId: car._id,
          userId: booking.userId,
          bookingId: booking._id,
          bookingDate: booking.date,
          bookingFrom: booking.from,
          bookingTo: booking.to,
        })));
      }
    }

    // if user is client
    else
    {
      if (date) {
        const cars = await Car.find({ bookings: { $elemMatch: { userId: userId, date: date } } });
        const bookings = [];
  
        for (const car of cars) {
          for (const booking of car.bookings) {
            if (typeof booking.userId === 'object') { // to remove when all userId are defined and database is cleaned
              if (booking.userId.toString() === userId && booking.date === date) {
                bookings.push({
                  carId: car._id,
                  // userId: booking.userId,
                  bookingId: booking._id,
                  // bookingDate: booking.date,
                  bookingFrom: booking.from,
                  bookingTo: booking.to,
                });
              }
            }
          }
        }
        return bookings;

      }
      else {
        const cars = await Car.find({ bookings: { $elemMatch: { userId: userId } } });
        const bookings = [];
  
        for (const car of cars) {
          for (const booking of car.bookings) {
            if (typeof booking.userId === 'object') { // to remove when all userId are defined and database is cleaned
              if (booking.userId.toString() === userId) {
                bookings.push({
                  carId: car._id,
                  // userId: booking.userId,
                  bookingId: booking._id,
                  bookingDate: booking.date,
                  bookingFrom: booking.from,
                  bookingTo: booking.to,
                });
              }
            }
          }
        }
        return bookings;
      }
    }
    
  };


  getCarBookings = async (id, date) => {
    let bookingSlots;
    if (date) {
      // bookingSlots = await Car.find({ _id: id, 'bookings.date': date }, "bookings");
      const bookingSlots = await Car.find(
        { _id: id, "bookings.date": date },
        "bookings"
      );
      const filteredBookings = bookingSlots[0].bookings.filter(
        (booking) => booking.date === date
      );
      return filteredBookings;
    } else {
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
      to: bookingInfo.to,
    };
    const updatedCarBookings = await Car.findOneAndUpdate(
      { _id: id },
      { $push: { bookings: newBooking } },
      { new: true }
    );

    await Car.findOneAndUpdate(
      {
        _id: id,
        "slots.date": newBooking.date,
        "slots.timeSlots.from": newBooking.from,
      },
      { $set: { "slots.$[slot].timeSlots.$[timeSlot].isAvailable": false } },
      {
        arrayFilters: [
          { "slot.date": newBooking.date },
          { "timeSlot.from": newBooking.from },
        ],
        new: true,
      }
    );

    return updatedCarBookings;
  };

  deleteBooking = async (carId, bookingId) => {
    try {
      // Find the car by carId
      const car = await Car.findById(carId);

      if (!car) {
        throw new Error("Car not found");
      }

      let temp = 0;
      // Find the index of the booking to delete
      const bookingIndex = car.bookings;
      for (let i = 0; i < bookingIndex.length; i++) {
        if (bookingIndex[i]._id.toString() === bookingId) {
          temp = i;
          break;
        }
      }
      const date = car.bookings[temp].date;
      const from = car.bookings[temp].from;
      const to = car.bookings[temp].to;
      const slots = car.slots.filter((slot) => slot.date === date);

      await Car.findOneAndUpdate(
        { _id: carId, "slots.date": date, "slots.timeSlots.from": from },
        { $set: { "slots.$[slot].timeSlots.$[timeSlot].isAvailable": true } },
        {
          arrayFilters: [{ "slot.date": date }, { "timeSlot.from": from }],
          new: true,
        }
      );

      if (bookingIndex === -1) {
        throw new Error("Booking not found");
      }

      // Remove the booking from the car's bookings array
      car.bookings.splice(temp, 1);
      // Save the car with the updated bookings array
      const test = await car.updateOne({ bookings: car.bookings });
      return;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = BookingsService;

// const bookingsModel = require("../models/bookingModel");
const BookingsService = require("../services/bookingsServices");

class BookingsController {
  service = new BookingsService();
  getBooking = async (req, res, next) => {
    try {
      const id = req.params.id;
      const booking = await this.service.getBookingById(id);
      res.json(booking);
    } catch (err) {
      next(err);
    }
  };

  getBookings = async (req, res, next) => {
    try {
      const { date } = req.query;
      const bookings = await this.service.getAllBookings(date);
      res.status(200).json(bookings);
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

  addBooking = async (req, res, next) => {
    try {
      const { user, car, date, time, notes} = req.body;
      const booking = await this.service.addBooking({
        user,
        car,
        date,
        time,
        notes,
      });
      res.status(201).json(booking);
    } catch (err) {
      next(err);
    }
  };
  
  deleteBooking = async (req, res, next) => {
    try {
      const id = req.params.id;
      await this.service.deleteBooking(id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  };
}


module.exports = new BookingsController();
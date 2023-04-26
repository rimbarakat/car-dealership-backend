const e = require("express");
const BookingsService = require("../services/bookingsServices");
const jwt = require("../utils/jwt");
//require("dotenv").config();
//const validateEnv = require("src/utils/validateEnv");
//validateEnv();

function getUserIdFromToken(token) {
  return new Promise((resolve, reject) => {
    try {
      const decodedPromise = jwt.verifyToken(token);
      decodedPromise.then((decoded) => {
        const userId = decoded.id;
        console.log(userId);
        resolve(userId);
      });
    } catch (error) {
      reject(error);
    }
  });
}

class BookingsController {
  service = new BookingsService();

  getAllBookings = async (req, res, next) => {
    try {
      const allBookings = await this.service.getAllBookings();
      res.json(allBookings);
    } catch (err) {
      next(err);
    }
  };

  getCarBookings = async (req, res, next) => {
    try {
      const id = req.params.id;
      const { date } = req.query;
      const bookings = await this.service.getCarBookings(id, date);
      res.json(bookings);
    } catch (err) {
      next(err);
    }
  };

  addBooking = async (req, res, next) => {
    try {
      const { date, from, to } = req.body;
      const token = req.headers.authorization;
      const userIdPromise = getUserIdFromToken(token.split(" ")[1]);
      const userId = await userIdPromise;
      console.log(userId);
      const { id } = req.params;
      const booking = await this.service.addBooking(id, {
        userId,
        date,
        from,
        to,
      });
      res.status(201).json(booking);
    } catch (err) {
      next(err);
    }
  };

  deleteBooking = async (req, res, next) => {
    try {
      const id = req.params.id;
      const bookingid = req.params.bid;
      const test = await this.service.deleteBooking(id, bookingid);
      res.status(204).send();
      return;
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new BookingsController();

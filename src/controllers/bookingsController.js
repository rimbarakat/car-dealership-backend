const e = require("express");
const BookingsService = require("../services/bookingsServices");
const jwt = require("../utils/jwt");
//require("dotenv").config();
//const validateEnv = require("src/utils/validateEnv");
//validateEnv();


function getUserIdFromToken(token) {
  try {
    const decoded = jwt.verifyToken(token);
    const userId = decoded._id;

    return userId;
  } catch (error) {
    throw error;
  }
}

class BookingsController {
  service = new BookingsService();


  // TODO HEKMAT (fix it 3a zaw2ak)
  // getAllBookings = async (req, res, next) => {
  //   try {
  //     const bookings = await this.service.getAllBookings();
  //     ......
  //   } catch (err) {
  //     next(err);
  //   }
  // };

  getCarBookings = async (req, res, next) => {
    try {
      const id = req.params.id;
      const { date } = req.query;
      const bookings = await this.service.getCarBookings(id, date);
      res.json(bookings);
    }
      catch (err) {
      next(err);
    }
  };

  addBooking = async (req, res, next) => {
    try {
      const { date, from, to } = req.body;
      const token = req.headers.authorization;
      const userId=getUserIdFromToken(token.split(" ")[1]);
      const { id } = req.params;
      const booking = await this.service.addBooking(id,{
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
      const bookingid = req.body.id;
      console.log(id,bookingid);
      await this.service.deleteBooking(id,bookingid);
      res.sendStatus(204).json({ message: "Booking deleted" });
    } catch (err) {
      next(err);
    }
  };
}


module.exports = new BookingsController();
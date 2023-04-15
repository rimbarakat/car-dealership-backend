const BookingsService = require("../services/bookingsServices");

class BookingsController {
  service = new BookingsService();

  // getBookings = async (req, res, next) => {
  //   try {
  //     const { date } = req.query;
  //     const bookings = await this.service.getBookings();
  //     res.status(200).json(bookings);
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
      const { userId, date, from, to } = req.body;
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
  
  // deleteBooking = async (req, res, next) => {
  //   try {
  //     const id = req.params.id;
  //     await this.service.deleteBooking(id);
  //     res.sendStatus(204);
  //   } catch (err) {
  //     next(err);
  //   }
  // };
}


module.exports = new BookingsController();
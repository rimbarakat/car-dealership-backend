const MockCars = [
  {
    title: "",
    description: "",
    price: 21.35,
    image: "",
  },
];
class CarsController {
  deleteCar(req, res, next) {}
  getCar(req, res, next) {}
  getCars(req, res, next) {
    res.json(MockCars);
  }
  updateCar(req, res, next) {}
  getCarBookings(req, res, next) {}
  addCar(req, res, next) {}
}

module.exports = new CarsController();


const { HttpNotFoundError } = require("../http-errors/HttpErrors");
const User = require("../models/userModel");
const CarService = require("./carServices");
const BookingsService = require("./bookingsServices");
const UserService = require("./userService");
const { userService } = require("../controllers/userController");

class StatisticsService {

    carService = new CarService()
    bookingService = new BookingsService()
    userService = new UserService()

    getStatistics = async () => {
        const admin = await User.findOne({ userType: 'admin' });

        if (!admin) {
        console.log('Admin user not found');
        return;
        }

        const adminCreateTime = admin.createdAt;
        const timeElapsed = new Date() - new Date(adminCreateTime);
        // const seconds = Math.floor(timeElapsed / 1000);
        // const minutes = Math.floor(seconds / 60);
        // const hours = Math.floor(minutes / 60);
        const days = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        let nbCarsSold
        let nbCarsTotal
        let nbCarsRemaining

        let nbCarsSoldDay
        let nbCarsSoldMonth
        let nbCarsSoldYear

        let revenueTotal
        let revenueDay
        let revenueMonth
        let revenueYear

        let nbUsersTotal

        nbCarsTotal = await this.carService.getTotalCars();
        nbCarsSold = await this.carService.getTotalCarsSold();
        nbCarsSoldDay = nbCarsSold/days;
        nbCarsSoldMonth = nbCarsSoldMonth/months;
        nbCarsSoldYear = nbCarsSoldYear/years;

        nbCarsRemaining = nbCarsTotal-nbCarsSold;

        revenueTotal = await this.carService.getRevenue()
        revenueTotal = revenueTotal[0].total
        revenueDay = revenueTotal/days;   
        revenueMonth = revenueTotal/months;   
        revenueYear = revenueTotal/years;

        nbUsersTotal = await this.userService.getTotalUsers();

        return {
            nbCarsTotal: nbCarsTotal,
            nbCarsSold: nbCarsSold,
            nbCarsRemaining: nbCarsRemaining,
            nbCarsSoldDay: nbCarsSoldDay,
            nbCarsSoldMonth: nbCarsSoldMonth,
            nbCarsSoldYear: nbCarsSoldYear,
            revenueTotal: revenueTotal,
            revenueDay: revenueDay,
            revenueMonth: revenueMonth,
            revenueYear: revenueYear,
            nbUsersTotal: nbUsersTotal
        };
    }
}

module.exports = StatisticsService;
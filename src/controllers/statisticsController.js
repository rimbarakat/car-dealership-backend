const { HttpNotFoundError } = require("../http-errors/HttpErrors");
const StatisticsService = require("../services/statisticsService");

class StatisticsController {
    service = new StatisticsService();
    getStatistics = async (req, res, next) => {
        try {
          const { date } = req.query;
          const statistics = await this.service.getStatistics(date);
          res.status(200).json(statistics);
          return;
        } catch (err) {
          next(err);
        }
      };

}

module.exports = new StatisticsController();
const UserService = require("../services/userService");
const userService = new UserService();

class userController {

  getUserInfo = async (req, res, next) => {
    const { userId } = req.params;
    try {
      const user = await userService.getUserInfo(userId);
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  };

  updateUserInfo = async (req, res, next) => {
    const { userId } = req.params;
    const updateBody = req.body;
    try {
      const user = await userService.updateUserInfo(userId, updateBody);
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  };
}

module.exports = new userController();
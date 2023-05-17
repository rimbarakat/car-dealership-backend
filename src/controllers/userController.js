const UserService = require("../services/userService");

class userController {
  userService = new UserService();

  getUserInfo = async (req, res, next) => {
    const { userId } = req.params;
    try {
      const user = await this.userService.getUserInfo(userId);
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  };

  updateUserInfo = async (req, res, next) => {
    const { userId } = req.params;
    const updateBody = req.body;
    try {
      await this.userService.updateUserInfo(userId, updateBody);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  };
}

module.exports = new userController();

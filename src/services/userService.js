const UserModel = require("../models/userModel");
const CarModel = require("../models/carModel");

class UserService {
  getUserInfo = async (userId) => {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  };

  updateUserInfo = async (userId, updateBody) => {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
  };

  getTotalUsers = async () => {
    const user = await UserModel.find().countDocuments();
    return user;
  }

}

module.exports = UserService;
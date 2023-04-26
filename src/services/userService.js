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

  // getUserBookings = async (userId) => {
  //   const user = await UserModel.findById(userId);
  //   const bookings = await CarModel.findById(userId);
  //   if (!user) {
  //     throw new Error("User not found");
  //   }
  //   return user;
  // };

}

module.exports = UserService;
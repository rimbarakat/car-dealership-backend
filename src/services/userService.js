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
    await UserModel.updateOne(
      {
        _id: userId,
      },
      {
        fullName: updateBody.name,
        address: updateBody.address,
      }
    );
  };

  getTotalUsers = async () => {
    const user = await UserModel.find().countDocuments();
    return user;
  };
}

module.exports = UserService;

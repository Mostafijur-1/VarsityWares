const createError = require("http-errors");
const { User } = require("../models/userModel");

const handleUserAction = async (userId, action, options) => {
  try {
    let update;
    let statusMessage;

    if (action === "ban") {
      update = {
        isBanned: true,
      };
      statusMessage = "User is banned successfully";
    } else if (action === "unban") {
      update = {
        isBanned: false,
      };
      statusMessage = "User is unbanned successfully";
    } else {
      throw createError(400, "Invalid action. acrion should be ban or unban");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      update,
      options
    ).select("-password");

    console.log(updatedUser);

    if (!updatedUser) {
      throw createError(404, "User not found");
    }

    return statusMessage;
  } catch (error) {
    throw error;
  }
};

module.exports = { handleUserAction };

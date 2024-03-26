require("dotenv").config();

const serverPort = process.env.SERVER_PORT || 5001;
const mongodbURL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/VarsityWares";

const defaultImagePath =
  process.env.DEFAULT_USER_IMAGE_PATH || "../public/images/users/default.jpg";

module.exports = { serverPort, mongodbURL, defaultImagePath };

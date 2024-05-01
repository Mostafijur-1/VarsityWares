require("dotenv").config();

const serverPort = process.env.SERVER_PORT || 5001;
const mongodbURL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/VarsityWares";

const defaultImagePath =
  process.env.DEFAULT_USER_IMAGE_PATH || "../public/images/users/default.jpg";

const jwtSecret = process.env.JWT_SECRET || "iuyerihjbeugyej687rwerg@";
const jwtAccessKey = process.env.JWT_ACCESS_KEY || "NFHNHBJHGJG";

const smtpUsername = process.env.SMTP_USERNAME || "";
const smtpPassword = process.env.SMTP_PASSWORD || "";
const clientURL = process.env.CLIENT_URL || "http://localhost:3000";

module.exports = {
  serverPort,
  mongodbURL,
  defaultImagePath,
  jwtSecret,
  smtpUsername,
  smtpPassword,
  clientURL,
  jwtAccessKey,
};

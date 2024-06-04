require("dotenv").config();

const serverPort = process.env.SERVER_PORT || 5001;
const mongodbURL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/VarsityWares";

const jwtSecret = process.env.JWT_SECRET_KEY || "iuyerihjbeugyej687rwerg@";
const jwtAccessKey = process.env.ACTIVATION_SECRET || "NFHNHBJHGJG";

const smtpUsername = process.env.SMTP_MAIL || "";
const smtpPassword = process.env.SMTP_PASSWORD || "";
const clientURL = process.env.CLIENT_URL || "http://localhost:5173";

module.exports = {
  serverPort,
  mongodbURL,
  jwtSecret,
  smtpUsername,
  smtpPassword,
  clientURL,
  jwtAccessKey,
};

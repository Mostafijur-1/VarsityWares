const mongoose = require("mongoose");
const { mongodbURL } = require("../secret");

const connectDB = async (options = {}) => {
  try {
    await mongoose.connect(mongodbURL, options);
    console.log("Connection to MongoDB is successful");

    mongoose.connection.on("error", (err) => {
      console.error("Database Connection error: ", err);
    });
  } catch (error) {
    console.error("Connection Failed: ", error.toString());
  }
};

module.exports = connectDB;

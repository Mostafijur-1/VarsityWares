const createError = require("http-errors");
const getUser = (req, res) => {
  try {
    res.status(200).send({ message: "User returned" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser };

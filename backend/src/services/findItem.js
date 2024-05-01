const createError = require("http-errors");

const { mongoose } = require("mongoose");

const findWithId = async (model, id, options = {}) => {
  try {
    const item = await model.findById(id, options);
    return item;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(400, "Invalid User id");
    }
  }
};

module.exports = { findWithId };

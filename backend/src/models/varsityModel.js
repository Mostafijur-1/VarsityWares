const { Schema, model } = require("mongoose");

const varsitySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "varsityname is required"],
      trim: true,
      unique: true,
      maxlength: [40, "maximum length of varsityname is 40 characters"],
      minlength: [2, "minimum length of varsityname is 2 characters"],
    },
    slug: {
      type: String,
      required: [true, "varsity slug is required"],
      lowecase: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Varsity = model("Varsity", varsitySchema);

module.exports = {
  Varsity,
};

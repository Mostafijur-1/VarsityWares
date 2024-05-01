const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "categoryname is required"],
      trim: true,
      unique: true,
      maxlength: [40, "maximum length of categoryname is 40 characters"],
      minlength: [5, "minimum length of categoryname is 5 characters"],
    },
    slug: {
      type: String,
      required: [true, "category slug is required"],
      lowecase: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Category = model("Category", categorySchema);

module.exports = {
  Category,
};

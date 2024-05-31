const { Schema, model } = require("mongoose");
const { defaultImagePath } = require("../secret");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      unique: true,
      minlength: [3, "minimum length of Product name is 3 characters"],
      maxlength: [99, "maximum length of Product name is 99 characters"],
    },
    slug: {
      type: String,
      lowecase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      minlength: [5, "minimum length of Product name is 5 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
      validate: {
        validator: (v) => {
          v > 0;
        },
        message: (props) =>
          `${props.value} is not valid price. Price must be greater than 0. `,
      },
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      trim: true,
      validate: {
        validator: (v) => {
          v > 0;
        },
        message: (props) =>
          `${props.value} is not valid quantity. quantity must be greater than 0. `,
      },
    },
    sold: {
      type: Number,
      required: [true, "sold quantity is required"],
      trim: true,
      default: 0,
      validate: {
        validator: (v) => {
          v >= 0;
        },
        message: (props) =>
          `${props.value} is not valid quantity.sold quantity must be greater than or equal 0. `,
      },
    },
    rating: {
      type: Number,
      default: 0,
      trim: true,
      validate: {
        validator: (v) => {
          v >= 1 && v <= 5;
        },
        message: (props) => `${props.value} is not valid rating `,
      },
    },
    shipping: {
      type: Number,
      default: 0,
      validate: {
        validator: (v) => {
          v >= 0;
        },
        message: (props) =>
          `${props.value} is not valid cost.Cost must be greater than or equal 0. `,
      },
    },
    varsity: {
      type: Schema.Types.ObjectId,
      ref: "Varsity",
      required: [true, "Please select/type a varsity for this product"],
    },

    image: {
      type: String,
      default: defaultImagePath,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please select/type a category for this product"],
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

module.exports = {
  Product,
};

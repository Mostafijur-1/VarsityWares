const createError = require("http-errors");
const { successResponse } = require("./responseHandler");
const { Product } = require("../models/productModel");
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../services/productServices");
const { deleteImage } = require("../helpers/deleteImage");
const cloudinary = require("../configs/cloudinary");
const {
  publicId,
  deleteFilefromCloudinary,
} = require("../helpers/cloudinaryHelper");

const handleCreateProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      sold,
      shipping,
      varsity,
      category,
      rating,
    } = req.body;
    let image = req.file?.path;
    console.log(image);

    if (!image) {
      throw createError(404, "Image not found");
    }
    if (image.size > 1024 * 1024 * 2) {
      throw createError(413, "Image size exceeds. Expected less than 2 MB ");
    }

    const newProduct = {
      name,
      description,
      price,
      quantity,
      sold,
      shipping,
      varsity,
      category,
      rating,
    };

    if (image) {
      newProduct.image = image;
    }

    const existProduct = await Product.find({ name });

    if (existProduct.length > 0) {
      return next(createError(400, "Product already exists"));
    }

    if (image) {
      const response = await cloudinary.uploader.upload(newProduct.image, {
        folder: "varsitywares/products",
      });
      newProduct.image = response.secure_url;
    }

    const createdProduct = await createProduct(newProduct);

    return successResponse(res, {
      statusCode: 201,
      message: "Product created successfully",
      payload: createdProduct,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetProducts = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const varsity = req.query.varsity || "";
    const category = req.query.category || "";
    const priceRange = req.query.priceRange
      ? req.query.priceRange.split(",").map(Number)
      : [0, 1000];

    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const filter = {
      $or: [{ name: { $regex: searchRegExp } }],
      price: { $gte: priceRange[0], $lte: priceRange[1] },
    };

    if (varsity) {
      filter.varsity = varsity;
    }

    if (category) {
      filter.category = category;
    }

    const products = await getProducts(page, limit, filter);
    const count = await Product.find(filter).countDocuments();

    return successResponse(res, {
      statusCode: 200,
      message: "Products fetched successfully",
      payload: {
        products,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page > 1 ? page - 1 : null,
          nextPage: page * limit < count ? page + 1 : null,
          totalProducts: count,
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

const handleGetProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await getProduct(slug);
    if (product.length === 0) {
      return next(createError(404, "Product not found"));
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Product fetched successfully",
      payload: product,
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdateProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await getProduct(slug);
    console.log(product);

    const options = { new: true, runValidators: true, context: "query" };
    let updates = {};

    const fieldsToUpdate = [
      "name",
      "description",
      "price",
      "quantity",
      "sold",
      "shipping",
      "varsity",
      "category",
      "rating",
    ];

    for (let key in req.body) {
      if (fieldsToUpdate.includes(key)) {
        updates[key] = req.body[key];
      }
    }

    const image = req.file?.path;
    console.log(image);
    if (image) {
      if (image.size > 1024 * 1024 * 2) {
        throw createError(413, "Image size exceeds. Expected less than 2 MB ");
      }
      const response = await cloudinary.uploader.upload(image, {
        folder: "varsitywares/products",
      });
      updates.image = response.secure_url;
    }

    const updatedProduct = await updateProduct(slug, updates, options);

    if (!updatedProduct) {
      throw createError(404, "Product not found");
    }

    if (product.image) {
      const publicID = await publicId(product.image);
      await deleteFilefromCloudinary("varsitywares/products", publicID);
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Products successfully updated",
      payload: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

const handleDeleteProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;
    console.log(slug);

    const deletedProduct = await deleteProduct(slug);

    console.log(deletedProduct);

    if (!deletedProduct) {
      throw createError(404, "Product not found");
    }

    if (deletedProduct.image) {
      const publicID = await publicId(deletedProduct.image);
      console.log(publicID);
      await deleteFilefromCloudinary("varsitywares/products", publicID);
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleCreateProduct,
  handleGetProducts,
  handleGetProduct,
  handleUpdateProduct,
  handleDeleteProduct,
};

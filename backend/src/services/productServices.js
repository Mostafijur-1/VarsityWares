const slugify = require("slugify");
const { Product } = require("../models/productModel");

const createProduct = async (product) => {
  const newProduct = await Product.create({
    ...product,
    slug: slugify(product.name),
  });

  return newProduct;
};

const getProducts = async (page = 1, limit = 4, filter = {}) => {
  return await Product.find(filter)
    .populate("category")
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });
};

const getProduct = async (slug) => {
  return await Product.findOne({ slug }).lean();
};

const updateProduct = async (slug, updates, options) => {
  if (updates.name) {
    updates.slug = slugify(updates.name);
  }
  const updatedProduct = await Product.findOneAndUpdate(
    { slug },
    updates,
    options
  );

  return updatedProduct;
};

const deleteProduct = async (slug) => {
  return await Product.findOneAndDelete({ slug });
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};

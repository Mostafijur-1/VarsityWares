const slugify = require("slugify");
const { Category } = require("../models/categoryModel");

const createCategory = async (name) => {
  const newCategory = await Category.create({
    name: name,
    slug: slugify(name),
  });

  return newCategory;
};

const getCategories = async () => {
  return await Category.find({}).select("name slug").lean();
};

const getCategory = async (slug) => {
  return await Category.find({ slug }).select("name slug").lean();
};

const updateCategory = async (slug, name) => {
  const filter = { slug };
  const updates = { $set: { name, slug: slugify(name) } };
  const options = { new: true };
  return await Category.findOneAndUpdate(filter, updates, options);
};

const deleteCategory = async (slug) => {
  return await Category.findOneAndDelete({ slug });
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};

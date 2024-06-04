const createError = require("http-errors");
const { successResponse } = require("./responseHandler");
const { Category } = require("../model/categoryModel");
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryServices");

const handleCreateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const existCategory = await Category.find({ name });
    console.log(existCategory);

    if (existCategory.length > 0) {
      return next(createError(400, "Category already exists"));
    }

    await createCategory(name);

    return successResponse(res, {
      statusCode: 201,
      message: "Category created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const handleGetCategories = async (req, res, next) => {
  const categories = await getCategories();

  return successResponse(res, {
    statusCode: 200,
    message: "Categories fetched successfully",
    payload: categories,
  });
};

const handleGetCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const category = await getCategory(slug);
    if (category.length === 0) {
      return next(createError(404, "Category not found"));
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Category fetched successfully",
      payload: category,
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdateCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { name } = req.body;

    const updatedCategory = await updateCategory(slug, name);
    if (!updatedCategory) {
      throw createError(404, "No Category found");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Category updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const handleDeleteCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const deletedCategory = await deleteCategory(slug);

    if (!deletedCategory) {
      throw createError(404, "No Category found");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleCreateCategory,
  handleGetCategories,
  handleGetCategory,
  handleUpdateCategory,
  handleDeleteCategory,
};

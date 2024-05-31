const createError = require("http-errors");
const { successResponse } = require("./responseHandler");
const { Varsity } = require("../models/varsityModel");
const {
  createVarsity,
  getVarsities,
  getVarsity,
  updateVarsity,
  deleteVarsity,
} = require("../services/varsityServices");

const handleCreateVarsity = async (req, res, next) => {
  try {
    const { name } = req.body;

    const existVarsity = await Varsity.find({ name });
    console.log(existVarsity);

    if (existVarsity.length > 0) {
      return next(createError(400, "Varsity already exists"));
    }

    await createVarsity(name);

    return successResponse(res, {
      statusCode: 201,
      message: "Varsity created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const handleGetVarsities = async (req, res, next) => {
  const categories = await getVarsities();

  return successResponse(res, {
    statusCode: 200,
    message: "Varcities fetched successfully",
    payload: categories,
  });
};

const handleGetVarsity = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const Varsity = await getVarsity(slug);
    if (Varsity.length === 0) {
      return next(createError(404, "Varsity not found"));
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Varsity fetched successfully",
      payload: Varsity,
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdateVarsity = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { name } = req.body;

    const updatedVarsity = await updateVarsity(slug, name);
    if (!updatedVarsity) {
      throw createError(404, "No Varsity found");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Varsity updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const handleDeleteVarsity = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const deletedVarsity = await deleteVarsity(slug);

    if (!deletedVarsity) {
      throw createError(404, "No Varsity found");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Varsity deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleCreateVarsity,
  handleGetVarsities,
  handleGetVarsity,
  handleUpdateVarsity,
  handleDeleteVarsity,
};

const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const { successResponse } = require("./responseHandler");
const { findWithId } = require("../services/findItem");
const { deleteImage } = require("../helpers/deleteImage");
const { createJWT } = require("../helpers/jsonWebToken");
const { jwtSecret, clientURL } = require("../secret");
const emailNodeMailer = require("../helpers/email");
const cloudinary = require("../configs/cloudinary");
const { publicId } = require("../helpers/cloudinaryHelper");

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };

    const options = { password: 0 };

    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);

    if (!users) {
      throw createError(404, "User not found");
    }
    const count = await User.find(filter).countDocuments();

    return successResponse(res, {
      statusCode: 200,
      message: "Users successfully returned",
      payload: {
        users,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };

    const user = await findWithId(User, id, options);
    if (!user) {
      throw createError(404, "item not found with this id");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "User successfully returned",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);
    if (!user) {
      throw createError(404, "User does not exist with this id");
    }

    if (user.image) {
      const publicID = await publicId(user.image);
      console.log(publicID);
      await deleteFilefromCloudinary("varsitywares/users", publicID);
    }

    await User.findByIdAndDelete({
      _id: id,
      isAdmin: false,
    });

    return successResponse(res, {
      statusCode: 204,
      message: "User successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};

const processRegister = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const image = req.file?.path;
    console.log(image);

    if (!image) {
      throw createError(404, "Image not found");
    }
    if (image.size > 1024 * 1024 * 2) {
      throw createError(413, "Image size exceeds. Expected less than 2 MB ");
    }

    const newUser = {
      name,
      email,
      password,
      phone,
      address,
    };

    if (image) {
      newUser.image = image;
    }

    const userExists = await User.exists({ email: email });
    if (userExists) {
      throw createError(409, "User already exists. Please Login");
    }

    const token = createJWT(newUser, jwtSecret, "10m");
    const emailData = {
      email,
      subject: "",
      html: `
        <h2>Hello ${name} !</h2>
        <p> Please click here to <a href="${clientURL}/api/users/activate/${token}" target="_blank"> activate your account</p>
      `,
    };

    try {
      await emailNodeMailer(emailData);
    } catch (error) {
      next(createError(500, "Failed to send email"));
      return;
    }

    return successResponse(res, {
      statusCode: 201,
      message: `please go to your ${email} for completing your registration`,
      payload: token,
    });
  } catch (error) {
    next(error);
  }
};
const activateUserAccount = async (req, res, next) => {
  try {
    const token = req.body.token;
    if (!token) {
      throw createError(404, "Token not found");
    }

    const decodedData = jwt.verify(token, jwtSecret);
    if (!decodedData) {
      throw createError(401, "User not verified");
    }

    const image = decodedData.image;
    if (image) {
      const response = await cloudinary.uploader.upload(image, {
        folder: "varsitywares/users",
      });
      decodedData.image = response.secure_url;
    }

    await User.create(decodedData);

    return successResponse(res, {
      statusCode: 201,
      message: "User activated successfully",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      error = createError(401, "Token expired");
    } else if (error.name === "JsonWebTokenError") {
      error = createError(401, "Invalid token");
    }
    // Consider logging the error for debugging
    console.error(error);
    next(error);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const option = { password: 0 };
    const user = await findWithId(User, id, option);

    const options = { new: true, runValidators: true, context: "query" };
    let updates = {};

    for (let key in req.body) {
      if (["name", , "password", "phone", "address"].includes(key)) {
        updates[key] = req.body[key];
      } else if (["email"].includes(key)) {
        throw new Error("Email cannot be updated");
      }
    }

    const image = req.file?.path;
    if (image) {
      if (image.size > 1024 * 1024 * 2) {
        throw createError(413, "Image size exceeds. Expected less than 2 MB ");
      }
      const response = await cloudinary.uploader.upload(image, {
        folder: "varsitywares/users",
      });
      updates.image = response.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updates,
      options
    ).select("-password");

    if (!updatedUser) {
      throw createError(404, "User not found");
    }

    if (user.image) {
      const publicID = await publicId(user.image);
      await deleteFilefromCloudinary("varsitywares/users", publicID);
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Users successfully updated",
      payload: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  deleteUserById,
  processRegister,
  activateUserAccount,
  updateUserById,
};

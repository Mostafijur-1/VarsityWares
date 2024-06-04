const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../model/user");
const { successResponse } = require("./responseHandler");
const { jwtAccessKey } = require("../secret");
const { createJWT } = require("../helpers/jsonWebToken");
const { handleUserAction } = require("../services/userServices");

const handleLogin = async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      throw createError(
        404,
        "User not found with this phone Number. Please Register at first."
      );
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw createError(404, "phone/password mismatch");
    }
    if (user.isBanned) {
      throw createError(
        403,
        "Your account is banned,please contact administrator"
      );
    }

    const accessToken = createJWT({ user }, jwtAccessKey, "20m");
    res.cookie("accessToken", accessToken, {
      maxAge: 20 * 60 * 1000,
      httpOnly: true,
      // secure: true,
      sameSite: "none",
    });

    const refreshToken = createJWT({ user }, jwtAccessKey, "7d");
    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      // secure: true,
      sameSite: "none",
    });

    const userSecured = await User.findOne({ phone }).select("-password");
    return successResponse(res, {
      statusCode: 200,
      message: "User LoggedIn successfully",
      payload: userSecured,
    });
  } catch (error) {
    next(error);
  }
};

const handleLogout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");

    return successResponse(res, {
      statusCode: 200,
      message: "User LoggedOut successfully",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

const handleUserStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const action = req.body.action;
    const options = { new: true, runValidators: true, context: "query" };

    const statusMessage = await handleUserAction(id, action, options);

    console.log(statusMessage);

    return successResponse(res, {
      statusCode: 204,
      message: statusMessage,
    });
  } catch (error) {
    next(error);
  }
};

const handleRefreshToken = async (req, res, next) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;

    const decodedToken = jwt.verify(oldRefreshToken, jwtAccessKey);
    if (!decodedToken) {
      throw createError(401, "Unauthorized");
    }

    console.log(decodedToken.user);

    const accessToken = createJWT(decodedToken.user, jwtAccessKey, "20m");
    res.cookie("accessToken", accessToken, {
      maxAge: 20 * 60 * 1000,
      httpOnly: true,
      // secure: true,
      sameSite: "none",
    });

    return successResponse(res, {
      statusCode: 200,
      message: "New access token generated",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

const handleProtectedRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    const decodedToken = jwt.verify(accessToken, jwtAccessKey);
    if (!decodedToken) {
      throw createError(401, "Unauthorized");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "protected resource accessed successfully",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleLogin,
  handleLogout,
  handleUserStatus,
  handleRefreshToken,
  handleProtectedRoute,
};

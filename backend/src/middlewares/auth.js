const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { jwtAccessKey } = require("../secret");

const isLoggedIn = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      throw createError(404, "Access token missing. Please login again");
    }
    const decoded = jwt.verify(accessToken, jwtAccessKey);

    if (!decoded) {
      throw createError(401, "Invalid Access token. Please login again");
    }
    req.user = decoded.user;
    console.log("isLoggedIn Worked");
    next();
  } catch (error) {
    return next(error);
  }
};

const isLoggedOut = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, jwtAccessKey);
        if (decoded) {
          throw createError(400, "User is already logged In");
        }
      } catch (error) {
        throw error;
      }
    }
    next();
  } catch (error) {
    return next(error);
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      throw createError(
        403,
        "Restricted. You must be an admin to view this page"
      );
    }
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { isLoggedIn, isLoggedOut, isAdmin };

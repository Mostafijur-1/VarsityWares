const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  next();
});

exports.isSeller = catchAsyncErrors(async (req, res, next) => {
  const { seller_token } = req.cookies;
  if (!seller_token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

  req.seller = await Shop.findById(decoded.id);

  next();
});

exports.isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`${req.user.role} can not access this resources!`)
      );
    }
    next();
  };
};

// const createError = require("http-errors");
// const jwt = require("jsonwebtoken");
// const { jwtAccessKey } = require("../secret");

// const isLoggedIn = (req, res, next) => {
//   try {
//     const accessToken = req.cookies.accessToken;

//     if (!accessToken) {
//       throw createError(404, "Access token missing. Please login again");
//     }
//     const decoded = jwt.verify(accessToken, jwtAccessKey);

//     if (!decoded) {
//       throw createError(401, "Invalid Access token. Please login again");
//     }
//     req.user = decoded.user;
//     console.log("isLoggedIn Worked");
//     next();
//   } catch (error) {
//     return next(error);
//   }
// };

// const isLoggedOut = (req, res, next) => {
//   try {
//     const accessToken = req.cookies.accessToken;
//     if (accessToken) {
//       try {
//         const decoded = jwt.verify(accessToken, jwtAccessKey);
//         if (decoded) {
//           throw createError(400, "User is already logged In");
//         }
//       } catch (error) {
//         throw error;
//       }
//     }
//     next();
//   } catch (error) {
//     return next(error);
//   }
// };

// const isAdmin = (req, res, next) => {
//   try {
//     if (!req.user.isAdmin) {
//       throw createError(
//         403,
//         "Restricted. You must be an admin to view this page"
//       );
//     }
//     next();
//   } catch (error) {
//     return next(error);
//   }
// };

// module.exports = { isLoggedIn, isLoggedOut, isAdmin };

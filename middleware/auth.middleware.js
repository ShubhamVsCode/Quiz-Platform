const User = require("../model/user.model");
const JWT = require("jsonwebtoken");
const asyncHandler = require("../services/asyncHandler");
const CustomError = require("../utils/customError");

const isLoggedIn = asyncHandler(async (req, _res, next) => {
  let token;

  //   console.log("Req Cookies", req.cookies);
  if (
    req.cookies?.token ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer"))
  ) {
    token = req.cookies?.token || req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new CustomError("Not authorized to access this route", 401);
  }

  try {
    const decodedJwtPayload = JWT.verify(token, process.env.JWT_SECRET);
    //_id, find user based on id, set this in req.user
    req.user = await User.findById(decodedJwtPayload._id, "name email role");
    next();
  } catch (error) {
    throw new CustomError("Not authorized to access this route", 401);
  }
});

module.exports = { isLoggedIn };

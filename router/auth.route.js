const express = require("express");
const {
  getProfile,
  signUp,
  login,
  logout,
} = require("../controllers/auth.controller");
const { isLoggedIn } = require("../middleware/auth.middleware");

const authRoute = express.Router();

authRoute.get("/", isLoggedIn, getProfile);
authRoute.post("/signup", signUp);
authRoute.post("/login", login);
authRoute.get("/logout", logout);

module.exports = authRoute;

const express = require("express");
const {
  getOption,
  createOption,
  updateOption,
  deleteOption,
} = require("../controllers/quizController/option.controller");
const { isLoggedIn } = require("../middleware/auth.middleware");

const optionRoute = express.Router();

optionRoute.get("/:option_id", isLoggedIn, getOption);
optionRoute.post("/", isLoggedIn, createOption);
optionRoute.put("/:option_id", isLoggedIn, updateOption);
optionRoute.delete("/:option_id", isLoggedIn, deleteOption);

module.exports = optionRoute;

const express = require("express");
const {
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/quizController/question.controller");
const { isLoggedIn } = require("../middleware/auth.middleware");

const questionRoute = express.Router();

questionRoute.get("/:question_id", isLoggedIn, getQuestion);
questionRoute.post("/", isLoggedIn, createQuestion);
questionRoute.put("/:question_id", isLoggedIn, updateQuestion);
questionRoute.delete("/:question_id", isLoggedIn, deleteQuestion);

module.exports = questionRoute;

const express = require("express");
const {
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getFullQuestion,
} = require("../controllers/quizController/question.controller");
const { isLoggedIn } = require("../middleware/auth.middleware");

const questionRoute = express.Router();

questionRoute.get("/:question_id", isLoggedIn, getFullQuestion);
questionRoute.post("/", isLoggedIn, createQuestion); //TODO: isLoggedIn is not there please keep that for production
questionRoute.put("/:question_id", isLoggedIn, updateQuestion);
questionRoute.delete("/:question_id", isLoggedIn, deleteQuestion);

module.exports = questionRoute;

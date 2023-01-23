const express = require("express");
const {
  createQuiz,
  updateQuiz,
  getQuiz,
  deleteQuiz,
} = require("../controllers/quiz.controller");
const { isLoggedIn } = require("../middleware/auth.middleware");

const quizRoute = express.Router();

quizRoute.get("/:quiz_id", isLoggedIn, getQuiz);
quizRoute.post("/", isLoggedIn, createQuiz);
quizRoute.put("/:quiz_id", isLoggedIn, updateQuiz);
quizRoute.delete("/:quiz_id", isLoggedIn, deleteQuiz);

module.exports = quizRoute;

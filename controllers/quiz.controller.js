const Quiz = require("../model/quiz.model");
const asyncHandler = require("../services/asyncHandler");
const CustomError = require("../utils/customError");

const getQuiz = asyncHandler(async (req, res) => {
  try {
    const { quiz_id } = req.params;
    if (!quiz_id) throw new CustomError("Quiz ID not provided", 401);

    const quiz = await Quiz.findById(quiz_id);

    if (!quiz) throw new CustomError("Quiz is not available", 400);

    res.status(200).json(quiz);
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
});

const createQuiz = asyncHandler(async (req, res) => {
  try {
    let { quiz_name, questions, quiz_image, quiz_difficulty } = req.body;

    if (!quiz_name) throw new CustomError("Quiz Name is required", 401);
    if (questions.length === 0)
      throw new CustomError("Questions are required", 401);

    if (!quiz_difficulty) {
      quiz_difficulty = 5;
    }

    const quiz = await Quiz.create({
      quiz_name,
      questions,
      quiz_image,
      quiz_difficulty,
    });

    if (!quiz) throw new CustomError("Quiz cannot be created", 500);

    res.status(201).json(quiz);
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
});

const updateQuiz = asyncHandler(async (req, res) => {
  try {
    const { quiz_id } = req.params;
    if (!quiz_id) throw new CustomError("Quiz ID not provided", 401);

    let { quiz_name, questions, quiz_image, quiz_difficulty } = req.body;

    const quiz = await Quiz.findByIdAndUpdate(
      quiz_id,
      {
        quiz_name,
        quiz_difficulty,
        quiz_image,
      },
      { new: true }
    );

    if (!quiz) throw new CustomError("Quiz updation failed", 400);

    res.status(200).json(quiz);
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
});

const deleteQuiz = asyncHandler(async (req, res) => {
  try {
    const { quiz_id } = req.params;
    if (!quiz_id) throw new CustomError("Quiz ID not provided", 401);

    const quiz = await Quiz.findByIdAndDelete(quiz_id);

    if (!quiz) throw new CustomError("Quiz deletion failed", 400);

    res.status(200).json({
      message: "Quiz deleted successfully",
    });
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
});

module.exports = {
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
};

const Question = require("../../model/quizModel/question.model");
const asyncHandler = require("../../services/asyncHandler");
const CustomError = require("../../utils/customError");

const getQuestion = asyncHandler(async (req, res) => {
  try {
    const { question_id } = req.params;
    if (!question_id) throw new CustomError("Question ID not provided", 401);

    const question = await Question.findById(question_id);

    if (!question) throw new CustomError("Quiz is not available", 400);

    res.status(200).json(question);
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
});

const createQuestion = asyncHandler(async (req, res) => {
  try {
    let {
      question_text,
      options,
      solution,
      question_image,
      question_difficulty,
    } = req.body;

    if (!question_text) throw new CustomError("Question Name is required", 401);
    if (options.length === 0)
      throw new CustomError("Options are required", 401);

    const question = await Question.create({
      question_text,
      options,
      solution,
      question_image,
      question_difficulty,
    });

    if (!question) throw new CustomError("Question creation failed", 500);

    res.status(201).json(question);
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
});

const updateQuestion = asyncHandler(async (req, res) => {
  try {
    const { question_id } = req.params;
    if (!question_id) throw new CustomError("Question ID not provided", 401);

    let { question_text, solution, question_difficulty, question_image } =
      req.body;

    const quiz = await Question.findByIdAndUpdate(
      question_id,
      {
        question_text,
        solution,
        question_difficulty,
        question_image,
      },
      { new: true }
    );

    if (!quiz) throw new CustomError("Question updation failed", 400);

    res.status(200).json(quiz);
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
});

const deleteQuestion = asyncHandler(async (req, res) => {
  try {
    const { question_id } = req.params;
    if (!question_id) throw new CustomError("Question ID not provided", 401);

    const question = await Question.findByIdAndDelete(question_id);

    if (!question) throw new CustomError("Question deletion failed", 400);

    res.status(200).json({
      message: "Question deleted successfully",
    });
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
});

module.exports = {
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};

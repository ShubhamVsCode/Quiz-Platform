const mongoose = require("mongoose");
const { Schema } = mongoose;

const OptionModel = new Schema({
  option_text: {
    type: String,
    required: [true, "Option text is required"],
  },
  is_correct: {
    type: Boolean,
    default: false,
  },
  option_image: {
    type: String,
  },
});

const SolutionModel = new Schema({
  solution_text: {
    type: String,
  },
  solution_image: {
    type: String,
  },
  solution_document: {
    type: String,
  },
  solution_video: {
    type: String,
  },
});

const QuestionModel = new Schema({
  question_text: {
    type: String,
    required: true,
  },
  options: {
    type: [OptionModel],
    required: [true, "Options are required"],
  },
  solution: {
    type: SolutionModel,
  },
  question_image: {
    type: String,
  },
  question_difficulty: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
});

const QuizModel = new Schema({
  quiz_name: {
    type: String,
    required: [true, "Quiz Name is required"],
  },
  questions: {
    type: [QuestionModel],
    required: [true, "Questions are required"],
  },
  quiz_image: {
    type: String,
  },
  quiz_difficulty: {
    type: String,
    enum: ["EASY", "MEDIUM", "HARD"],
  },
});

module.exports = mongoose.model("Quiz", QuizModel);

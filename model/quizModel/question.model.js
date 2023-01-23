const mongoose = require("mongoose");
const { Schema } = mongoose;

const SolutionModel = new Schema({
  solution_text: {
    type: String,
    default: "",
  },
  solution_image: {
    type: String,
    default: "",
  },
  solution_document: {
    type: String,
    default: "",
  },
  solution_video: {
    type: String,
    default: "",
  },
});

const QuestionModel = new Schema({
  question_text: {
    type: String,
    required: true,
  },
  options: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Option",
    required: [true, "Options are required"],
  },
  solution: {
    type: SolutionModel,
    default: "",
  },
  question_image: {
    type: String,
    default: "",
  },
  question_difficulty: {
    type: Number,
    min: [1, "Must be at least 1, got {VALUE}"],
    max: 10,
    default: 5,
  },
});

module.exports = mongoose.model("Question", QuestionModel);

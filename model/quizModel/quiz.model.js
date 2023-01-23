const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuizModel = new Schema({
  quiz_name: {
    type: String,
    required: [true, "Quiz Name is required"],
  },
  questions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Question",
  },
  quiz_image: {
    type: String,
  },
  quiz_difficulty: {
    type: String,
    enum: ["EASY", "MEDIUM", "HARD"],
  },
  quiz_type: {
    type: String,
    enum: ["SINGLE_CORRECT", "MULTIPLE_CORRECT"],
  },
});

module.exports = mongoose.model("Quiz", QuizModel);

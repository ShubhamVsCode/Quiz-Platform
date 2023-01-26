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
    default: "",
  },
  quiz_difficulty: {
    type: String,
    enum: ["EASY", "MEDIUM", "HARD"],
    default: "MEDIUM",
  },
  quiz_type: {
    type: String,
    enum: ["SINGLE_CORRECT", "MULTIPLE_CORRECT"],
    default: "SINGLE_CORRECT",
  },
  is_published: {
    type: Boolean,
    default: false,
  },
  is_live: {
    type: Boolean,
    default: false,
  },
  quiz_date: {
    type: {
      start: Date,
      end: Date,
    },
  },
});

module.exports = mongoose.model("Quiz", QuizModel);

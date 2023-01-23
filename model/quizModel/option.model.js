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
    default: "",
  },
});

module.exports = mongoose.model("Option", OptionModel);

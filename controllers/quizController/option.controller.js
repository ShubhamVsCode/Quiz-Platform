const Option = require("../../model/quizModel/option.model");
const asyncHandler = require("../../services/asyncHandler");
const CustomError = require("../../utils/customError");

const getOption = asyncHandler(async (req, res) => {
  try {
    const { option_id } = req.params;
    if (!option_id) throw new CustomError("Option ID not provided", 401);

    const option = await Option.findById(option_id);

    if (!option) throw new CustomError("Option is not available", 400);

    res.status(200).json(option);
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
});

const createOption = asyncHandler(async (req, res) => {
  try {
    const { option_text, is_correct, option_image } = req.body;

    if (!option_text) throw new CustomError("Option Text is required", 401);

    const option = await Option.create({
      option_text,
      is_correct,
      option_image,
    });

    if (!option) throw new CustomError("Option creation failed", 500);

    res.status(201).json(option);
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
});

const updateOption = asyncHandler(async (req, res) => {
  try {
    const { option_id } = req.params;
    if (!option_id) throw new CustomError("Option ID not provided", 401);

    let { option_text, is_correct, option_image } = req.body;

    const option = await Option.findByIdAndUpdate(
      option_id,
      {
        option_text,
        is_correct,
        option_image,
      },
      { new: true }
    );

    if (!option) throw new CustomError("Option updation failed", 400);

    res.status(200).json(option);
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
});

const deleteOption = asyncHandler(async (req, res) => {
  try {
    const { option_id } = req.params;
    if (!option_id) throw new CustomError("Option ID not provided", 401);

    const option = await Option.findByIdAndDelete(option_id);

    if (!option) throw new CustomError("Option deletion failed", 400);

    res.status(200).json({
      message: "Option deleted successfully",
    });
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
});

module.exports = {
  getOption,
  createOption,
  updateOption,
  deleteOption,
};

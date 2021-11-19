const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerForms = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cityName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    answers: [],
  },
  {
    timestamps: true,
  }
);

const answerForm = mongoose.model("answerForm", answerForms);
module.exports = answerForm;

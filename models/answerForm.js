const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerForms = new Schema(
  {
    anserForm: {
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
      answers: [
        {
          question: {
            type: String,
            required: true,
          },
          answer: {
            type: String,
            required: true,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const answerForm = mongoose.model("answerForm", answerForms);
module.exports = answerForm;

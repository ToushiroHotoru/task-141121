const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Answers = new Schema(
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
    quizzes: [],
    reasons: [],
    spectateAndResponsePersons: [],
  },
  {
    timestamps: true,
  }
);

const answer = mongoose.model("answer", Answers);
module.exports = answer;

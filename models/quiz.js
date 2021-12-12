const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Quizs = new Schema({
  note: {
    type: String,
    required: true,
  },
  responsePerson: String,
  spectatePerson: String,
});

const quiz = mongoose.model("quiz", Quizs);
module.exports = quiz;

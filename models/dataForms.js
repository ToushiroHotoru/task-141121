const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataForms = new Schema(
  {
    cityName: {
      type: String,
      required: true,
    },
    company: [
      {
        companyName: String,
        companyResponsePerson: String,
      },
    ],
    quizzes: [
      {
        quiz: String,
        spectatePerson: String,
        responsePerson: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const dataFrom = mongoose.model("dataFrom", dataForms);
module.exports = dataFrom;

const Answer = require("../models/answer");

const save_answer = async (req, res) => {
  const data = new Answer(req.body);
  try {
    await data.save();
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
  }
};

const get_answer = async (req, res) => {
  try {
    console.log(req.body.companyName);
    if (req.body.companyName != "Выберите салон") {
      const result = await Answer.find({
        companyName: req.body.companyName,
        cityName: req.body.cityName,
        createdAt: { $gte: req.body.gte, $lt: req.body.lt },
      });
      res.status(200).send(result);
    } else {
      const result = await Answer.find({
        cityName: req.body.cityName,
        createdAt: { $gte: req.body.gte, $lt: req.body.lt },
      });
      res.status(200).send(result);
    }
  } catch (err) {
    console.log(err);
    res.status(502);
  }
};

module.exports = {
  get_answer,
  save_answer,
};

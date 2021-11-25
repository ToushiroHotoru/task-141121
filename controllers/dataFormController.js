const DataForm = require("../models/DataForms");

const get_data = async (req, res) => {
  try {
    const data = await DataForm.find();
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

const add_data_city = async (req, res) => {
  const data = new DataForm(req.body);
  try {
    await data.save();
    res.status(200).json("success");
  } catch (err) {
    console.log(err);
  }
};

const edit_data_city = async (req, res) => {
  try {
    const id = req.body.cityId;
    const cityNewData = req.body.cityNewData;
    await DataForm.findOneAndUpdate(
      { _id: id },
      { $set: { cityName: cityNewData } }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
  }
};

const delete_data_city = async (req, res) => {
  try {
    const cityId = req.body.cityId;
    await DataForm.deleteOne({ _id: cityId });
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  get_data,
  add_data_city,
  edit_data_city,
  delete_data_city,
};

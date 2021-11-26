const DataForm = require("../models/DataForms");

const get_data = async (req, res) => {
  try {
    const data = await DataForm.find();
    res.send(data);
  } catch (err) {
    console.log(err.meassage);
  }
};

const add_data_city = async (req, res) => {
  const data = new DataForm(req.body);
  try {
    await data.save();
    res.status(200).json("success");
  } catch (err) {
    console.log(err.meassage);
  }
};

const edit_data_city = async (req, res) => {
  try {
    const id = req.body.cityId;
    const cityNewData = req.body.cityNewData;
    const result = await DataForm.updateOne(
      { _id: id },
      { cityName: cityNewData }
    );
    res.status(200).json({ success: result });
  } catch (err) {
    console.log(err.meassage);
  }
};

const delete_data_city = async (req, res) => {
  try {
    const cityId = req.body.cityId;
    await DataForm.deleteOne({ _id: cityId });
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err.meassage);
  }
};

const add_data_company = async (req, res) => {
  try {
    const id = req.body.cityId;
    const companyNewData = req.body.companyNewData;
    await DataForm.findOneAndUpdate(
      { _id: id },
      { $push: { company: { companyName: companyNewData } } }
    );
    res.status(200).json("success");
  } catch (err) {
    console.log(err.meassage);
  }
};

const edit_data_company = async (req, res) => {
  try {
    const company = await DataForm.findById(req.body.companyId);
    console.log(company.companyName);
    company.companyName = req.body.companyNewData;
    const result = await DataForm.save();
    res.status(200).json({ success: result });
  } catch (err) {
    console.log(err.meassage);
  }
};

const delete_data_company = async (req, res) => {
  const companyId = req.body.companyId;
  const id = req.body.id;
  console.log(companyId);
  try {
    await DataForm.updateOne({ _id: companyId }, { companyName: "" });
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err.meassage);
  }
};

module.exports = {
  get_data,
  add_data_city,
  edit_data_city,
  delete_data_city,
  add_data_company,
  edit_data_company,
  delete_data_company,
};

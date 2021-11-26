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
    const companyId = req.body.companyId;
    const companyMass = req.body.companyMass;
    const paladin = [{"companyName":"компания1","workers":[],"_id":"619f5eeac7a017b60b13690e"},{"companyName":"компания2","workers":[],"_id":"619f5eeac7a017b60b13690f"}];
    const result = await DataForm.updateOne(
      { _id: "619f9dfc1bd80e6f9cc35a90"},
      { company:{ "companyName":"paladin3"}}
     );
    res.status(200).json({ success: result });
    console.log("работает почти");
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

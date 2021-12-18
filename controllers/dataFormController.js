const DataForm = require("../models/dataForms");
const Watcher = require("../models/mainWatcher");

const get_watcher = async (req, res) => {
  try {
    const data = await Watcher.findOne();
    if (data) {
      res.send(data);
      console.log("Это не работает");
    } else {
      console.log("Это работает");
      res.status(200).json({ status: "false" });
    }
  } catch (err) {
    console.log(err._message);
  }
};

const create_watcher = async (req, res) => {
  const data = new Watcher(req.body);
  try {
    let result = await data.save();
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
};

const change_watcher = async (req, res) => {
  let name = req.body.name;
  try {
    const result = await Watcher.findOne({});
    result.name = name;
    result.save();

    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
};

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
    const id = req.body.id;
    const companyNewData = req.body.companyNewData;
    const result = await DataForm.findOne({ _id: id });
    result.company.push({ companyName: companyNewData, workers: [] });
    result.save();
    res.status(200).json({ success: result });
  } catch (err) {
    console.log(err.meassage);
  }
};

const edit_data_company = async (req, res) => {
  try {
    let companyOldName = req.body.companyOldName;
    let companyNewName = req.body.companyNewName;
    let id = req.body.id;
    let result = await DataForm.findOne({
      _id: id,
      companyName: companyOldName,
    });
    result.company.forEach((element) => {
      if (element.companyName == companyOldName) {
        element.companyName = companyNewName;
      }
    });
    await result.save();
    res.status(200).json({ success: result });
  } catch (err) {
    console.log(err.meassage);
  }
};

const delete_data_company = async (req, res) => {
  const companyId = req.body.companyId;
  try {
    const result = await DataForm.findOne({ "company._id": companyId });
    result.company.forEach((item, i) => {
      if (item._id == companyId) {
        result.company.splice(i, 1);
      }
    });
    result.save();
    res.status(200).json({ success: result });
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
  get_watcher,
  change_watcher,
  create_watcher,
};

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
    const id = req.body.id;
    const companyNewData = req.body.companyNewData;
    console.log(id);
    console.log(companyNewData);
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
      console.log(element);
    });
    await result.save();
    res.status(200).json({ success: result });
    console.log("работает почти");
  } catch (err) {
    console.log(err.meassage);
  }
};

const delete_data_company = async (req, res) => {
  const companyId = req.body.companyId;
  const companyOldName = req.body.companyOldName;
  console.log(companyId);
  console.log(companyOldName);
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

const add_data_worker = async (req, res) => {
  try {
    const id = req.body.id;
    const workerArrayId = req.body.workerArrayId;
    const workerNewName = req.body.workerNewName;
    const result = await DataForm.findOne({ _id: id });
    result.company.forEach((company, i) => {
      if (company["_id"] == workerArrayId) {
        company["workers"].push(workerNewName);
      }
    });
    result.save();
    res.status(200).json({ success: result });
  } catch (err) {
    console.log(err.meassage);
  }
};

const edit_data_worker = async (req, res) => {
  try {
    const id = req.body.id;
    const workerArrayId = req.body.workerArrayId;
    const workerOldName = req.body.workerOldName;
    const workerNewName = req.body.workerNewName;
    const result = await DataForm.findOne({ _id: id });
    result.company.forEach((company, i) => {
      if (company["_id"] == workerArrayId) {
        company["workers"].forEach((worker, i) => {
          if (worker == workerOldName) {
            company["workers"].splice(i, 1, workerNewName);
          }
        });
      }
    });
    result.save();
    res.status(200).json({ success: result });
  } catch (err) {
    console.log(err.meassage);
  }
};

const delete_data_worker = async (req, res) => {
  try {
    const id = req.body.id;
    const workerArrayId = req.body.workerArrayId;
    const workerOldName = req.body.workerOldName;
    const result = await DataForm.findOne({ _id: id });
    result.company.forEach((company, i) => {
      if (company["_id"] == workerArrayId) {
        company["workers"].forEach((worker, i) => {
          if (worker == workerOldName) {
            company["workers"].splice(i, 1);
          }
        });
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
  add_data_worker,
  edit_data_worker,
  delete_data_worker,
};

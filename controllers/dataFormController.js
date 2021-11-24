const DataForm = require("../models/DataForms");

const get_data = async (req, res) => {
  try {
    const data = await DataForm.find();
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

const create_data = async (req, res) => {
  const data = new DataForm(req.body);
  try {
    await data.save();
    res.status(200).json("success");
  } catch (err) {
    console.log(err);
  }
};

// const edit_data_name = async (req, res) => {
//   try {
//     const oldNameData = req.body.oldData;
//     const newNameData = req.body.newData;
//     await DataForm.findOneAndUpdate(
//       { name: oldNameData },
//       { $set: { name: newNameData } }
//     );
//     res.status(200).json({ success: true });
//   } catch (err) {
//     console.log(err);
//   }
// };

// const edit_data_salon = async (req, res) => {
//   try {
//     const oldSalonData = req.body.oldData;
//     const newSalonData = req.body.newData;
//     await DataForm.findOneAndUpdate(
//       { : oldNameData },
//       { $set: { name: newNameData } }
//     );
//     res.status(200).json({ success: true });
//   } catch (err) {
//     console.log(err);
//   }
// };

// const edit_data_name = async (req, res) => {
//   try {
//     const oldNameData = req.body.oldData;
//     const newNameData = req.body.newData;
//     await DataForm.findOneAndUpdate(
//       { name: oldNameData },
//       { $set: { name: newNameData } }
//     );
//     res.status(200).json({ success: true });
//   } catch (err) {
//     console.log(err);
//   }
// };

module.exports = {
  get_data,
  create_data,
  //   edit_data_name,
};

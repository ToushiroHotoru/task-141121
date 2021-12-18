const express = require("express");
const dataFormController = require("../controllers/dataFormController");

const router = express.Router();

const isAdminFunc = (req, res, next) => {
  if (req.body.isAdmin == "true") {
    console.log(req.body.isAdmin);
    next();
  } else {
    throw new Error("You don't have permission to these actions");
  }
};

router.get("/get-watcher", dataFormController.get_watcher);
router.post("/create-watcher", isAdminFunc, dataFormController.create_watcher);
router.post("/change-watcher", isAdminFunc, dataFormController.change_watcher);
router.post("/add-data-city", isAdminFunc, dataFormController.add_data_city);
router.post("/edit-data-city", isAdminFunc, dataFormController.edit_data_city);
router.delete(
  "/delete-data-city",
  isAdminFunc,
  dataFormController.delete_data_city
);
router.post(
  "/add-data-company",
  isAdminFunc,
  dataFormController.add_data_company
);
router.post(
  "/edit-data-company",
  isAdminFunc,
  dataFormController.edit_data_company
);
router.delete(
  "/delete-data-company",
  isAdminFunc,
  dataFormController.delete_data_company
);

module.exports = router;

const districtModel = require("../../schema/districts");
const returnMessage = require("../message");
const messages = require("../../lang/messages.json");
const authUser = require("../../utils/authUser");

module.exports = {
  index: async (req, res) => {
    try {
      const districts = await districtModel.find({
        state: req.body["state_id"],
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.getAlldistricts,
        districts
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const { name, state_id } = req.body;
      const isNameTaken = await districtModel.findOne({ name });
      if (isNameTaken)
        returnMessage.errorMessage(
          res,
          messages.errorMessages.districtAlreadyExists
        );

      let user = await authUser.getUser(req, res);
      const district = await districtModel.create({
        state: state_id,
        name: name,
        createdBy: user._id,
      });
      await district.populate({
        path: "state",
        select: ["name"],
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.adddistrict,
        district
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      const district = await districtModel.findOne({ _id: req.params["id"] });
      await district.populate({
        path: "state",
        select: ["name"],
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.showdistrict,
        district
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      let user = await authUser.getUser(req, res);
      const district = await districtModel.findByIdAndUpdate(
        req.params["id"],
        { ...req.body, updatedBy: user._id },
        { new: true }
      );
      await district.populate({
        path: "state",
        select: ["name"],
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.updatedistrict,
        district
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      const district = await districtModel.remove({ _id: req.params["id"] });
      returnMessage.successMessage(
        res,
        messages.successMessages.deletedistrict,
        district
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const district = await districtModel.findOne({ _id: req.params["id"] });
      await district.populate({
        path: "state",
        select: ["name"],
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.showdistrict,
        district
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};

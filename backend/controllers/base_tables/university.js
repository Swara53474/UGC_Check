const universityModel = require("../../schema/universities");
const returnMessage = require("../message");
const messages = require("../../lang/messages.json");
const authUser = require("../../utils/authUser");



module.exports = {
  index: async (req, res) => {
    try {
      const universities = await universityModel.find({});
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllCountries,
        universities
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const { name } = req.body;
      const isNameTaken = await universityModel.findOne({ name });
      if (isNameTaken)
        returnMessage.errorMessage(
          res,
          messages.errorMessages.countryAlreadyExists
        );

      let user = await authUser.getUser(req, res);
      const university = await universityModel.create({
        ...req.body,
        createdBy: user._id,
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.addCountry,
        university
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      const university = await universityModel.findOne({
        _id: req.params["id"],
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.showCountry,
        university
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      let user = await authUser.getUser(req, res);
      const university = await universityModel.findByIdAndUpdate(
        req.params["id"],
        { ...req.body, updatedBy: user._id }
      );
      returnMessage.successMessage(
        res,
        messages.successMessages.updateCountry,
        university
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      const university = await universityModel.remove({
        _id: req.params["id"],
      });
      returnMessage.successMessage(res, messages.successMessages.deleteCountry);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const university = await universityModel.findOne({
        _id: req.params["id"],
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.showCountry,
        university
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};

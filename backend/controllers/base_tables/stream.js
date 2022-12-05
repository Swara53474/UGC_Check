const streamModel = require("../../schema/streams");
const returnMessage = require("../message");
const messages = require("../../lang/messages.json");
const authUser = require("../../utils/authUser");

module.exports = {
  index: async (req, res) => {
    try {
      const streams = await streamModel.find({});
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllCountries,
        streams
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const { name } = req.body;
      const isNameTaken = await streamModel.findOne({ name });
      if (isNameTaken)
        returnMessage.errorMessage(
          res,
          messages.errorMessages.countryAlreadyExists
        );

      let user = await authUser.getUser(req, res);
      const stream = await streamModel.create({
        ...req.body,
        createdBy: user._id,
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.addCountry,
        stream
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      const stream = await streamModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(
        res,
        messages.successMessages.showCountry,
        stream
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      let user = await authUser.getUser(req, res);
      const stream = await streamModel.findByIdAndUpdate(req.params["id"], {
        ...req.body,
        updatedBy: user._id,
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.updateCountry,
        stream
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      const stream = await streamModel.remove({ _id: req.params["id"] });
      returnMessage.successMessage(res, messages.successMessages.deleteCountry);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const stream = await streamModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(
        res,
        messages.successMessages.showCountry,
        stream
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};

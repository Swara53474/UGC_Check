const returnMessage = require("../message");
const messages = require("../../lang/messages.json");
const transactionModel = require("../../schema/transactions");
const authUser = require("../../utils/authUser");

module.exports = {
  index: async (req, res) => {
    try {
      const transactions = await transactionModel.find();
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllStates,
        transactions
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const { name } = req.body;
      const isNameTaken = await transactionModel.findOne({ name });
      if (isNameTaken)
        returnMessage.errorMessage(
          res,
          messages.errorMessages.stateAlreadyExists
        );

      let user = await authUser.getUser(req, res);

      const transactions = await transactionModel.create({
        ...req.body,
        createdBy: user._id,
      });

      returnMessage.successMessage(
        res,
        messages.successMessages.addState,
        transactions
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      const transaction = await transactionModel.findOne({
        _id: req.params["id"],
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.showState,
        transaction
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      let user = await authUser.getUser(req, res);
      const transactions = await transactionModel.findByIdAndUpdate(
        req.params["id"],
        { ...req.body, updatedBy: user._id },
        { new: true }
      );
      returnMessage.successMessage(
        res,
        messages.successMessages.updateState,
        transactions
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      const transaction = await transactionModel.remove({
        _id: req.params["id"],
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.deleteState,
        transaction
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const transaction = await transactionModel.findOne({
        _id: req.params["id"],
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.showState,
        transaction
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};

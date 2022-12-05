const stateModel = require("../../schema/states");
const returnMessage = require("../message");
const messages = require("../../lang/messages.json");
const authUser = require("../../utils/authUser");

module.exports = {
  index: async (req, res) => {
    try {
      const states = await stateModel.find();
      states.forEach((state) => {
        state.populate({
          path: "country",
          select: ["name"],
        });
      });
      console.log(states);
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllStates,
        states
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const { name, country_id } = req.body;
      const isNameTaken = await stateModel.findOne({ name });
      if (isNameTaken)
        returnMessage.errorMessage(
          res,
          messages.errorMessages.stateAlreadyExists
        );

      let user = await authUser.getUser(req, res);
      const state = await stateModel.create({
        country: country_id,
        name: name,
        createdBy: user._id,
      });
      await state.populate({
        path: "country",
        select: ["name"],
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.addState,
        state
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      const state = await stateModel.findOne({ _id: req.params["id"] });
      await state.populate({
        path: "country",
        select: ["name"],
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.showState,
        state
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      let user = await authUser.getUser(req, res);
      const state = await stateModel.findByIdAndUpdate(
        req.params["id"],
        {
          country: req.body.country_id,
          name: req.body.name,
          updatedBy: user._id,
        },
        { new: true }
      );
      await state.populate({
        path: "country",
        select: ["name"],
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.updateState,
        state
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      const state = await stateModel.remove({ _id: req.params["id"] });
      returnMessage.successMessage(
        res,
        messages.successMessages.deletestate,
        state
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const state = await stateModel.findOne({ _id: req.params["id"] });
      await state.populate({
        path: "country",
        select: ["name"],
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.showstate,
        state
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};

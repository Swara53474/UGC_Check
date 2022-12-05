const heiModel = require("../schema/hei");
const returnMessage = require("./message");
const messages = require("../lang/messages.json");
const authUser = require("../utils/authUser");

// To populate the HEI object retrieved from Data Model
const heiPopulate = [
  {
    path: "country",
    select: ["name"],
  },
  {
    path: "state",
    select: ["name"],
  },
  {
    path: "district",
    select: ["name"],
  },
  {
    path: "spoc",
    select: ["firstName", "lastName", "email", "mobile", "gender"],
  },
  {
    path: "heiAdmin",
    select: ["firstName", "lastName", "email", "mobile", "gender"],
  },
  {
    path: "university",
    select: ["name", "admin"],
    populate: {
      path: "admin",
      select: ["firstName", "lastName", "email", "mobile", "gender"],
    },
  },
  {
    path: "streams",
    select: ["name"],
  },
];

module.exports = {
  index: async (req, res) => {
    try {
      const heis = await heiModel.find({});
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllheis,
        heis
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const { name } = req.body;
      const isNameTaken = await heiModel.findOne({ name });
      if (isNameTaken)
        returnMessage.errorMessage(res, messages.errorMessages.alreadyExists);

      let user = await authUser.getUser(req, res);
      const hei = await heiModel.create({ ...req.body, createdBy: user._id });
      await hei.populate(heiPopulate);
      returnMessage.successMessage(res, messages.successMessages.addHei, hei);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      const hei = await heiModel.findOne({ _id: req.params["id"] });
      await hei.populate(heiPopulate);
      returnMessage.successMessage(res, messages.successMessages.showHei, hei);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      let user = await authUser.getUser(req, res);
      const hei = await heiModel.findByIdAndUpdate(
        req.params["id"],
        { ...req.body, updatedBy: user._id },
        { new: true }
      );
      await hei.populate(heiPopulate);
      returnMessage.successMessage(
        res,
        messages.successMessages.updateHei,
        hei
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      const hei = await heiModel.remove({ _id: req.params["id"] });
      returnMessage.successMessage(res, messages.successMessages.deleteHei);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const hei = await heiModel.findOne({ _id: req.params["id"] });
      await hei.populate(heiPopulate);
      returnMessage.successMessage(res, messages.successMessages.showHei, hei);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};

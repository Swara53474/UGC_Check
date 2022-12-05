const phaseModel = require("../schema/phases");
const returnMessage = require("./message");
const messages = require("../lang/messages.json");

module.exports = {
  index: async(req,res) => {
    try {
      const phases = await phaseModel.find({});
      returnMessage.successMessage(res,messages.successMessages.getAllCountries,fundingAgencies);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  create: async (req, res) => {
    try {
      const phase = await phaseModel.create({ ...req.body });
      returnMessage.successMessage(res,messages.successMessages.addCountry,phase);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  edit: async(req,res) => {
    try {
      const phase = await phaseModel.findOne({_id: req.params['id'] })
      returnMessage.successMessage(res,messages.successMessages.showCountry, phase);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  },
  update: async(req,res) => {
    try {
      const phase = await phaseModel.findByIdAndUpdate(req.params['id'], { ...req.body });
      returnMessage.successMessage(res,messages.successMessages.updateCountry, phase);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  delete: async(req,res) => {
    try {
      const phase = await phaseModel.remove({ '_id': req.params['id'] });
      returnMessage.successMessage(res,messages.successMessages.deleteCountry);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  show: async(req,res) => {
    try {
      const phase = await phaseModel.findOne({_id: req.params['id'] })
      returnMessage.successMessage(res,messages.successMessages.showCountry, phase);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  }
};

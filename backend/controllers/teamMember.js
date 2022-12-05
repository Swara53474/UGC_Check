const teamMemberModel = require("../schema/teamMember");
const returnMessage = require("./message");
const messages = require("../lang/messages.json");

module.exports = {
  index: async(req,res) => {
    try {
      const teamMembers = await teamMemberModel.find({});
      returnMessage.successMessage(res,messages.successMessages.getAllCountries,teamMembers);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  create: async (req, res) => {
    try {
      const teamMember = await teamMemberModel.create({ ...req.body });
      returnMessage.successMessage(res,messages.successMessages.addCountry,teamMember);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  edit: async(req,res) => {
    try {
      const teamMember = await teamMemberModel.findOne({_id: req.params['id'] })
      returnMessage.successMessage(res,messages.successMessages.showCountry, teamMember);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  },
  update: async(req,res) => {
    try {
      const teamMember = await teamMemberModel.findByIdAndUpdate(req.params['id'], { ...req.body });
      returnMessage.successMessage(res,messages.successMessages.updateCountry, teamMember);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  delete: async(req,res) => {
    try {
      const teamMember = await teamMemberModel.remove({ '_id': req.params['id'] });
      returnMessage.successMessage(res,messages.successMessages.deleteCountry);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  show: async(req,res) => {
    try {
      const teamMember = await teamMemberModel.findOne({_id: req.params['id'] })
      returnMessage.successMessage(res,messages.successMessages.showCountry, teamMember);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  }
};

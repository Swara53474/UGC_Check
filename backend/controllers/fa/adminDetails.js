const fundingAgencyModel = require("../../schema/fundingAgency");
// const returnMessage = require("./../message");
const messages = require("../../lang/messages.json");
const authUser = require("../../utils/authUser")

// To populate the FA object retrieved from Data Model
const faPopulate = [
    {
        path: 'country',
        select: ['name'],
    },
    {
        path: 'state',
        select: ['name'],
    },
    {
        path: 'district',
        select: ['name'],
    },
    {
        path: 'admin',
        select: ['firstName','lastName','email','mobile','gender'],
    },
    {
        path: 'employees',
        select: ['firstName','lastName','email'],
    },
];

module.exports = {
  create: async (req, res) => {
    try {  
    let user = await authUser.getUser(req,res);
    const isFaTaken = await fundingAgencyModel.findOne({ admin: user._id});
      if (isFaTaken)
        // returnMessage.errorMessage(res,messages.errorMessages.alreadyExists)
        return res.status(200).json({
          message:"already exists"
        })

    const fa = await fundingAgencyModel.create({ ...req.body, admin: user._id });
    await fa.populate(faPopulate)
    return res.status(200).json({
        data: fa
    });
    // returnMessage.successMessage(res,messages.successMessages.showHei, hei);
    } catch (error) {
    //   returnMessage.errorMessage(res,error);
        return res.status(500).json({
            message: error
        })
    }
  },
  edit: async(req,res) => {
    try {
      let user = await authUser.getUser(req,res);
      const fa = await fundingAgencyModel.findOne({admin: user._id })
      await fa.populate(faPopulate)
      return res.status(200).json({
        data: fa
    });
    //   returnMessage.successMessage(res,messages.successMessages.showHei, hei);
    } catch(error) {
    //   returnMessage.errorMessage(res,error);
    return res.status(500).json({
        message: error
    })
    }
  },
  update: async(req,res) => {
    try {
      let user = await authUser.getUser(req,res);
      const fa = await fundingAgencyModel.findOneAndUpdate({admin: user._id}, { ...req.body }, {new: true});
      await fa.populate(faPopulate)
      return res.status(200).json({
        data: fa
    });
    //   returnMessage.successMessage(res,messages.successMessages.showHei, hei);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  show: async(req,res) => {
    try {
      let user = await authUser.getUser(req,res);
      const fa = await fundingAgencyModel.findOne({admin: user._id })
      await fa.populate(faPopulate)
      return res.status(200).json({
        data: fa
    });
    //   returnMessage.successMessage(res,messages.successMessages.showHei, hei);
    } catch(error) {
      //   returnMessage.errorMessage(res,error);
        return res.status(500).json({
            message: error
        })
    }
  }
};

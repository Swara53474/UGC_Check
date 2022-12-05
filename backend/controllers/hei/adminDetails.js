const heiModel = require("../../schema/hei");
// const returnMessage = require("./../message");
const messages = require("../../lang/messages.json");
const authUser = require("../../utils/authUser")
const userModel = require("../../schema/users");
const { verify } = require("jsonwebtoken");

// To populate the HEI object retrieved from Data Model
const heiPopulate = [
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
        path: 'spoc',
        select: ['firstName','lastName','email','mobile','gender'],
    },
    {
        path: 'heiAdmin',
        select: ['firstName','lastName','email','mobile','gender'],
    },
    {
        path: 'university',
        select: ['name', 'admin'],
        populate: {
            path: 'admin',
            select: ['firstName', 'lastName', 'email','mobile','gender']
        }
    },
    {
        path: 'streams',
        select: ['name']
    }
];

module.exports = {
  create: async (req, res) => {
    try {  
    let user = await authUser.getUser(req,res);
    const isHeiTaken = await heiModel.findOne({ heiAdmin: user._id});
      if (isHeiTaken)
        // returnMessage.errorMessage(res,messages.errorMessages.alreadyExists)
        return res.status(200).json({
          message:"already exists"
        })

    const hei = await heiModel.create({ ...req.body, heiAdmin: user._id });
    return res.status(200).json({
        data: hei
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
      const hei = await heiModel.findOne({heiAdmin: user._id })
      await hei.populate(heiPopulate)
      return res.status(200).json({
        data: hei
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
      const hei = await heiModel.findOneAndUpdate({heiAdmin: user._id}, { ...req.body }, {new: true});
      await hei.populate(heiPopulate)
      return res.status(200).json({
        data: hei
    });
    //   returnMessage.successMessage(res,messages.successMessages.showHei, hei);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  show: async(req,res) => {
    try {
      let user = await authUser.getUser(req,res);
      const hei = await heiModel.findOne({heiAdmin: user._id })
      await hei.populate(heiPopulate)
      return res.status(200).json({
        data: hei
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

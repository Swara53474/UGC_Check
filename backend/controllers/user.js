const userModel = require("../schema/users");
const roleModel = require("../schema/role");
const heiModel = require("../schema/hei");
const fundingAgencyModel = require("../schema/fundingAgency");
const returnMessages = require("./message");
const messages = require("../lang/messages.json");
const { hashPassword, signToken, verifyToken } = require("../utils");
const Mongoose = require("mongoose");
const verifiedUniversity = require("../schema/verifiedUniversityData");
const verifiedCollege = require("../schema/verifiedCollegeData");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASS
  }
});

async function redirectUser(user) {
  await user.populate({
    path: "role",
    select: ["name"],
  });
  console.log(user.role.name);
  if (user.role.name == "HEI Admin") {
    const hei = await heiModel.findOne({ heiAdmin: user._id });
    if (hei) {
      return {
        user_id: user._id,
        role: user.role.name,
        redirect: 0,
      };
    } else {
      return {
        user_id: user._id,
        role: user.role.name,
        redirect: 1,
      };
    }
  } else if (user.role.name == "FA Admin") {
    const fa = await fundingAgencyModel.findOne({ admin: user._id });
    if (fa) {
      return {
        user_id: user._id,
        role: user.role.name,
        redirect: 0,
      };
    } else {
      return {
        user_id: user._id,
        role: user.role.name,
        redirect: 1,
      };
    }
  } else {
    return {
      user_id: user._id,
      role: user.role.name,
    };
  }
}



module.exports = {
  register: async (req, res) => {
    try {
      const { password, email, collegeName} = req.body;

      const isFoundCollege = await verifiedCollege.findOne({collegeName:collegeName});

      if(isFoundCollege)
        return res.status(400).json({message:"College Already Registered"});

      const isEmailTaken = await userModel.findOne({ email });

      if (isEmailTaken)
        return res.status(400).json({ message: "Email already exists" });

      const { salt, hash } = hashPassword(password);

      delete req.body.password;

      const role = await roleModel.findOne({ name: "hei-admin" }, { _id: 1 });
        
      var mailOptions = {
        from: 'cmpn.20102a0032@gmail.com',
        to: email,
        subject: 'Registration Successful',
        text: "College Successfully registered on UGC Checked portal. The email for login is: "+email,
      };

      transporter.sendMail(mailOptions, function(error, info){
        if(error){
          console.log(error.message);
        }else{
          console.log(info.response);
        }
      });

      userModel.create({ ...req.body, salt, hash, role });
      res.status(201).json({
        message: "User registered",
        token: signToken({ email: req.body.email }),
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },
  login: async (req, res) => {
    try {
      const { password, email } = req.body;

      const userData = await userModel.findOne({ email });

      if (!userData)
        return res.status(400).json({ message: "User is not registered" });

      const hashedPass = hashPassword(password, userData.salt);

      if (hashedPass.hash === userData.hash) {

        var mailOptions = {
          from: 'cmpn.20102a0032@gmail.com',
          to: email,
          subject: 'Login Detected',
          text: "User has logged in to UGC Checked portal.",
        };

        transporter.sendMail(mailOptions, function(error, info){
          if(error){
            console.log(error.message);
          }else{
            console.log(info.response);
          }
        });

        //Redirect Checks after login
        return res.status(200).json({
          message: "User logged in",
          token: signToken({ email: req.body.email }),
          data: await redirectUser(userData),
        });
      }
      return res.status(400).json({ message: "Incorrect password" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },

  list: async (req, res) => {
    try {
      var query = {};
      if (req.body.role_id) query = { role: req.body.role_id };

      const users = await userModel.find(query);
      returnMessages.successMessage(
        res,
        messages.successMessages.getAllheis,
        users
      );
    } catch (error) {
      console.log(error);
      returnMessages.errorMessage(res, error);
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email, otp, password } = req.body;
      const userOtpVerificationRecords = await userOtpVerification.find({
        email,
      });
      if (userOtpVerificationRecords.length <= 0) {
        throw new Error(
          "OTP data not found. Resend OTP or email already verified"
        );
      } else {
        const { expiresAt } = userOtpVerificationRecords[0];
        const hashedOtp = userOtpVerificationRecords[0].otp;
        if (expiresAt < Date.now()) {
          await userOtpVerification.deleteMany({ email });
          throw new Error("OTP expired. Request new OTP");
        } else {
          const isOtpValid = await bcrypt.compare(otp, hashedOtp);
          if (!isOtpValid) {
            throw new Error("OTP is invalid");
          } else {
            await userOtpVerification.deleteMany({ email });
            const { salt, hash } = hashPassword(password);
            delete req.body.password;
            userModel.updateMany({ email: email }, { salt: salt, hash: hash });
            res.json({
              status: "VERIFIED",
              message: "Password changes successfully",
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
      returnMessages.errorMessage(res, error);
    }
  },
};

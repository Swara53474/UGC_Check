const userModel = require("../schema/users");
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
const userOtpVerification = require("../schema/userOtpVerification");
require("dotenv").config();



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASS
    }
  });

function generateOTP(min, max){
    return Math.floor(Math.random()*(Math.floor(max) - Math.ceil(min + 1) + Math.ceil(min)));
}

module.exports = {
  sendOTP: async(req, res) => {
    try {
        const {email} = req.body;
        const sentOTP = generateOTP(1000,9999).toString();
        const SaltRounds = 10;
        const hashedOtp = await bcrypt.hash(sentOTP, SaltRounds);
        const newOtpverification = await new userOtpVerification({
          email:email,
          otp:hashedOtp,
          createdAt:Date.now(),
          expiresAt:Date.now() + 3600000, //3600000 => 1hr in ms
        });
        await newOtpverification.save();
          var mailOptions = {
            from: 'cmpn.20102a0032@gmail.com',
            to: email,
            subject: 'Verify your Email',
            text: "The OTP is: " + sentOTP
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              res.json({
                status:"PENDING",
                message:"Verification OTP sent to mail",
                data:{email},
              });
              console.log('Email sent: ' + info.response);
            }
          });

    } catch (error) {
      res.json({
        status:"FAILED",
        message:error.message,
      });
    }
  },
  checkOTP: async(req, res) => {
    try {

        const {email,otp} = req.body;
        const userOtpVerificationRecords = await userOtpVerification.find({email});
        if(userOtpVerificationRecords.length <= 0){
          throw new Error("OTP data not found. Resend OTP or email already verified");
        }else{
          const {expiresAt} = userOtpVerificationRecords[0];
          const hashedOtp = userOtpVerificationRecords[0].otp;
          if(expiresAt < Date.now()){
            await userOtpVerification.deleteMany({email});
            throw new Error("OTP expired. Request new OTP")
          }else{
           const isOtpValid = await bcrypt.compare(otp, hashedOtp);
           if(!isOtpValid){
            throw new Error("OTP is invalid");
           }else{
            await userOtpVerification.deleteMany({email});
            res.json({
              status:"VERIFIED",
              message:"User Email verified successfully"
            });
           }
          }
        }

    } catch (error) {
      res.json({
        status:"FAILED",
        message:error.message,
      })
    }
  },
  resendOTP: async(req, res) => {
    try {
      const {email} = req.body;
      const sentOTP = generateOTP(1000,9999).toString();
      const SaltRounds = 10;
      const hashedOtp = await bcrypt.hash(sentOTP, SaltRounds); 
      await userOtpVerification.deleteMany({email});
      const newOtpverification = await new userOtpVerification({
        email:email,
        otp:hashedOtp,
        createdAt:Date.now(),
        expiresAt:Date.now() + 3600000, //3600000 => 1hr in ms
      });
      await newOtpverification.save();
        var mailOptions = {
          from: 'cmpn.20102a0032@gmail.com',
          to: email,
          subject: 'Verify your Email',
          text: "The OTP is: " + sentOTP
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            res.json({
              status:"PENDING",
              message:"Verification OTP sent to mail",
              data:{email},
            });
            console.log('Email sent: ' + info.response);
          }
        });

  } catch (error) {
    res.json({
      status:"FAILED",
      message:error.message,
    });
  }
  },
};

const multer = require('multer');
const path = require('path');
const uuid = require('uuid').v4;
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const router = require("express").Router();
const universityModel = require("../schema/universities");
const documentModel = require("../schema/documents");
const universities = require("../schema/universities");
const uploadedAt = require("../controllers/uploadFile")
const UserModel = require("../schema/users");
const s3 = new aws.S3({ apiVersion: '2006-03-01' });
const upload = multer({ 
    storage: multerS3({
        s3,
        bucket: 'ugc-doc',
        acl:'public-read',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `${uuid()}${ext}`);
        }
    })
  });



router.post("/uploadAuthFile", upload.single('authLetter'), async (req, res) => {
    const email = req.body.email;
    const uploaded = req.file.location;
    // await universityModel.updateOne({"name":universityName},{$set:{"documents":uploaded}});

    // newDocument = await new documentModel({
    //     universityName:universityName,
    //     path:uploaded,
    //     uploadedAt:Date.now(),
    // });
    // await newDocument.save()

    UserModel.updateOne({email:email},{$set:{"authLetter":uploaded}})
    .then(result => {
        return res.json({
            status:"UPLOADED",
            ...result,
          });
    });
});

router.post("/uploadApprovalFile", upload.single('approvalLetter'), async (req, res) => {
    // const { email } = req.body;
    const uploaded = req.file.location;
    // await universityModel.updateOne({"name":universityName},{$set:{"documents":uploaded}});

    // newDocument = await new documentModel({
    //     universityName:universityName,
    //     path:uploaded,
    //     uploadedAt:Date.now(),
    // });
    // await newDocument.save()

    UserModel.updateOne({email:emailg},{$set:{"approvalLetter":uploaded}})
    // .then(result => {
    //     return res.json({
    //         status:"UPLOADED",
    //         ...result,
    //       });
    // });
});

router.post("/deleteFile/:universityName", async(req, res) => {
    try{
        const document = await documentModel.findOne({universityName:req.params.universityName});
        let fileName = document.path.toString();
        fileName = fileName.split("/")[3];
        s3.deleteObject({Bucket:"ugc-doc", Key:fileName}, (error, data) => {
            if(error){
                res.json({
                    status:"FAILED",
                    message:error.message,
                })
            }else{
                res.json({
                    status:"DELETED",
                    message:"Object Deleted Successfully"
                });
            }
        });
    }catch(error){
        res.json({
            status:"FAILED",
            message: error.message,
        })
    }
});
router.get("/viewFile/:universityName", async (req, res) => {
    try{
    const document = await documentModel.findOne({universityName:req.params.universityName});
    res.json({message:document.path});
}catch(error){
    res.json({message:error.message});
}
});

module.exports = router;
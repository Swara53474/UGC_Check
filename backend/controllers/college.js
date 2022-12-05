const collegeModel = require("../schema/colleges");
const userModel = require("../schema/users");

module.exports = {
    viewall: async(req, res) => {
        try{
            const hei = await collegeModel.find({});
            res.json(hei);
        }catch(error){
            res.status(500).json({error});
        }
    },
    viewApproved: async(req, res) => {
        try{
            const heiApproved = await collegeModel.find({approval:"Approved"});
            if(!heiApproved){
                res.json({status:"NOT FOUND"});
            }else{
                res.json(heiApproved);
            }
            
        }catch(error){
            res.status(500).json({error});
        }
    },
}

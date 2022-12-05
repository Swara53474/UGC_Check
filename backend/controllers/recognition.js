const recognitionModel = require("../schema/recognition");

module.exports = {
    check: async(req, res) =>{
        try{
            const name = req.body.name;
            const foundClg = await recognitionModel.findOne({"name":{$regex:name}});
            if(!foundClg){
                res.json({
                    status:"NOT FOUND",
                    message:"Institute not found.",
                })
            }else{
                res.json({
                    status:"FOUND",
                    data:foundClg,
                })
            }
        }catch(error){
            res.json({
                message:error.message
            })
        }
    },
    add: async(req, res) => {
        try{
            const {name, recognition, state} = req.body;
            const newRecognition = await new recognitionModel({
                name:name,
                recognition:recognition,
                state:state,
            });
            await newRecognition.save();
        }catch(error){
            res.json({message:error.message});
        }
    },
}
const doctorModel = require('../models/doctorModel');


const getDocInfoController =async  ( req,res)=>{
    try{
        const doctor = await doctorModel.findOne({userId:req.body.userId}) 
        res.status(200).send({
            message:'doctor data fetch success',
            data:doctor,
            success:true
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'error in fetching doctor details '
        })
    }
  
}

const updateProfileController = async (req,res)=>{
     try{
         const doctor = await doctorModel.findOneAndUpdate({userId:req.body.userId} , req.body)
         res.status(201).send({
            success:true,
            message: ' doctor profile updated ',
            data: doctor 
         })
     }
     catch(error){
       console.log(error);
       res.status(500).send({
        success:false,
        message:'dcotor profile update issue ',
        error
       })
     }
}; 

module.exports = {getDocInfoController,updateProfileController};
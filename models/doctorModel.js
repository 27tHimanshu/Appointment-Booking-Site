
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
     firstName:{
      type : String ,
      required:[ true , ' first name is required']
     },
     lastName :{
        type : String ,
        required : [ true , "last name is required "]
     },
     phone :{
        type:String,
        required:[true , "phone number is required "]
      },
      website:{
        type :String,
      },
      address:{
        type:String ,
        required :[true , "address is required "]
      },
      specialisation:{
        type : String ,
        required :[ true , "specialisation is required "]
      },
      experience:{
        type:String ,
        required:[true,"experience is required "]
      },
      feesPerConsultation:{
        type:Number,
        required:[true,'fees is required ']
      },
      status:{
        type:String,
        default:'pending'
      },
      timings:{
        type:Object ,
        required:[true , "work timing  is required "]
      },
     

} , {timestamps:true} );


const doctorModel = mongoose.model('doctors'  , doctorSchema );
module.exports = doctorModel;
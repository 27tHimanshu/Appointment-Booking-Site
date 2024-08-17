
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
        required:[trye , "phone number is required "]
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
      feesPerConsulatation:{
        type:Number,
        required:[true,'fees is required ']
      },
      timings:{
        type:Object ,
        required:[true , "work timing  is required "]
      },
     

} , {timestamps:true} );


const doctorModel = mongoose.model('users'  , doctorSchema );
module.exports = doctorModel;
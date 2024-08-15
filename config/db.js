const mongoose = require("mongoose")
const colors = require('colors');


const connectDB = async()=>{
    try
    {
            console.log(process.env.MONGO_URL)
          await mongoose.connect(process.env.MONGO_URL);
          console.log(`mongo db connected ${mongoose.connection.host} `.bgGreen.white);
    }
    catch(error){
          console.log(`Mongo DB server issue : ${error}`.bgRed.white);
    }
}

module.exports = connectDB;
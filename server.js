const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { loginController } = require('./controllers/userCtrl');

// dotenv config
dotenv.config();

// mongo db connection 
connectDB();

// rest object 
const app = express();

// middlewares 
app.use(express.json());
app.use(morgan('dev'));

// routes 
app.use('/api/v1/user', require("./routes/userRoutes"));
app.use('/api/v1/admin',require('./routes/adminRoutes'));

const port = process.env.PORT || 8080

// listen 

app.listen( port , ()=>{
    console.log(`server running  in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgCyan.white);
})
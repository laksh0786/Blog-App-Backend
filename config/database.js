//Instantiatting moongoose
const mongoose  = require("mongoose");

//It will import all the environment variables from the .env file to the process.env variable in node
require("dotenv").config();

const dbConnect = ()=>{

    mongoose.connect(process.env.DB_URL , {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(
        ()=>{
            console.log("Database connected successfully");
        }
    ).catch(
        (err)=>{
            console.log("Error connecting to database : " , err);
            process.exit(1);
        }
    )
    
}

module.exports = dbConnect;
//Instantiate express
const express = require("express");
const app =  express();

//--------------Importing required files

//it will import the dbConnect function from the config/database.js file
const dbConn = require("./config/database");

//It will import all the environment variables from the .env file to the process.env variable in node
require("dotenv").config();

//It will import the routes from the routes/index.js file
const routes = require("./routes/blog-routes");

//------------------End of importing files


//middleware to parse the request body
app.use(express.json()); 
//Always use this middleware before using the routes as it will parse the request body and then pass it to the routes


//Mounting the routes on the express app
app.use("/api/v1" , routes);


//Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>{
    console.log("Server is running on port "+PORT);
})

//Connecting to database
dbConn();


//Default page
app.get("/" , (req , res)=>{
    res.send("<h1>This is Blog App using Node.js and MongoDB</h1>");
})
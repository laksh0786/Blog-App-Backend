//importing mongoose 
const mongoose = require("mongoose");


//creating the schema
const likeSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post", //refering to the POST model (exported using "Post" in postModel.js)
    },

    user:{
        type:String,
        required:true,
    }
})



//exporting the schema
module.exports = mongoose.model("Like" , likeSchema);
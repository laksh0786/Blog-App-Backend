//Instantiating the mongoose or importing the mongoose
const mongoose = require("mongoose");

//creating the schema
const commentSchema = new mongoose.Schema({
    post: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Post" //refering to the POST model
    },
    user: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
})

//exporting the schema
module.exports = mongoose.model("Comment" , commentSchema)
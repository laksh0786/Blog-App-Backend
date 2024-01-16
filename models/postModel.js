//Instantiating mongoose or importing the mongoose
const mongoose = require("mongoose");


//creting the schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    body: {
        type: String,
        required: true,
    },

    //array of likes
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Like", //refering to the Like model
        }
    ],

    //array of comments
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment", //refering to the Comment model
        }
    ]

})


//exporting the schema
module.exports = mongoose.model("Post", postSchema);

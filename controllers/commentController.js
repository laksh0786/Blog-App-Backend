//Importing the model
const postSchema = require("../models/postModel");
const CommentSchema = require("../models/commentModel");


//creating route Handler for creating a comment
//1st way --> using create function on the model (used int todo app)
//2nd way --> using save model on the post object

//2nd way is used here 
exports.createComment = async (req,resp)=>{
    
    try{

        //fetching the data from the request body

        //post is the id of the post to which the comment is to be added. post is defined in the postModel.js file and name of the field in the request body is also post and must be same as the name of the field in the postModel.js file
        console.log(req.body);

        const {post , user , body} = req.body;

        
        //create a comment object
        const comment = new CommentSchema({
            post , user , body
        });

        //saving the comment to the database
        const savedComment = await comment.save();
       

        //finding the post using Id to which the comment is to be added , then pushing the comment to the comments array of that post

        //$push is used to add or append the data to the array
        //$pull is used to remove the data from the array

        //{new:true} is used to return the updated document if donot use it then it will return the old document in the post variable or as a response.


        //--> returned updated array ,  populate or fill the comments array with comment ids***
        // const updatedPost = await postSchema.findByIdAndUpdate(post , {$push:{comments:savedComment._id}} , {new:true})

        //---> returned updated array , populate the comments array with comment objects***

        const updatedPost = await postSchema.findByIdAndUpdate(post , {$push:{comments:savedComment._id}} , {new:true}).populate("comments") /*Populate the comments array with comment objects*/ .exec(); //exec() is used to execute the query


        //sending the response
        resp.status(200).json({
            success:true,
            post:updatedPost
        })

    }

    catch(err){
        return resp.status(500).json({
            success:false,
            error:"Error --> " + err.message,
        })
    }
}
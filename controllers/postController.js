const postSchema = require("../models/postModel");
const commentSchema = require("../models/commentModel");
const likeSchema = require("../models/likeModel");


exports.createPost = async(req,resp)=>{

    try{
        //fetching the data from the request body
        const {title , body } = req.body ; 
        
        //creating a post object
        const newPost = new postSchema({title , body});

        //saving the post to the database
        const savedPost = await newPost.save();

        //sending the response
        resp.status(200).json({
            post:savedPost,
        })

    }

    catch(err){
        return resp.status(500).json({
            error:"Error --> " + err.message,
        })
    }

}



exports.getAllPosts = async(req,resp)=>{
    try{

        //getting all the posts from the database

        //-->In this we are getting the post with comments and likes array filled with id
        // const allPosts = await postSchema.find();

        //-->In this we are getting the post with comments and likes array filled with objects respectively
        const allPosts = await postSchema.find().populate("comments").populate("likes").exec();


        //sending the response
        resp.status(200).json({
            posts:allPosts,
        })
    }
    catch(err){
        resp.status(500).json({
            error:"Error --> " + err.message,
        })

    }
} 
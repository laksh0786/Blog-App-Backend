const postSchema = require("../models/postModel");
const likeSchema = require("../models/likeModel");



//creating route Handler for creating a like
exports.likePost = async (req, resp) => {
    try {

        //fetching the data from the request body
        const { post, user } = req.body;

        //creating a like object
        const newLike = new likeSchema({ post, user });

        //saving the like to the database
        const savedLike = await newLike.save();

        //fetching the post to which the like is to be added and then pushing the like to the likes array of that post

        //--> used to return array populatde or fi lled the likes array with like ids***

        // const updatedPost = await postSchema.findByIdAndUpdate(post , {$push:{likes:savedLike._id}} , {new:true});


        //---> used to return array populated or filled the likes array with like objects***

        const updatedPost = await postSchema.findByIdAndUpdate(post, { $push: { likes: savedLike._id } }, { new: true }).populate("likes")/* populate is used to populate likes array with object instead of id */.exec(); //exec() is used to execute the query


        //sending the response
        resp.status(200).json({
            post: updatedPost,
        })


    }

    catch (err) {
        resp.status(500).json({
            error: "Error while liking the post --> " + err.message,
        })
    }
}


//creating route Handler for unliking a post
exports.unlikePost = async(req,resp)=>{
    try{

        //fetching post id and like id from the request body
        const {post , like} = req.body;

        //deleting the like from database by finding the like using id and then deleting it
        
        //we delete that like which has the id of the like and post id of the post to which the like is to be removed

        //findOneAndDelete() is used to find the document using the id and then delete only first document that matches the query

        const deletedLike = await likeSchema.findOneAndDelete({_id:like , post:post});



        //--> Update the post by removing the like from the likes array
        
        //fetching the post to which the like is to removed and then pulling or removing the like from the likes array of that post

        //$push is used to add or append the data to the array 
        //$pull is used to remove the data from the array

        // const updatedPost = await postSchema.findByIdAndUpdate(post , {$pull:{likes:like}} , {new:true})

        const updatedPost = await postSchema.findByIdAndUpdate(post , {$pull:{likes:deletedLike._id}} , {new:true}).populate("likes").exec(); //exec() is used to execute the query

        //sending the response
        resp.status(200).json({
            post:updatedPost,
        })

    }
    catch(err){
        resp.status(500).json({
            error:"Error while unliking the post --> " + err.message,
        })
    }
}
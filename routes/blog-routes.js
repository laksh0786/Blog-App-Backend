const express = require("express");
const router = express.Router();


//Importing the controllers
const {createComment} = require("../controllers/commentController");
const {createPost} = require("../controllers/postController");
const {getAllPosts} = require("../controllers/postController");
const {likePost, unlikePost} = require("../controllers/likeController");

 





//creating mapping with the controllers
router.post("/comments/create" , createComment);
router.post("/posts/create" , createPost);
router.get("/posts" , getAllPosts);
router.post("/likes/like" , likePost);
router.post("/likes/unlike" , unlikePost);





//exporting the router
module.exports = router;
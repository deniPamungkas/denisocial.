import {Router} from "express"
import { createPost, getFeedPosts, getUserPosts, likePost } from "../Controller/Post.js";
import { verifyToken } from "../Middleware/Auth.js";

const route = Router();

/* CREATE */
route.post("/", createPost)
/* READ*/
route.get("/", verifyToken, getFeedPosts)
route.get("/:userId/posts", verifyToken, getUserPosts)
/* UPDATE */
route.patch("/:id/like", likePost)


export default route
import Post from "../Models/Post.js";
import User from "../Models/User.js";

/* CREATE POST */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      picturePath,
      userPicturePath: user.picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const allPost = await Post.find();
    res.status(201).json(allPost);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

/* GET POST */
export const getFeedPosts = async (req, res) => {
  try {
    const allPost = await Post.find();
    res.status(201).json(allPost);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.body;
    const userPosts = await Post.find({ userId });
    res.status(201).json(userPosts);
  } catch (error) {
    res.status(500).json(error);
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

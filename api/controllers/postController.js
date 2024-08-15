const Post = require('../models/Post');
const User = require('../models/User');  // Import the User model
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

async function getPosts(req, res) {
  try {
    const posts = await Post.find().populate("comments.user", "username"); 
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}

async function getPostById(req, res) {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("comments.user", "username");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
}

async function createPost(req, res) {
  try {
    const { title, summary, content } = req.body;
    const imageFile = req.file;
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    jwt.verify(token, secret, async (err, userInfo) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
      }

      if (!imageFile) {
        return res.status(400).json({ error: "Image is required" });
      }

      const imageUrl = `/uploads/${imageFile.filename}`;

      const post = new Post({
        title,
        summary,
        content,
        imageUrl,
        author: userInfo.username,
      });

      const savedPost = await post.save();

      res.status(201).json({
        message: "Post created successfully!",
        post: savedPost
      });
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
}

async function likePost(req, res) {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const post = await Post.findById(id);

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
    } else {
      post.likes = post.likes.filter((likeId) => likeId.toString() !== userId);
    }

    await post.save();
    res.json({ message: "Like status updated", likes: post.likes.length });
  } catch (error) {
    res.status(500).json({ error: "Failed to update like status" });
  }
}

async function commentOnPost(req, res) {
  const { id } = req.params;
  const { userId, username, content } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = {
      user: userId ? userId : null,
      username: userId ? (await User.findById(userId)).username : username, // Use username if guest
      content,
    };

    post.comments.push(comment);
    await post.save();

    res.json({ message: "Comment added", comments: post.comments });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
}

module.exports = {
  getPosts,
  getPostById,
  createPost,
  likePost,
  commentOnPost,
};

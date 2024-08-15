const Post = require("../models/Post");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
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
    console.error("Error updating like status:", error);
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

    let commentUsername = username;
    if (userId) {
      const user = await User.findById(userId);
      commentUsername = user ? user.username : username;
    }

    const comment = {
      user: userId ? userId : null,
      username: commentUsername,
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

async function updatePost(req, res) {
  const { id } = req.params;
  const { title, summary, content } = req.body;
  const imageFile = req.file;
  const { token } = req.cookies;

  try {
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, secret);
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.author !== decoded.username) {
      return res.status(403).json({ error: "Forbidden: You are not the author of this post" });
    }

    if (title) post.title = title;
    if (summary) post.summary = summary;
    if (content) post.content = content;
    if (imageFile) post.imageUrl = `/uploads/${imageFile.filename}`;

    const updatedPost = await post.save();
    res.json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
}

module.exports = {
  getPosts,
  getPostById,
  createPost,
  likePost,
  commentOnPost,
  updatePost,
};

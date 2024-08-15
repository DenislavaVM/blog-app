const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: false },
  username: { type: String, required: false },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const PostSchema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [CommentSchema],
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
const express = require("express");
const { getPosts, getPostById, createPost, likePost, commentOnPost, updatePost } = require("../controllers/postController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

// Define routes without 'api' prefix since it's added in index.js
router.get("/posts", getPosts);
router.get("/posts/:id", getPostById);
router.post("/posts", upload.single("image"), createPost);
router.put("/posts/:id", upload.single("image"), updatePost);
router.post("/posts/:id/like", likePost);
router.post("/posts/:id/comment", commentOnPost);

module.exports = router;
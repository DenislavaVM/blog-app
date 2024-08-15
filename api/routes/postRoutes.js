const express = require("express");
const { getPosts, getPostById, createPost, likePost, commentOnPost } = require("../controllers/postController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/posts", getPosts);
router.get("/posts/:id", getPostById);
router.post("/posts", upload.single("image"), createPost);
router.post("/posts/:id/like", likePost);
router.post("/posts/:id/comment", commentOnPost);

module.exports = router;
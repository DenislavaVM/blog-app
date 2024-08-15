const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");
const Post = require("./models/Post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");

const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Failed to connect to MongoDB", err));

const upload = multer({ dest: "uploads/" });

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, salt);

        const userData = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.json({ username, email });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(400).json({ error: "Registration failed" });
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(400).json({ error: "User not found" });
        }

        const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid password" });
        }

        jwt.sign({ username, id: existingUser._id }, secret, { expiresIn: "1h" }, (error, token) => {
            if (error) {
                throw error;
            }

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
                maxAge: 3600000 // 1 hour
            });

            res.json({
                id: existingUser._id,
                username,
            });
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Login failed" });
    }
});

app.get("/profile", (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            return res.status(401).json({ error: "Invalid or expired token" });
        }
        res.json(info);
    });
});

app.post("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        expires: new Date(0)
    }).json({ message: "Logout successful" });
});

app.post("/posts", upload.single("image"), async (req, res) => {
    try {
        const { title, summary, content } = req.body;
        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).json({ error: "Image is required" });
        }

        const imageUrl = `/uploads/${imageFile.filename}`;

        const post = new Post({
            title,
            summary,
            content,
            imageUrl,
            createdAt: new Date(),
        });

        await post.save();

        res.status(201).json({ message: "Post created successfully!" });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Failed to create post" });
    }
});

app.get("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("comments.user", "username");
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ error: "Failed to fetch post" });
    }
});

app.post("/posts/:id/like", async (req, res) => {
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
});

app.post("/posts/:id/comment", async (req, res) => {
    const { id } = req.params;
    const { userId, username, content } = req.body;

    try {
        const user = await User.findById(userId); 
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const comment = {
            user: user ? user._id : null,
            username: user ? user.username : username, 
            content,
        };

        post.comments.push(comment);
        await post.save();

        res.json({ message: "Comment added", comments: post.comments });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: "Failed to add comment" });
    }
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

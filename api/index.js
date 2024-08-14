const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Failed to connect to MongoDB", err));

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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

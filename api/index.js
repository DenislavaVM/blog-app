const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();
const User = require("./models/User");
const bcrypt = require("bcryptjs");

const app = express();

const salt = bcrypt.genSaltSync(10);

app.use(cors());
app.use(express.json());

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
            console.error("Registration error:", error); // Log the error on the server
            res.status(400).json({ error: "Registration failed" });
        }
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

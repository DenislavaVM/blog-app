const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.post("/register", (req, res) => {
    res.json("Test")
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require("express");
const app = express();

app.get("/test", (req, res) => {
    res.json("Test")
})
app.listen(5000);
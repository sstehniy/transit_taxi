const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("./dist"));

app.use("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist/index.html"), err => {
        if (err) res.status(500).send(err);
        else res.sendStatus(200);
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "dist")));

app.use("/*", async (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist/index.html"), err => {
        if (err) res.status(500).send(err);
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));

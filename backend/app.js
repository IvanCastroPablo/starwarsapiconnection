const express = require("express");
const app = express();
const path = require("path");
const logging = require("./routers/logging")
const calls = require("./routers/middlewares")

app.set("views", path.join(__dirname, "views"));

app.use(logging);

app.use("/", calls);

// para servir react...
app.use(express.static(path.join(__dirname, "../frontend/ASDF")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/ASDF"))
})
const express = require('express');
const router = express.Router();
const path = require("path");

// Middleware para loggear las consultas
function event() {
    return new Date().toTimeString();
}

router.use((req, res, next) => {
    console.log("Time:", event());
    console.log("Request type:", req.method);
    console.log("Requested path", req.path);
    next();
});

module.exports = router;
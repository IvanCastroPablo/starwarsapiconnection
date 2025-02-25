const express = require('express');
const router = express.Router();
const { Movies } = require("../bd/models/Movies");
const path = require("path");
require('dotenv').config({path: "../.env"});

// Endpoint: Login estático
router.get("/login", (req, res) => {
    res.render("login"); // Renderiza login.ejs
});

"use strict"
const express = require("express");
const { getUser } = require("../models/mdlUsers");
const router = express.Router();
router.get("/", (req, res) => {
    res.render("secret", { user: req.session.user });
});

module.exports = router;

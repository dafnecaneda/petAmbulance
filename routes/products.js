"use strict";
const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const productModels = require("../models/productsModel");

router.get("/", async (req, res) => {
  const data = await productModels.getProducts();
  res.render("products", { data });
});

module.exports = router;

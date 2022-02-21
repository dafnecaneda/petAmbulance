// "use strict";
// const express = require("express");
// const cloudinary = require("cloudinary").v2;
// const util = require("util");
// const uploader = util.promisify(cloudinary.uploader.upload);
// const destroy = util.promisify(cloudinary.uploader.destroy);
// const router = express.Router();
// const req = require("express/lib/request");
// const mdlPets = require("../models/mdlPets");
// router.get("/", (req, res) => {
//     res.render("addPets")
// });

// //sending image file to cloudinary, so cloudinary will give us back the id for storage in our DB, along with the rest of the data from the form. 

// router.post("/", async (req, res) => {
//   let imageFile = req.files.imageFile;
//   const img_id = (await uploader(imageFile.tempFilePath)).public_id;
  
// await mdlPets.addPets({ ...req.body, image: img_id });
//   res.redirect("pets");
// });

// module.exports = router;
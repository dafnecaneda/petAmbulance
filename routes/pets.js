"use strict";
const express = require("express");
const { body, validationResult } = require("express-validator");
const cloudinary = require("cloudinary").v2;
const util = require("util");
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);
const router = express.Router();
const req = require("express/lib/request");
const mdlPets = require("../models/mdlPets");

router.get("/", async (req, res) => {
  const pets = await mdlPets.getPets();
  const data = pets.map((row) => {
    const imageURL = cloudinary.url(row.image, {
      width: 300,
      height: 300,
      crop: "fill",
    });
    return { ...row, imageURL };
  });
  res.render("pets", { user: req.session.user, data });
});

// ADD PET

router.get("/addPets", (req, res) => {
    res.render("addPets")
});

const validationRules = [
    body("petName", "a Pet Name must be provided.").exists().isLength({ min:2}),
    body("type", "Your pet type must be provided.").exists().isLength({ min:2}),
    body("breed", "Your pet breed must be provided.").exists().isLength({ min:2}),
    body("age", "Your pet age msut be provided (if is not a year old yet mark it has 0)").exists(). isNumeric(),
]

router.post("/addPets", validationRules, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formData = req.body;
        const arrWarning = errors.array();
      res.render("addPets", { formData, arrWarning });
    } else{
        if(!req.files){
            const messageImg = "You must provide a picture of your pet."
          res.render("addPets", { messageImg });
        }else{
     let imageFile = req.files.imageFile;
  const img_id = (await uploader(imageFile.tempFilePath)).public_id;
  
await mdlPets.addPets({ ...req.body, image: img_id });
  res.redirect("/pets");
    }}
});

// router.post("/addPets", async (req, res) => {
//   let imageFile = req.files.imageFile;
//   const img_id = (await uploader(imageFile.tempFilePath)).public_id;
  
// await mdlPets.addPets({ ...req.body, image: img_id });
//   res.redirect("/pets");
// });

//route to show product to edit or erase
router.get("/handleEdit/:id", async (req, res) => {
  const row = await mdlPets.getPet(req.params.id);
  const pet = {
    id: row[0].id,
    petName: row[0].petName,
    type: row[0].type,
    breed: row[0].breed,
    gender: row[0].gender,
    age: row[0].age,
    image: row[0].image,
  };
  res.render("editPet", { pet });
});

router.post("/editPet", async (req, res) => {
  let img_id = null;
  if(!req.files) {
    img_id = req.body.prevImage;
  }else {

const row = await mdlPets.getPet(req.body.id);
    await destroy(row[0].image);
    const imageFile = req.files.imageFile;
    img_id = (await uploader(imageFile.tempFilePath)).public_id;
  }
  const data = {
    id: req.body.id,
    petName: req.body.petName,
    type: req.body.type,
    breed: req.body.breed,
    age: req.body.age,
    gender: req.body.gender,
    image: img_id,
  };
  await mdlPets.modifyPet(data, data.id);
  res.redirect("/pets");
})

router.get("/deletePet/:id", async (req, res) => {
  const row = await mdlPets.getPets(req.params.id);
  await destroy(row[0].image);
  await mdlPets.deletePet(req.params.id);

  const pets = await mdlPets.getPets();
  const data = pets.map((row) => {
    const imageURL = cloudinary.url(row.image, {
      width: 300,
      height: 300,
      crop: "fill",
    });
    return { ...row, imageURL };
  });
   res.render("pets", { user: req.session.user, data });
});

module.exports = router;

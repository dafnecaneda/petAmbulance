"use strict";
const express = require("express");
const { body, validationResult } = require("express-validator");
const cloudinary = require("cloudinary").v2;
const util = require("util");
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);
const router = express.Router();
const req = require("express/lib/request");
const mdlUsers = require("../models/mdlUsers");
const md5 = require("md5");
const { isUndefined } = require("util");
router.get("/", (req, res) => {
    res.render("signup")
});

const validationRules = [
    body("name", "Your Name is required to complete the registration.").exists().isLength({ min: 2 }),
    body("lastName", "Your Last Name is required to complete the registration.").exists().isLength({ min: 2 }),
    body("userName", "A User Name must be provided.").exists().isLength({ min: 2 }),
    body("userEmail", "A valid Email must be provided.").exists(),
    body("birthday", "A valid date must be provided.").exists().isDate()
]

router.post("/", validationRules, async (req, res) => {

    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
        const formData = req.body;
        const arrWarning = errors.array();
        res.render("signup", { formData, arrWarning });
    } else {
        const  userName  = req.body.userName;
         const  userEmail  = req.body.userEmail;

        const dataEmail = await mdlUsers.getEmail(userEmail);
        
        if (dataEmail != undefined) {
            const messageEmail = "This email is already being used!"
            res.render("signup", { messageEmail });
        } else {
        
            const dataUser = await mdlUsers.callUser(userName);
            if (dataUser != undefined) {
                const messageUser = "This User Name is already taken";
                res.render("signup", { messageUser });
            } else {
    
                if (!req.files) {
                    const messageImg = "You must provide a profile picture."
                    res.render("signup", { messageImg });
                }

                else {
                    let imageFile = req.files.imageFile;
                    const img_id = (await uploader(imageFile.tempFilePath)).public_id;
                    const hashedPass = await md5(req.body.userPass)
                    await mdlUsers.addUser({ ...req.body, image: img_id, userPass: hashedPass });
                    const messageSuccess = "Your registration has been successful !"
                    res.render("signup", { messageSuccess });
                }
            }
        }
    
    }
});

module.exports = router;

//  const { email } = req.body;
//             const doesUserExitsAlreay = await mdlUsers.findOne({ email });
//             if (doesUserExitsAlreay) {
//                 const messageEmail = "This emails is already registered to our database."
//                 res.render("singup", { messageEmail });
//             } 


  
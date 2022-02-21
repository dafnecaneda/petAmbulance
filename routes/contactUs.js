"use strict";
require("dotenv").config();
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const { isNumber } = require("util");
router.get("/", (req, res) => {
  res.render("contactUs");
});

const validationRules = [
    body("name", "Name must be provided for contact information.").exists().isLength({ min: 2 }),
    body("lastName", "Last Name must be provided for contact information.").exists().isLength({ min: 2 }),
    body("email", "A valid Email must be provided.").exists().isEmail(),
    body("phone", "A valid Phone must be provided.").exists().isMobilePhone(),
  body("message", "Your message must contain a min 10 characters and a max of 300 characters.")
    .exists()
    .trim()
    .isLength({ min: 10, max: 300 }),
];

router.post("/", validationRules,async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formData = req.body;
      const arrWarnings = errors.array();
      res.render("contactUs", { formData, arrWarnings });

    } else {
      const emailMsg = {
        to: "atencioncliente@empresa.com",
        from: req.body.email,
        subject: "Message from Form Contact",
        html: `${req.body.name} ${req.body.lastName}  has sent the following Email: ${req.body.message}. Aditional contact info. Phone:${req.body.phone}`,
      };

      const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3e9ba24bda99e2",
    pass: "a8a6cfad9f72a4"
  }
});

      const sendMailStatus = await transport.sendMail(emailMsg);
      let sendMessage = "";
      if (sendMailStatus.rejected.length) {
        sendMessage = "Oh no! We can't send your message now 😞 Please try again later.";
      } else {
        sendMessage = "Your message has arrived 👌";
      }
      res.render("contactUs", { sendMessage });
    }
  }
);
module.exports = router;
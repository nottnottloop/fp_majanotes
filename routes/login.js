const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require('path');

const sharedFunctions = require(path.resolve(__dirname, "sharedFunctions"));

router
  .route("/")
  .get((req, res) => {
    res.render('login.ejs')
  })
  .post((req, res) => {
    req.body.username = req.body.username.trim();
    req.body.password = req.body.password.trim();
    let e;
    switch(sharedFunctions.checkUserValid(req, res)) {
      case 'nouser':
        res.status(401).send()
        return;
      case 'wrongpass':
        res.status(403).send()
        return;
      case 'ok':
        break;
    }
    console.log(`User ${req.body.username} logged in`)
    res.redirect("/");
  })
module.exports = router;

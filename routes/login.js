const express = require("express");
const router = express.Router();
const User= require('../model/userModel')
const fs = require("fs");
const path = require('path');

router.get("/", (req, res)=>{
    res.render('login.ejs')
})

router.post("/input", (req, res)=>{
    console.log(req.body.loginuser,req.body.loginpass)
    res.send(JSON.stringify({username: req.body.loginuser, password: req.body.loginpass}))
    let userJson;
    let userData;
    try {
    
      userJson = fs.readFileSync(path.resolve(__dirname, "../data/userData.json"), "utf-8");
      userData = JSON.parse(userJson);
      console.log(userJson,userData)

    } catch (err) {
    
      console.log("Error: " + err);
      console.log("Creating new userData.json");
      //check if data directory exists. if not, create it
      if (!fs.existsSync("data")) {
        fs.mkdirSync("data");
      }
      userJson = [];
      userData = [];
    }
})

module.exports =router;

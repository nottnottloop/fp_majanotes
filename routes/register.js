const express = require("express");
const router = express.Router();
const User= require('../model/userModel')
const fs = require("fs");
const path = require('path');

router.get("/", (req, res)=>{
    res.render('register.ejs')
})

router.post("/input", (req, res)=>{
    //console.log(req.body.reguser,req.body.regpass)
    let userJson;
    let userData;
    try {
    
      userJson = fs.readFileSync(path.resolve(__dirname, "../data/userData.json"), "utf-8");
      userData = JSON.parse(userJson);
      let userExists= userData.filter(d=>d.username==req.body.reguser)
      if(userExists.length!==0) {
          res.send(`Please choose a different username:${req.body.reguser} already exists in our file system`)
          return;
      }

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
    const newUser = new User(userData.length, req.body.reguser,req.body.regpass);
    userData.push(newUser)
    userJson= JSON.stringify(userData, null, 2);
    fs.writeFileSync(path.resolve(__dirname, "../data/userData.json"), userJson, "utf-8");
    res.redirect("/")
})


module.exports =router;

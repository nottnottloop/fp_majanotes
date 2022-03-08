const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require('path');

router.get("/", (req, res)=>{
    res.render('login.ejs')
})

router.post("/input", (req, res)=>{
    console.log(req.body.loginuser,req.body.loginpass)
    let userJson;
    let userData;
    try {
    
      userJson = fs.readFileSync(path.resolve(__dirname, "../data/userData.json"), "utf-8");
      userData = JSON.parse(userJson);
      let userExists= userData.filter(d=>d.username==req.body.loginuser)
      console.log(userExists)
      if(userExists.length==0) {
          let e=`Username ${req.body.loginuser} does not exist in our file system. Go to register
          to create a user account`
          res.render('regerr.ejs',{error: e} )

          return;
      }
      else if(req.body.loginpass !==userExists[0].password){
          let e=`Wrong password. Try again`
          res.render('regerr.ejs', {error: e})
          return
      }
      else {
          res.send("Succesfully logged in")
          return
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
    
})

module.exports =router;

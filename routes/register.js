const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require('path');

const sharedFunctions = require(path.resolve(__dirname, "sharedFunctions"));
const User = require(path.resolve(__dirname, "../model/userModel"));

router
  .route("/")
  .post((req, res) => {
    let userJson;
    let userData;
    try {
      userJson = fs.readFileSync(path.resolve(__dirname, "../data/userData.json"), "utf-8");
      userData = JSON.parse(userJson);
      let userExists = userData.find(e => e.username == req.body.username);
      if (req.body.username.toLowerCase() === "anonymous" || req.body.username.toLowerCase() === "anon") {
        e = `If you want to be so anonymous, why are you making an account?`
        res.render('accounterror',{error: e})
        return;
      }
      if (userExists) {
        let e = `Please choose a different username. ${req.body.username} already exists in our file system`
        res.render('accounterror',{error: e})
        return;
      }
    } catch (err) {
      sharedFunctions.createNewDataFile("userData.json", err);
      userJson = [];
      userData = [];
    }
    const newUser = new User(userData.length, req.body.username.trim(), req.body.password.trim());
    userData.push(newUser);
    userJson= JSON.stringify(userData, null, 2);
    fs.writeFileSync(path.resolve(__dirname, "../data/userData.json"), userJson, "utf-8");
    console.log(`User ${req.body.username} registered`);
    res.redirect("/login");
})

module.exports = router;

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require('path');

router
  .route("/")
  .get((req, res) => {
    res.render('login.ejs')
  })
  .post((req, res) => {
    console.log(req.method)
    let userJson;
    let userData;
    try {
      userJson = fs.readFileSync(path.resolve(__dirname, "../data/userData.json"), "utf-8");
      userData = JSON.parse(userJson);
      let user = userData.find(e => e.username == req.body.username)
      console.log(user)
      if (!user) {
          let e =`Username ${req.body.username} does not exist in our file system. Go to register
          to create a user account`
          res.status(401).render('regerr.ejs',{error: e} )
          return;
      }
      else if (req.body.password !== user.password) {
          let e = `Wrong password. Try again`
          res.status(401).render('wrongpass.ejs', {error: e})
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
    console.log(`User ${req.body.username} logged in`)
    res.redirect("/");
})

module.exports = router;

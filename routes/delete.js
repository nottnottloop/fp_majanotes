const express = require("express");
const fs = require("fs");
const path = require('path');
const router = express.Router();

const sharedFunctions = require(path.resolve(__dirname, "sharedFunctions"));

router
  .route("/:id")
  .post((req, res) => {
    //verify user
    if (sharedFunctions.checkUserValid(req, res) != 'ok') {
      return res.send(403);
    }
    let usersJson;
    let usersData;
    try {
      usersJson = fs.readFileSync(path.resolve(__dirname, "../data/userData.json"), "utf-8");
      usersData = JSON.parse(usersJson);
    } catch (err) {
      console.log(err);
      res.sendStatus(418);
    }

    let notesJson;
    let notesData;
    try {
      notesJson = fs.readFileSync(path.resolve(__dirname, "../data/notesData.json"), "utf-8");
      notesData = JSON.parse(notesJson);
    } catch (err) {
      notesJson = [];
      notesData = [];
    }
    notesData = notesData.filter(e => e.id != req.params.id);
    notesJson = JSON.stringify(notesData, null, 2);
    fs.writeFileSync(path.resolve(__dirname, "../data/notesData.json"), notesJson, "utf-8");
    res.redirect("/");
  });

module.exports = router;

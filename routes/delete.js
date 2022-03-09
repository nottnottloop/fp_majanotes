const express = require("express");
const fs = require("fs");
const path = require('path');
const router = express.Router();

const note = require(path.resolve(__dirname, "../model/noteModel"));
const constants = require(path.resolve(__dirname, "constants"));
const sharedFunctions = require(path.resolve(__dirname, "sharedFunctions"));

router
  .route("/:id")
  .post((req, res) => {
    let usersJson;
    let usersData;
    try {
      usersJson = fs.readFileSync(path.resolve(__dirname, "../data/usersJson.json"), "utf-8");
      usersData = JSON.parse(usersJson);
    } catch (err) {
      res.sendStatus(418);
    }

    console.log(req.body.username)
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

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

function checkValidNote(req, res) {
  let passed = true;
  //we will append failure messages to this array so we can have more than one
  let message = [];
  //test for title being too long
  if (req.body.title.length > constants.maxTitleChars) {
    message.push(`Max ${constants.maxTitleChars} chars for titles!<br>`);
    passed = false;
  }
  //test for note being too long
  if (req.body.note.length > constants.maxNoteChars) {
    message.push(`Max ${constants.maxNoteChars} chars for notes!<br>`);
    passed = false;
  }
  //test for no title
  if (req.body.title.length === 0) {
    message.push(`Title can't be empty!<br>`);
    passed = false;
  }
  //test for no note
  if (req.body.note.length === 0) {
    message.push(`Note can't be empty!<br>`);
    passed = false;
  }
  //check if there's html in the note
  //no longer needed, we perform replaceAll on <> characters above
  //if (/<\/?[a-z][\s\S]*>/i.test(req.body.title) || /<\/?[a-z][\s\S]*>/i.test(req.body.note)) {
  //  message.push(`Please don't put HTML in your note... :(<br>`);
  //  passed = false;
  //}
  //if tests weren't passed, gather up all the error messages and take the user to the error page
  if (!passed) {
    message = message.join('');
    res.render("index.ejs", {title: req.body.title, note: req.body.note, message: message});
  }
  return passed;
}

module.exports = router;

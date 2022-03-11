const express = require("express");
const fs = require("fs");
const path = require('path');
const router = express.Router();

const constants = require(path.resolve(__dirname, "constants"));
const sharedFunctions = require(path.resolve(__dirname, "sharedFunctions"));

router
  .route("/:id")
  .get((req, res) => {
	res.render("comment");
  })
  .post((req, res) => {
    //verify user
    if (sharedFunctions.checkUserValid(req, res) != 'ok') {
      return res.send(403);
    }
    //replace all html tags so that we don't have code injections
    //without this, you can type valid html into the page and it will render!
    req.body.comment = req.body.comment.replace(/</g, "&lt;")
    req.body.comment = req.body.comment.replace(/>/g, "&gt;")

    if(!checkValidComment(req, res)) { return };

    let notesJson;
    let notesData;
    try {
      //see new.js for comments about this code, it's largely the same
      notesJson = fs.readFileSync(path.resolve(__dirname, "../data/notesData.json"), "utf-8");
      notesData = JSON.parse(notesJson);
    } catch (err) {
      console.log("Error: " + err);
    }
    const noteToModify = notesData.find(e => e.id == req.params.id);
    let commentsToModify = noteToModify['comments'];
    if (!commentsToModify) {
      commentsToModify = [];
    }
    if (req.body.username) {
      commentsToModify.push({comment: req.body.comment, author: req.body.username});
    } else {
      commentsToModify.push({comment: req.body.comment, author: 'anonymous'});
    }
    noteToModify['comments'] = commentsToModify;

    //you have to be mega careful to use the !=, and nothing but the != operand here
    notesData = notesData.filter(e => e.id != req.params.id);
    notesData.push(noteToModify);

    notesJson = JSON.stringify(notesData, null, 2);

    //write the json file
    fs.writeFileSync(path.resolve(__dirname, "../data/notesData.json"), notesJson, "utf-8");
    console.log(`\nComment\n${req.body.comment}\nAdded to note '${noteToModify.title}' with ID ${noteToModify.id}`);
    res.redirect(req.originalUrl);
  });

function checkValidComment(req, res) {
  let passed = true;
  //test for comment being too long
  if (req.body.comment.length > constants.maxNoteChars) {
    passed = false;
  }
  //test for no comment
  if (req.body.comment.length === 0) {
    passed = false;
  }
  if (!passed) {
    res.redirect(req.originalUrl);
  }
  return passed;
}

module.exports = router;
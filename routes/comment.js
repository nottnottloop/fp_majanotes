const express = require("express");
const fs = require("fs");
const path = require('path');
const router = express.Router();

router
  .route("/:id")
  .get((req, res) => {
	res.render("comment");
  })
  .post((req, res) => {
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
    console.log(noteToModify)
    let commentsToModify = noteToModify['comments'];
    if (!commentsToModify) {
      commentsToModify = [];
    }
    commentsToModify.push(req.body.comment);
    noteToModify['comments'] = commentsToModify;

    //you have to be mega careful to use the !=, and nothing but the != operand here
    notesData = notesData.filter(e => e.id != req.params.id);
    notesData.push(noteToModify);

    notesJson = JSON.stringify(notesData, null, 2);

    //write the json file
    fs.writeFileSync(path.resolve(__dirname, "../data/notesData.json"), notesJson, "utf-8");
    console.log(`\nComment\n${req.body.comment}\nAdded to note '${noteToModify.title}' with ID ${noteToModify.id}`);
    res.render("comment");
  });

module.exports = router;
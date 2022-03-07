const express = require("express");
const fs = require("fs");
const path = require('path');
const router = express.Router();

router
  .route("/")
  .post((req, res) => {
    console.log("\nRecieved emoji post request:")
    console.log(req.body)
    let notesJson;
    let notesData;
    //similar to the push request for the notes themselves above
    try {
      notesJson = fs.readFileSync(path.resolve(__dirname, "../data/notesData.json"), "utf-8");
      notesData = JSON.parse(notesJson);
    } catch (err) {
      //internal server error (500)
      console.log("Error: " + err);
      res.sendStatus(500);
    }
    //return only the note that matches our ID
    const noteToModify = notesData.find(e => e.id === req.body.id);
    if (!noteToModify[req.body.emoji]) {
      noteToModify[req.body.emoji] = 1;
    } else {
      noteToModify[req.body.emoji] = noteToModify[req.body.emoji] + 1;
    }
    //give us all the notes that AREN'T our ID. then we can append our modified note
    notesData = notesData.filter(e => e.id !== req.body.id);
    console.log(`Updating note ${noteToModify['title']} to ${req.body.emoji} count ${noteToModify[req.body.emoji]}`)
    notesData.push(noteToModify);
    notesJson = JSON.stringify(notesData, null, 2);
    fs.writeFileSync(path.resolve(__dirname, "../data/notesData.json"), notesJson, "utf-8");
    res.sendStatus(200);
  })

	module.exports = router;
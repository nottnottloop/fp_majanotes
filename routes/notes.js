const express = require("express");
const fs = require("fs");
const router = express.Router();

const note = require("../model/noteModel");

router.get("/", (req, res) => {
  res.render("notes/notes");
});

router
  .route("/new")
  .get((req, res) => {
  res.render("notes/new");
  })
  .post((req, res) => {
    //create a new note object, using the model, based on response we recieved from the user
    const newNote = new note(req.body.title, req.body.note, req.body.color);
    let notesJson;
    let notesData;
    try {
      //open and read the notes json file we have stored
      let notesJson = fs.readFileSync("data/notesData.json", "utf-8");
      //parse the notesJson (file) into a notesData object that works natively in JS. we can't manipulate a json directly
      notesData = JSON.parse(notesJson);
    } catch (err) {
      console.log("Error: " + err);
      notesJson = [];
      notesData = [];
    }
    //append our new note
    notesData.push(newNote);
    //turn our native JS object back into a json file, ready to write it back
    notesJson = JSON.stringify(notesData);
    //write the json file
    fs.writeFileSync("data/notesData.json", notesJson, "utf-8");
    console.log(`New note added:\nTitle: ${newNote.title}\nNote: ${newNote.note}\nColor: ${newNote.color}\n`)
    //this whole route is mounted on /notes. so this redirect redirects to /notes, not /
    res.redirect(".");
  });

//router
//  .route("/:id")
//  .get((req, res) => {
//    res.send(req.params.id);
//  });

//this code is ran every time a router matches this sort of call. for reference
//router.param("id", (req, res, next, id) => {
//  req.user = users[id];
//  next();
//});

module.exports = router;

const express = require("express");
const fs = require("fs");
const path = require('path');
const router = express.Router();

const note = require(path.resolve(__dirname, "../model/noteModel"));

router.get("/", (req, res) => {
  res.render("notes/notes");
});

//this will send all the data we have on the server to the client
router.get("/data", (req, res) => {
  //set the header correctly for the API so it pretty prints :)
  res.set('Content-Type', 'application/json');
  //try to read the data. if the data doesn't exist, we send an empty array
  try {
    //read the file. get a native JS object. send the file back pretty printed
    notesJson = fs.readFileSync(path.resolve(__dirname, "../data/notesData.json"), "utf-8");
    notesData = JSON.parse(notesJson);
    res.send(JSON.stringify(notesData, null, 2));
  } catch (err) {
    res.send([]);
  }
});

router
  .route("/new")
  .get((req, res) => {
    res.render("notes/new");
  })
  .post((req, res) => {
    //create a new note object, using the model, based on response we recieved from the user
    const newNote = new note(req.body.title, req.body.note, req.body.color);
    //create notesJson (for the json string) and notesData (for our javascript object) outside of the scope of the upcoming blocks.
    //this is so we can actually refer to these variables throughout the function
    let notesJson;
    let notesData;
    try {
      //open and read the notes json file we have stored
      //we use path.resolve instead of just including a pathname (e.g argument 1 = "data/notesData.json") because
      //in that case node will use the current working directory of the server instead of an absolute path regardless of cwd
      notesJson = fs.readFileSync(path.resolve(__dirname, "../data/notesData.json"), "utf-8");
      //parse the notesJson (file) into a notesData object that works natively in JS. we can't manipulate a json directly
      notesData = JSON.parse(notesJson);
    } catch (err) {
      //this code is executed if the file does not exist (node calls this ENOENT). in this case, we will make a new file
      //we set the notesJson and notesData to nothing so that the rest of the code will work correctly
      console.log("Error: " + err);
      console.log("Creating new notesData.json");
      notesJson = [];
      notesData = [];
    }
    //append our new note
    notesData.push(newNote);
    //turn our native JS object back into a json file, ready to write it back
    notesJson = JSON.stringify(notesData);
    //write the json file
    fs.writeFileSync(path.resolve(__dirname, "../data/notesData.json"), notesJson, "utf-8");
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

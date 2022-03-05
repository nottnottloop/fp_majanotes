const express = require("express");
const fs = require("fs");
const path = require('path');
const router = express.Router();

const note = require(path.resolve(__dirname, "../model/noteModel"));

//constant values for data validation
const maxTitleChars = 60;
const maxNoteChars = 200;

router.get("/", (req, res) => {
  res.render("notes/notes");
});

//this will send all the data we have on the server to the client
router.get("/data", (req, res) => {
  //set the header correctly for the API so it pretty prints :)
  res.set('Content-Type', 'application/json');
  //try to read the data. if the data doesn't exist, we send an empty array
  try {
    //read the file, send it back
    notesJson = fs.readFileSync(path.resolve(__dirname, "../data/notesData.json"), "utf-8");
    res.send(notesJson);
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
    //replace all html tags so that we don't have code injections
    //without this, you can type valid html into the page and it will render!
    req.body.title = req.body.title.replaceAll("<", "&lt;")
    req.body.title = req.body.title.replaceAll(">", "&gt;")
    req.body.note = req.body.note.replaceAll("<", "&lt;")
    req.body.note = req.body.note.replaceAll(">", "&gt;")

    //perform our data validation function. 
    //if the data is not valid, make sure we don't continue with the rest of this post request as if it was successful. we do this with a return
    if(!checkValidNote(req, res)) { return };

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
    //create a new note object, using the model, based on response we recieved from the user
    //the first field, the ID, is equal to the length of notesData
    const newNote = new note(notesData.length, req.body.title, req.body.note, req.body.color);

    if (req.body.gif) {
      newNote.gif = req.body.gif;
    }

    const debugGif = newNote.gif || "No gif :("

    //append our new note
    notesData.push(newNote);

    //turn our native JS object back into a json file, ready to write it back
    notesJson = JSON.stringify(notesData, null, 2);

    //write the json file
    fs.writeFileSync(path.resolve(__dirname, "../data/notesData.json"), notesJson, "utf-8");
    console.log(`\nNew note added:\nTitle: ${newNote.title}\nNote: ${newNote.note}\nColor: ${newNote.color}\nGIF: ${debugGif}`)

    //this whole route is mounted on /notes. so this redirect redirects to /notes, not /
    res.redirect(".");
  });

router
  .route("/emoji")
  .get((req, res) => {

  })
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
      console.log("Error: " + err);
      res.sendStatus(500);
    }
    const objectToModify = notesData.filter(e => e.id === req.body.id);
    if (!objectToModify[0][req.body.emoji]) {
      objectToModify[0][req.body.emoji] = 1;
    } else {
      objectToModify[0][req.body.emoji] = objectToModify[0][req.body.emoji] + 1;
    }
    notesData = notesData.filter(e => e.id !== req.body.id);
    console.log(`Updating note ${objectToModify[0]['title']} to ${req.body.emoji} count ${objectToModify[0][req.body.emoji]}`)
    notesData.push(objectToModify[0]);
    notesJson = JSON.stringify(notesData, null, 2);
    fs.writeFileSync(path.resolve(__dirname, "../data/notesData.json"), notesJson, "utf-8");
    res.sendStatus(200);
  })

function checkValidNote(req, res) {
  let passed = true;
  let message = [];
  //test for title being too long
  if (req.body.title.length > maxTitleChars) {
    message.push(`Max ${maxTitleChars} chars for notes!<br>`);
    passed = false;
  }
  //test for note being too long
  if (req.body.note.length > maxNoteChars) {
    message.push(`Max ${maxNoteChars} chars for notes!<br>`);
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
    res.render("notes/invalid", {message: message});
  }
  return passed;
}

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

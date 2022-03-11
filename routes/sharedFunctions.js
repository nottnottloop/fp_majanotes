const fs = require("fs");
const path = require("path");

const constants = require(path.resolve(__dirname, "constants"));
const note = require(path.resolve(__dirname, "../model/noteModel"));

function createNewDataFile(file, err) {
	//this code is executed if the file does not exist (node calls this ENOENT). in this case, we will make a new file
	//we set the notesJson and notesData to nothing so that the rest of the code will work correctly
	console.log("\nError: " + err);
	console.log(`Creating new ${file}`);
	//check if data directory exists. if not, create it
	if (!fs.existsSync("data")) {
		fs.mkdirSync("data");
	}
}

function newNote(req, res, editing=false) {
  //verify user
  if (editing) {
    if (checkUserValid(req, res) != 'ok') {
      res.sendStatus(403);
      return;
    }
  }
  //replace all html tags so that we don't have code injections
  //without this, you can type valid html into the page and it will render!
  req.body.title = req.body.title.replace(/</g, "&lt;")
  req.body.title = req.body.title.replace(/>/g, "&gt;")
  req.body.note = req.body.note.replace(/</g, "&lt;")
  req.body.note = req.body.note.replace(/>/g, "&gt;")

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
    createNewDataFile("notesData.json", err);
    notesJson = [];
    notesData = [];
  }
  let modifiedColor;
  switch (req.body.color) {
    case "white":
      modifiedColor = "white";
      break;
    case "blue":
      modifiedColor = "cornflowerblue";
      break;
    case "green":
      modifiedColor = "palegreen";
      break;
    case "pink":
      modifiedColor = "pink";
      break;
    case "yellow":
      modifiedColor = "khaki";
      break;
  }

  //only generate a new ID if the note is new
  let newID = 0;
  if (!editing) {
    let i = 0;
      while (notesData.some(e => e.id == i)) {
        i++;
      }
    newID = i;
  } else {
    newID = parseInt(req.body.id);
  }

  //create a new note object, using the model, based on response we recieved from the user
  //the first field, the ID, is equal to the length of notesData
  newNote = new note(newID, req.body.title, req.body.note, modifiedColor, req.body.color);
  if (req.body.username && !editing) {
    newNote.author = req.body.username;
  }

  if (req.body.gif) {
    newNote.gif = req.body.gif;
  }

  const debugGif = newNote.gif || "No gif :("
  const debugAuthor = newNote.author || "Anonymous"

  //remove existing note if editing a note. retain all emoji reactions
  if (editing) {
    oldNote = notesData.find(e => e.id == newID);
    newNote.heart = oldNote.heart;
    newNote.neutral = oldNote.neutral;
    newNote.thumbs = oldNote.thumbs;
    newNote.author = oldNote.author;
    notesData = notesData.filter(e => e.id != newID);
  }
  //append our new note
  notesData.push(newNote);

  //turn our native JS object back into a json file, ready to write it back
  notesJson = JSON.stringify(notesData, null, 2);

  //write the json file
  fs.writeFileSync(path.resolve(__dirname, "../data/notesData.json"), notesJson, "utf-8");
  let term;
  editing ? term = 'Note edited:' : term = 'New note added:';
  console.log(`\n${term}\nAuthor: ${debugAuthor}\nID: ${newNote.id}\nTitle: ${newNote.title}\nNote: ${newNote.note}\nColor: ${newNote.color}\nGIF: ${debugGif}`)
  res.redirect("/");
}

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

function checkUserValid(req, res) {
  let userJson;
  let userData;
  try {
    userJson = fs.readFileSync(path.resolve(__dirname, "../data/userData.json"), "utf-8");
    userData = JSON.parse(userJson);
    let user = userData.find(e => e.username == req.body.username)
    if (!user) {
      return 'nouser';
    }
    else if (req.body.password !== user.password) {
      return 'wrongpass';
    }
  } catch (err) {
    return 'nouser';
  }
  return 'ok';
}


module.exports = {
	createNewDataFile,
	newNote,
  checkUserValid
}
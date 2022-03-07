const express = require("express");
const fs = require("fs");
const path = require('path');
const router = express.Router();

//this will send all the data we have on the server to the client
router.get("/", (req, res) => {
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

module.exports = router;
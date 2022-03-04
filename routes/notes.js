const express = require("express");
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
    const newNote = new note(req.body.title, req.body.note, req.body.color);
    console.log(`Title: ${newNote.title}\nNote: ${newNote.note}\nColor: ${newNote.color}\n`)
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

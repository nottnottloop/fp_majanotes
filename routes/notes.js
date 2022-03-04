const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("notes/notes");
});

router
  .route("/new")
  .get((req, res) => {
  res.render("notes/new");
  })
  .post((req, res) => {
    console.log(`Title: ${req.body.title}\nNote: ${req.body.note}`)
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
